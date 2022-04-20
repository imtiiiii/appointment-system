import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User';

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public userId: number
  @column()
  public fromId: number
  @column()
  public feedId: number
  @column()
  public commentId: number
  @column()
  public noti_type: string
  @column()
  public seen?: string
  @column()
  public counter?: number
  @column()
  public other_count?: number
  @column()
  public noti_meta?: string

  
  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'fromId',
    onQuery: (q) =>{
      q.select('id', 'first_name', 'last_name', 'profile_pic', 'username')
    }
  })
  public from_user : BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
