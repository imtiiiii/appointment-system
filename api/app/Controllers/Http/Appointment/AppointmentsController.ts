import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from '../../../Models/Appointment'
import moment from 'moment';
moment().format()

export default class AppointmentsController {
    async request(ctx: HttpContextContract) {
        const data = ctx.request.all();
        // console.log("appointment data ", data)
        const req = await Appointment.create(data)
        let x = moment(data.date).format("DD MMM YYYY").toString();
        console.log("x is =", x);

        return req;
    }
}
