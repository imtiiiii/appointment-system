import User from 'App/Models/User';
import Ws from 'App/Services/Ws'

Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
    console.log('socket connected')
    let userId;
    //console.log('socket', socket)
    socket.on("notification", (data) => {
        console.log('on notification', data)
        Ws.io.emit(`noti:${data.user_id}`, data)
    });
    socket.on("video-call", (data) => {
        console.log('on video-call', data)
        Ws.io.emit(`video-call:${data.user_id}`, data)
    });
    socket.on("audio-call", (data) => {
        console.log('on audio-call', data)
        Ws.io.emit(`audio-call:${data.user_id}`, data)
    });
    socket.on("con", async(data) => {
      userId = data.id
      if(userId){
          console.log('connecting... user', userId)
          let obj = {
            is_online : 'online',
            id: userId,

          }
          Ws.io.emit(`online`, obj)
          await User.query().where('id', userId).update({is_online: 'online'})
       }
    })
    socket.on("disconnect", async() => {
       console.log('disconncting...', userId)
       if(userId){
        console.log('disconncting... user', userId)
        let obj = {
          is_online : 'offline',
          id: userId,

        }
        Ws.io.emit(`online`, obj)
        await User.query().where('id', userId).update({is_online: 'offline'})
       }
    });

})
