import TimeSlotQuery from "./TimeSlotQuery";


export default class TimeSlotService {
    private timeSlotQuery : TimeSlotQuery
    constructor(){
        this.timeSlotQuery = new TimeSlotQuery()
    }
    public async created(ctx){
        const authUserId = (ctx.auth.user).toJSON().id;
        const day_id = ctx.request.only(['day']).day;
        const slotsFor = {
            id: authUserId,
            dayId: day_id 
        }
        return await this.timeSlotQuery.created(slotsFor);
    }
    public async available(ctx){
        // const authUserId = (ctx.auth.user).toJSON().id;
        // const day_id = ctx.request.qs().day;
        const availableSlotsFor = {
            id: (ctx.auth.user).toJSON().id,
            dayId: ctx.request.qs().day,
        }
        return this.timeSlotQuery.available(availableSlotsFor);
    }
}