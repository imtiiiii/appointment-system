import { EventsList } from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'
// import Inbox from 'App/Models/Inbox'
import User from 'App/Models/User'
import Notification from 'App/Models/Notification'
import Ws from 'App/Services/Ws'

// import FCMD from 'fcm-node'
var FCM = require('fcm-node');
var serverKey = 'AAAAkecrMSo:APA91bFVXSSLvzoP4UP_ORpqI6PQWOxhKNtjTeBVm1EvHlSsB-ah0XNMJ-0mn2tN84h3iVuks4p4pt3nW9VVeZd-ym9gcUyoXgfD8K2PeXoFiKT5UyoInqVNTHSzqTzLwpYPFwxm5thL '; //put your server key here
var fcm = new FCM(serverKey);

export default class NotificationListener {

  async onNewNotification(notiObj: EventsList['new:notification']) {
      let oldNoti :any = await this.getNotification(notiObj)
      if(!oldNoti){ // there is no old notification so create one...
         await this.createNotication(notiObj)
      }else{
         this.updateNotification(notiObj, oldNoti?.id)
      }
      Ws.io.emit(`noti:${notiObj.user_id}`, notiObj,notiObj.noti_type)
      console.log('new:notification',notiObj.user_id,)
       this.sendFcmNoti(notiObj,notiObj.user_id,notiObj.from_id)
  }

 

  async getNotification(notiObj : EventsList['new:notification']){
     return Notification.query().where('user_id', notiObj.user_id).where('feed_id', notiObj.feed_id).where('noti_type', notiObj.noti_type).first()
  }
  async createNotication(notiObj : EventsList['new:notification']){
      return Notification.create({
        userId : notiObj.user_id,
        feedId : notiObj.feed_id,
        commentId : notiObj.comment_id,
        fromId: notiObj.noti_meta.id,
        noti_type: notiObj.noti_type,
        noti_meta: JSON.stringify(notiObj.noti_meta)
     })
  }
  async updateNotification(notiObj : EventsList['new:notification'], id){
    let other_count = notiObj.other_count - 1
    if(notiObj.noti_type == 'feed_comment'){ // find unique users who commented on it
      let count = await Database
      .from('comments').where('user_id', '!=', notiObj.user_id).where('feed_id', notiObj.feed_id).countDistinct('user_id as total').first()
      other_count = count.total > 0 ? count.total - 1 : count.total
    }
    return Notification.query().where('id', id).update({
       user_id : notiObj.user_id,
       feed_id : notiObj.feed_id,
       comment_id : notiObj.comment_id,
       from_id: notiObj.noti_meta.id,
       noti_type: notiObj.noti_type,
       other_count: other_count,
       counter: 1,
       seen: 0,
       updated_at: new Date,
       noti_meta: JSON.stringify(notiObj.noti_meta)
    }) 
  }

  async onNewFriend(notiObj : EventsList['new:friend']){
    await Database
    .from('users')
    .where('id', notiObj.user_id).increment('friend_count')
     Ws.io.emit(`noti:${notiObj.user_id}`, notiObj)
   this.sendFcmNoti(notiObj,notiObj.user_id, notiObj.from_id)
  }
  async onAcceptFriend(notiObj : EventsList['accept:friend']){
     // insert notifications
     await Notification.create({
        userId : notiObj.user_id,
        fromId: notiObj.noti_meta.id,
        noti_type: notiObj.noti_type,
        noti_meta: JSON.stringify(notiObj.noti_meta)
     })
     Ws.io.emit(`noti:${notiObj.user_id}`, notiObj)
      this.sendFcmNoti(notiObj,notiObj.user_id ,notiObj.from_id)
  }
  async onNewMember(notiObj : EventsList['new:member']){
   //   console.log("this is calling from new member")
     // insert notifications
     await Notification.create({
        userId : notiObj.user_id, 
        fromId: notiObj.from_id,
        noti_type: notiObj.noti_type,
        noti_meta: JSON.stringify(notiObj.noti_meta)
     })
     Ws.io.emit(`noti:${notiObj.user_id}`, notiObj)
      this.sendFcmNoti(notiObj,notiObj.user_id,notiObj.from_id)
  }

  async onNewChat(notiObj : EventsList['new:chat']){
     Ws.io.emit(`noti:${notiObj.buddy_id}`, notiObj)
     this.sendFcmNoti(notiObj,notiObj.buddy_id,notiObj.from_id)
  }

  async sendFcmNoti(notiObj,user_id,from_id){
   let user :any = await User.query().where('id', user_id).select('id','appToken').first()
   let sender = await User.query().where('id', from_id).select('id','first_name','last_name').first()
   console.log("New FCM Noti...",user_id,notiObj.noti_type,notiObj.from_id)
   

   if(!user || !sender) return
   if(!user.appToken) return
   
   console.log("appToken...",user.appToken)
   let data = notiObj.noti_meta
   var message = {
      to: user.appToken,
      // to: 'cRHUnwT6Q5SE_9opE7HarJ:APA91bEXrph-ViAM93n5iGNYQ5AiSPmdr7arB3gH3u9WEN-q1NaBoa2OwpsyTRNsdPooAhyb1e0R5kufKIiD1tkSv3XIboCgrnNP_tYqQFoOFbobcgiSAZFDcR6kdiPw-46Fb_yRUuaj',
      collapse_key: 'your_collapse_key',
      notification: {
         title: process.env.IS_CONNECTIVER && process.env.IS_CONNECTIVER=='yes'?'Connectiver':'Divine 9 Connections',
         body: data ? sender.first_name +' ' +sender.last_name + ' ' + data.action_text :'undifined',
      },
      data: {
         click_action: "FLUTTER_NOTIFICATION_CLICK",
         metadata : notiObj,
      }, 
   }

  fcm.send(message, function(err, response){
      if (err) console.log("Something has gone wrong!" , err)
      else console.log("Successfully sent with response: sss ", response)
  })
}




}
