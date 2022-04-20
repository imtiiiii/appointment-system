/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

// import User from "App/Models/User";

declare module '@ioc:Adonis/Core/Event' {
  /*
  |--------------------------------------------------------------------------
  | Define typed events
  |--------------------------------------------------------------------------
  |
  | You can define types for events inside the following interface and
  | AdonisJS will make sure that all listeners and emit calls adheres
  | to the defined types.
  |
  | For example:
  |
  | interface EventsList {
  |   'new:user': UserModel
  | }
  |
  | Now calling `Event.emit('new:user')` will statically ensure that passed value is
  | an instance of the the UserModel only.
  |
  */
  interface EventsList {
      'new:notification': {
         user_id : number
         from_id: number
         feed_id : number
         noti_type: string
         comment_id : number | undefined
         noti_meta: {
            id: number | undefined;
            profile_pic: string | undefined;
            first_name: string | undefined; 
            last_name: string | undefined;
            action_text: string;
         },
         other_count: number
      }
      'new:friend': {
         user_id : number
         from_id: number
         noti_type: string
         noti_meta: {
            id: number | undefined;
            username: string | undefined
            profile_pic: string | undefined;
            first_name: string | undefined;
            last_name: string | undefined;
            action_text: string;
         },
      }
      'accept:friend': {
        user_id : number | undefined
        from_id: number
        noti_type: string
        noti_meta: {
           id: number | undefined;
           username: string | undefined
           profile_pic: string | undefined;
           first_name: string | undefined;
           last_name: string | undefined;
           action_text: string;
        },
     }
      'new:chat': {
        buddy_id : number
        from_id: number
        noti_type: string
        user: {
          id: number ;
          username: string | undefined
          profile_pic: string | undefined;
          first_name: string | undefined;
          last_name: string | undefined;
        }
        chatObj: {
           id: number;
           user_id : number,
           inbox_key : string,
           msg : string,
           files: any[],
        },
     }
     
     'new:member':{
         user_id : number | undefined
         from_id: number
         noti_type: string
         noti_meta: {
            slug: string; 
            action_text: string; 
         },
     }
    

  }
}
