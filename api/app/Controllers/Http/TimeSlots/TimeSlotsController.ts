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
    //TODO: This Controller only accessable by teacher type user
    public async availableSlots(ctx:HttpContextContract){
        try{
            const payload = await this.timeSlotValidator.availableSlots(ctx);
        }catch(error){
            const errorObject = JSON.parse(error);
            return ctx.response.status(422).send({
                status:'BAD',
                message: errorObject,
                result:[]
            });
        }
        return await this.timeSlotService.availableSlots(ctx);
    }
}
