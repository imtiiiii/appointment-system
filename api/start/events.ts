/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'

Event.on('db:query', Database.prettyPrint) // database query listener
Event.on('new:notification', 'NotificationListener.onNewNotification')
Event.on('new:friend', 'NotificationListener.onNewFriend')
Event.on('accept:friend', 'NotificationListener.onAcceptFriend')
Event.on('new:chat', 'NotificationListener.onNewChat')
Event.on('new:member', 'NotificationListener.onNewMember')


 