import TimeSlot from "App/Models/TimeSlot";
import moment from 'moment';


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
        let availableSlots = [];
        for(let i=0;i<createdSlotsJSON.length-1;i++){
            

            let endTime = moment(createdSlotsJSON[i].end_time,'HH:mm:ss');
            
            let startTime = moment(createdSlotsJSON[i+1].start_time,'HH:mm:ss');
            
            let dif = startTime.diff(endTime,'milliseconds');
            /**
             *  We take 3 minute as time gap to choose it available time slot
             */
            let timeThreshold = 3
            if(dif> timeThreshold*60*1000){
                endTime.add(1,'minutes');
                startTime.subtract(1,'minutes');
                const newStart = endTime.format('HH:mm:ss');
                const newEnd = startTime.format('HH:mm:ss');
                /**
                 *  New Available Time Slot Object
                 */
                const obj = {
                    'start_time': newStart,
                    'end_time': newEnd,
                }
                availableSlots.push(obj);
            }
        }
        return availableSlots;
    }
}