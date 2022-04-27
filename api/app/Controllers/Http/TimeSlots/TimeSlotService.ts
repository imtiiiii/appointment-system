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

    public async update(ctx){
        const authUserId = ctx.auth.user.id;
        const updateFor = {...ctx.request.body()}
        updateFor['userId'] = authUserId
        
        try {
            await this.timeSlotQuery.update(updateFor);
            return ctx.response.status(200).send({
                status:'OK',
                message:'Your Slot is updated successfully',
                result:[],
            });
        } catch (error) {
            const errorObj = JSON.parse(error);
            return ctx.response.status(500).send({
                status:'BAD',
                message:errorObj,
                result:[],
            });
        }
    }

    public async delete(ctx){
        const authUserId = ctx.auth.user.id;
        const slotId = ctx.request.qs().slotId;
        const deleteData={
            userId: ctx.auth.user.id,
            slotId: ctx.request.qs().slotId,
        }
        return this.timeSlotQuery.delete(deleteData);

    }
}