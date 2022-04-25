import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TimeSlot from '../../../Models/TimeSlot'
import TimeSlotValidator from './TimeSlotValidator';
import TimeSlotService from './TimeSlotService';
export default class TimeSlotsController {
    private timeSlotValidator : TimeSlotValidator
    private timeSlotService : TimeSlotService

    constructor(){
        this.timeSlotService = new TimeSlotService()
        this.timeSlotValidator = new TimeSlotValidator()
    }
    public async add(ctx: HttpContextContract) {
        const data = ctx.request.all();
        console.log("data=", data)
        const time = await TimeSlot.create(data);
        return time;
    }
}
