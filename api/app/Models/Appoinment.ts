import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TimeSlot from './TimeSlot'

export default class Appoinment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public timeSlotId : number

  @column()
  public studentId : number

  @column()
  public status : number

  /**
   * This Column act like note of appoinment request
   */
  @column()
  public agenda: string 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  /**
   * Database Relationships
   */
  @belongsTo(()=> User,{
    localKey:'id'
  })
  public byWhichStudent: BelongsTo<typeof User>
  

  @belongsTo(()=> TimeSlot,{
    localKey:'id'
  })
  public forWhichTimeSlot : BelongsTo<typeof TimeSlot>


}
