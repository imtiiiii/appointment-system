import TimeSlotQuery from "./TimeSlotQuery";


export default class TimeSlotService {
    private timeSlotQuery : TimeSlotQuery
    constructor(){
        this.timeSlotQuery = new TimeSlotQuery()
    }
    public async availableSlots(ctx){
        const authUserId = (ctx.auth.user).toJSON().id;
        const day_id = ctx.request.only(['day']).day;
        const slotsFor = {
            id: authUserId,
            dayId: day_id 
        }
        return await this.timeSlotQuery.availableSlots(slotsFor);
    }
}