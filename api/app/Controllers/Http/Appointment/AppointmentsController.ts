import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from '../../../Models/Appointment'
import moment from 'moment';
moment().format()

import AppointmentsValidator from './AppoinmentsValidator';
import AppoinmentsService from './AppoinmentsService';

export default class AppointmentsController {
    private appoinmentValidator : AppointmentsValidator
    private appoinmentService : AppoinmentsService

    constructor(){
        this.appoinmentValidator = new AppointmentsValidator()
        this.appoinmentService = new AppoinmentsService()

    }
    async request(ctx: HttpContextContract) {
        const data = ctx.request.all();
        // console.log("appointment data ", data)
        const req = await Appointment.create(data)
        let x = moment(data.date).format("DD MMM YYYY").toString();
        console.log("x is =", x);

        return req;
    }
    public async upCommingAppoinments(ctx:HttpContextContract){
        return await this.appoinmentService.upCommingAppoinments(ctx);
    }
}
