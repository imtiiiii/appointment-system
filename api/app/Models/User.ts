import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
    column,
    beforeSave,
    BaseModel,
    hasMany,
    HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import TimeSlot from './TimeSlot'
import Appointment from './Appointment'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public firstName: string

    @column()
    public lastName: string

    @column()
    public userName: string

    @column()
    public email: string

    @column()
    public password: string

    @column()
    public userType: string

    @column()
    public studentId: number

    @column()
    public course: string

    @column()
    public dept: string

    @column()
    public status: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    /**
     *  Hooks
     */
    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }

    /**
     * Database Relationships
     */

    @hasMany(() => TimeSlot, {
        foreignKey: 'teacherId'
    })
    public teachersTimeSlots: HasMany<typeof TimeSlot>

    @hasMany(() => TimeSlot, {
        foreignKey: 'studentId'
    })
    public studentsTimeSlots: HasMany<typeof TimeSlot>


    @hasMany(() => Appointment, {
        localKey:'studentId',
        foreignKey:'id'
    })
    public studentAppointment: HasMany<typeof Appointment>


}
