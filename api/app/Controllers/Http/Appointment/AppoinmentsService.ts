import AppoinmentQuery from './AppoinmentsQuery'

export default class AppoinmentService {
    private appoinmentQuery : AppoinmentQuery;

    constructor(){
        this.appoinmentQuery = new AppoinmentQuery();
    }
    public async upCommingAppoinments(ctx){
        const upCommingAppoinmentsFor = {
            teacherId: ctx.auth.user.id
        }
        return this.appoinmentQuery.upCommingAppoinments(upCommingAppoinmentsFor);
    }
}