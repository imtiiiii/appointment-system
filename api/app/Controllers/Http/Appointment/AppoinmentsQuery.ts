import Appointment from "App/Models/Appointment";

export default class AppoinmentQuery{
    public async upCommingAppoinments(upCommingAppoinmentsFor){
        /**
         * Find all appoinments Request which is not accepted yet
         */
        let appoinments = await Appointment.query().select('*').preload('forWhichTimeSlot');
        appoinments = appoinments.map((appoinments)=> appoinments.serialize()) 
        console.log(appoinments);
    }
}