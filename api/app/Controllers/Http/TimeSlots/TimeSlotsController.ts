import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TimeSlot from '../../../Models/TimeSlot'
import TimeSlotValidator from './TimeSlotValidator';
import TimeSlotService from './TimeSlotService';
import User from 'App/Models/User';
export default class TimeSlotsController {
    private timeSlotValidator: TimeSlotValidator
    private timeSlotService: TimeSlotService

    constructor() {
        this.timeSlotService = new TimeSlotService()
        this.timeSlotValidator = new TimeSlotValidator()
    }
    public async add(ctx: HttpContextContract) {
        const data = ctx.request.all();
        const { day_id } = data;
        const { teacher_id } = data;
        const { start_time } = data;
        const { end_time } = data;
        // console.log("day_id= ", day_id)
        // console.log("teacher_id= ", teacher_id)
        // console.log("start_time = ", start_time)
        // console.log("end_time =", end_time)
        const teacher = await TimeSlot.query().where("teacher_id", teacher_id).where("day_id", day_id).orderBy("start_time", "desc").preload("user");
        const newStartTime = new Date('2020-01-01 ' + start_time).getTime();
        const newEndTime = new Date('2020-01-01 ' + end_time).getTime();
        for (let i of teacher) {
            // console.log("oldstartTime=", i)
            // console.log("endTime=", i.endTime)
            const oldStartTime = new Date('2020-01-01 ' + i.startTime).getTime();
            const oldEndTime = new Date('2020-01-01 ' + i.endTime).getTime();
            // *********** START TIME VALIDATION **********
            if (newStartTime === oldStartTime || newStartTime === oldEndTime) {
                console.log("1")
                return {
                    msg: "not possible"
                }
            }
            if (newStartTime > oldStartTime) {
                // console.log("im her 1st if")
                if (newStartTime < oldEndTime) {
                    console.log("2");
                    return {
                        msg: "not possible"
                    }
                }

            }
            // ******* END TIME VALIDATION ********
            if (newEndTime === oldStartTime || newEndTime === oldEndTime) {
                console.log("3")
                return {
                    msg: "not possible"
                }
            }
            if (newEndTime > oldStartTime) {

                if (newEndTime < oldEndTime) {
                    console.log("4")
                    return {
                        msg: "not possible"
                    }
                }

            }
            // ********** START AND END TIME BOTH **********

            // ********* WHEN NEW START TIME IS AVAILABLE BUT END TIME CONFLICT WITH OTHER TIME SLOT'S START OR END TIME = NOT POSSIBLE *************
            if (newStartTime < oldStartTime) {
                if (newEndTime > oldStartTime && newEndTime < oldEndTime) {
                    console.log("5")
                    return {
                        msg: "not possible"
                    }
                }

            }
            // ********** WHEN NEW START TIME MORE RECENT THAN OLD START TIMIE  **********
            // BUT NEW END TIME IS LESS RECENT THAN OLD END TIME . SO THE SLOT CONFLICTS=NOT POSSIBLE
            if (newStartTime > oldStartTime && newEndTime < oldEndTime) {
                console.log("im 6")
                return {
                    msg: "not possible"
                }
            }

        }
        return {
            msg: "possible"
        }

    }
    //TODO: This Controller only accessable by teacher type user
    // public async availableSlots(ctx: HttpContextContract) {
    //     try {
    //         const payload = await this.timeSlotValidator.availableSlots(ctx);
    //     } catch (error) {
    //         const errorObject = JSON.parse(error);
    //         return ctx.response.status(422).send({
    //             status: 'BAD',
    //             message: errorObject,
    //             result: []
    //         });
    //     }
    //     return await this.timeSlotService.availableSlots(ctx);
    // }
}
