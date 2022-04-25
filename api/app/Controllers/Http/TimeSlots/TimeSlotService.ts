import TimeSlotQuery from "./TimeSlotQuery";


export default class TimeSlotService {
    private timeSlotQuery : TimeSlotQuery
    constructor(){
        this.timeSlotQuery = new TimeSlotQuery()
    }
    public async available(){

    }
}