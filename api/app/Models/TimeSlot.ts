import { DateInput, DateTime,  } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Appoinment from './Appoinment'

export default class TimeSlot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public teacherId : number

  @column()
  public date : DateInput

  @column()
  public startTime : DateInput

  @column()
  public duration : number

  @column()
  public studentId : number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * Database Relationships
   */
  @belongsTo(()=> User,{
    localKey: 'id'
  })
  public byTeacher : BelongsTo<typeof User>

  @belongsTo(()=> User,{
    localKey:'id'
  })
  public byStudent : BelongsTo<typeof User>

  @hasMany(()=> Appoinment,{
    foreignKey:'timeSlotId'
  })
  public allAppoinments: HasMany<typeof Appoinment>
  
}
