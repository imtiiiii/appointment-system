import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from '../../../Models/Appointment'
import moment from 'moment';
moment().format()

import AppointmentsValidator from './AppoinmentsValidator';
import AppoinmentsService from './AppoinmentsService';
import TimeSlot from 'App/Models/TimeSlot';

export default class AppointmentsController {
    private appoinmentValidator: AppointmentsValidator
    private appoinmentService: AppoinmentsService

    constructor() {
        this.appoinmentValidator = new AppointmentsValidator()
        this.appoinmentService = new AppoinmentsService()

    }
    async request(ctx: HttpContextContract) {
        let msg = "try again"
        const data = ctx.request.all();
        const endTime = await TimeSlot.query().where("id", data.timeSlotId).select("end_time")
        console.log("end Time=", endTime[0].$attributes.endTime)
        let date = moment(data.date)
        let time = moment(endTime[0].$attributes.endTime, 'HH:mm:ss');
        date.set({
            hour: time.get('hour'),
            minute: time.get('minute'),
            second: time.get('second')
        });
        data.date = date.toString();
        let dateTime = (date + ' ' + time)
        console.log("date is= ", data.date)
        const isAvailable = await Appointment.query()
            .where("date", data.date).andWhere("status", '1')
        console.log("isAvailable size is ", isAvailable.length)
        if (isAvailable.length !== 0) {
            return {
                msg: "booked"
            }
        }
        else {
            const isAlreadyrequested = await Appointment.query()
                .where("student_id", data.studentId).andWhere("date", data.date)
            console.log("already requested", isAlreadyrequested.length)
            if (isAlreadyrequested.length === 0) {
                const req = await Appointment.create(data)
                return {
                    msg: "sucessfull",
                    req
                }
            }
            else {
                return {
                    msg: "already requested"
                }
            }
        }

        // const req = await Appointment.create(data)
        // console.log("x is =", x);

        // return req;
    }
    async appointments(ctx: HttpContextContract) {
        const data = ctx.request.all();
        console.log(data)
        const currdate = moment();

        const appointment = await Appointment.query().where("studentId", data.id).andWhere("status", "1").preload("forWhichTimeSlot", (slotQuery) => {
            slotQuery.preload("user")
        });
        return appointment
    }
    public async upCommingAppoinments(ctx: HttpContextContract) {
        return await this.appoinmentService.upCommingAppoinments(ctx);
    }
    /**
     * Status Controller
     * Ex Put Body: 
     *  
     * {
            "appointmentId":"lll"
        }
     */
    public async status(ctx: HttpContextContract) {
        try {
            await this.appoinmentValidator.status(ctx);
        } catch (error) {
            const errorObj = JSON.parse(error);
            return ctx.response.status(422).send({
                status: 'BAD',
                message: errorObj,
                result: []
            });
        }
        return await this.appoinmentService.status(ctx);
    }
}
