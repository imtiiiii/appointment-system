import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TimeSlot from '../../../Models/TimeSlot'
import TimeSlotValidator from './TimeSlotValidator';
import TimeSlotService from './TimeSlotService';
import moment from 'moment';
moment().format();
import User from 'App/Models/User';
export default class TimeSlotsController {
    private timeSlotValidator: TimeSlotValidator
    private timeSlotService: TimeSlotService

    constructor() {
        this.timeSlotService = new TimeSlotService()
        this.timeSlotValidator = new TimeSlotValidator()
    }
    public async add(ctx: HttpContextContract) {
        let one = moment("16:00:00", "HH:mm:ss").valueOf().toString();
        let two = moment("16:00:00", "HH:mm:ss").valueOf().toString()
        console.log(one);
        console.log(two);
        const data = ctx.request.all();
        const { day_id } = data;
        const { teacher_id } = data;
        const { start_time } = data;
        const { end_time } = data;
        // console.log("day_id= ", day_id)
        // console.log("teacher_id= ", teacher_id)
        console.log("start_time = ", start_time)
        console.log("end_time =", end_time)
        const teacher = await TimeSlot.query().where("teacherId", teacher_id).where("dayId", day_id).orderBy("start_time", "desc").preload("user");
        const newStartTime = moment(start_time, "HH:mm:ss").valueOf().toString();
        const newEndTime = moment(end_time, "HH:mm:ss").valueOf().toString();
        for (let i of teacher) {
            // console.log("oldstartTime=", i)
            // console.log("endTime=", i.endTime)
            const oldStartTime = moment(i.startTime, "HH:mm:ss").valueOf().toString();
            const oldEndTime = moment(i.endTime, "HH:mm:ss").valueOf().toString();
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

            // ********* WHEN NEW START TIME IS AVAILABLE BUT END TIME CONFLICT WITH OTHER TIME SLOT'S START OR END TIME  = NOT POSSIBLE *************
            if (newStartTime < oldStartTime) {
                if (newEndTime > oldStartTime) {
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
        const saveToDb = await TimeSlot.create(data);
        return {
            saveToDb,
            msg: "possible"
        }



    }
    //TODO: This Controller only accessable by teacher type user
    public async created(ctx: HttpContextContract) {
        try {
            const payload = await this.timeSlotValidator.created(ctx);
        } catch (error) {
            const errorObject = JSON.parse(error);
            return ctx.response.status(422).send({
                status: 'BAD',
                message: errorObject,
                result: []
            });
        }
        return await this.timeSlotService.created(ctx);
    }
    //TODO: This Controller only accessable by teacher type user
    public async available(ctx: HttpContextContract) {
        return this.timeSlotService.available(ctx);
    }

    public async update(ctx:HttpContextContract){
        try{
            await this.timeSlotValidator.update(ctx)
        }catch(error){
            const errorObj = JSON.parse(error);
            return ctx.response.status(422).send({
                status:'BAD',
                message:errorObj,
                result:[]
            });
        }
        return this.timeSlotService.update(ctx);
    }
}
