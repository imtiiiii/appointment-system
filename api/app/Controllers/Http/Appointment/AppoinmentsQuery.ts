import Appointment from "App/Models/Appointment";
import moment from "moment";

export default class AppoinmentQuery{
    public async upCommingAppoinments(upCommingAppoinmentsFor){
        /**
         * Find all appoinments Request which is not accepted yet
         */
        const cuurentDate = moment().toString();
        let appoinments = await Appointment.query().select('*').preload('forWhichTimeSlot',(timeSlotQuery)=>{
            timeSlotQuery.where('teacherId',upCommingAppoinmentsFor.teacherId)
        }).where('date','>=',cuurentDate).where('status','0').orWhere('status','2').orderBy('date','desc');
        const appoinmentsJSON = appoinments.map((appoinments)=> appoinments.serialize()) 
        return appoinmentsJSON;
    }
}