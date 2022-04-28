import Appointment from "App/Models/Appointment";

export default class AppoinmentQuery{
    public async upCommingAppoinments(upCommingAppoinmentsFor){
        /**
         * Find all appoinments Request which is not accepted yet
         */
        let appoinments = await Appointment.query().select('*').preload('forWhichTimeSlot',(timeSlotQuery)=>{
            timeSlotQuery.where('teacherId',upCommingAppoinmentsFor.teacherId)
        }).where('status','0').orWhere('status','2');
        const appoinmentsJSON = appoinments.map((appoinments)=> appoinments.serialize()) 
        return appoinmentsJSON;
    }
}