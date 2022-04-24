import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TimeSlot from '../../../Models/TimeSlot'
export default class TimeSlotsController {
    public async add(ctx: HttpContextContract) {
        const data = ctx.request.all();
        console.log("data=", data)
        const time = await TimeSlot.create(data);
        return time;
    }
}
