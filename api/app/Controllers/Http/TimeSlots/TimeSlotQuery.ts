import TimeSlot from "App/Models/TimeSlot";


export default class TimeSlotQuery {

    public async created(slotsFor){
        const slots = await TimeSlot.query().where('teacherId',slotsFor.id).andWhere('dayId',slotsFor.dayId).select('id','startTime','endTime','dayId');
        return slots;
    }
}