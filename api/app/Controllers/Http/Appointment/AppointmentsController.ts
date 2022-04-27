import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Appointment from '../../../Models/Appointment'

export default class AppointmentsController {
    async request(ctx: HttpContextContract) {
        const data = ctx.request.all();
        // console.log("appointment data ", data)
        const req = await Appointment.create(data)
        return req;
    }
}
