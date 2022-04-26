import TimeSlot from "App/Models/TimeSlot";


export default class TimeSlotQuery {

    public async created(slotsFor){
        const slots = await TimeSlot.query().where('teacherId',slotsFor.id).andWhere('dayId',slotsFor.dayId).select('id','startTime','endTime','dayId').orderBy('startTime','asc');
        return slots;
    }

    public async available(availableSlotsFor){
       const createdSlots = await this.created(availableSlotsFor);
       let createdSlotsJSON = createdSlots.map((createdSlots)=> createdSlots.toJSON())
    
       const beginingTime = {
           id: availableSlotsFor.id,
           start_time:'00:00:00',
           end_time:'00:00:00',
           day_id:availableSlotsFor.dayId
       }
       const endTime = {
            id: availableSlotsFor.id,
            start_time:'23:59:00',
            end_time:'23:59:00',
            day_id:availableSlotsFor.dayId
        }
        createdSlotsJSON.unshift(beginingTime);
        createdSlotsJSON.push(endTime);
    //    console.log(createdSlotsJSON);
        let availableSlots = [];
        for(let i=0;i<createdSlotsJSON.length - 1;i++){
            console.log(createdSlotsJSON[i].end_time, createdSlotsJSON[i+1].start_time);
        }
    }
}