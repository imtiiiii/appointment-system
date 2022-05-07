import Appointment from "App/Models/Appointment";
import moment from "moment";

export default class AppoinmentQuery{
    public async upCommingAppoinments(upCommingAppoinmentsFor){
        /**
         * Find all appoinments Request which is not accepted yet
         */
        const cuurentDate = moment().toString();
        let appoinments = await Appointment.query().select('*').preload('forWhichTimeSlot',(timeSlotQuery)=>{
            timeSlotQuery.where('teacherId',upCommingAppoinmentsFor.teacherId).preload('day');
        }).preload('byWhichStudent').where('date','>=',cuurentDate).andWhere('status','0').orderBy('date','desc');
        // let appoinments = await Appointment.query().select('*').preload('forWhichTimeSlot',(timeSlotQuery)=>{
        //     timeSlotQuery.where('teacherId',upCommingAppoinmentsFor.teacherId).preload('day');
        // }).preload('byWhichStudent')
        // let appoinments = await Appointment.query().select('*').preload('byWhichStudent');
        const appoinmentsJSON = appoinments.map((appoinments)=> appoinments.serialize()) 
        return appoinmentsJSON;
    }

    public async status(changeStatusFor){
        let appointment = await Appointment.findOrFail(changeStatusFor.appointmentId);
        appointment.status = changeStatusFor.status;

        await appointment.save();
        
    }
}