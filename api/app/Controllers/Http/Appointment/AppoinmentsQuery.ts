import Appointment from "App/Models/Appointment";
import moment from "moment";
moment().format()
export default class AppoinmentQuery{
    public async upCommingAppoinments(upCommingAppoinmentsFor){
        /**
         * Find all appoinments Request which is not accepted yet
         */
        let cuurentDate = moment().toString();
        // let appoinments = await Appointment.query().select('*').preload('forWhichTimeSlot',(timeSlotQuery)=>{
        //     timeSlotQuery.where('teacherId',upCommingAppoinmentsFor.teacherId).preload('day');
        // }).preload('byWhichStudent').where('date','>=',cuurentDate).andWhere('status','0').orderBy('date','desc');
        let appoinments = await Appointment.query().select('*').preload('forWhichTimeSlot',(timeSlotQuery)=>{
            timeSlotQuery.where('teacherId',upCommingAppoinmentsFor.teacherId).preload('day');
        }).preload('byWhichStudent').andWhere('status','0').orderBy('date','desc');
        // let appoinments = await Appointment.query().select('*').preload('byWhichStudent');
        const appoinmentsJSON = appoinments.map((appoinments)=> appoinments.serialize())
        const finalResult : object[] = [];
        for(let x of appoinmentsJSON){
            let dbDate = moment(x.date);
            if(dbDate.isAfter(cuurentDate)){
                finalResult.push(x);
            }
        } 
        // return appoinmentsJSON;
        return finalResult;
    }

    public async status(changeStatusFor){
        let appointment = await Appointment.findOrFail(changeStatusFor.appointmentId);
        appointment.status = changeStatusFor.status;

        await appointment.save();
        
    }
}