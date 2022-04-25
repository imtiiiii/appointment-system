import TimeSlot from "App/Models/TimeSlot";


const hp = [];
let hpSize = 0;

function insert(value){
    hp[hpSize] = value;
    hpSize = hpSize + 1;

    //siftUp
    let i = hpSize - 1;
    while(i> 0 && (hp[Math.floor((i-1)/2)] > hp[Math.floor(i)])){
        let temp = hp[Math]
    }
}

function removeMin(){
    let temp = hp[0];
    hp[0] = hp[hpSize-1];
    hp[hpSize-1] = temp;

    hpSize = hpSize - 1;

    //siftDown
    let i = 0;
    while((i*2) + 1< hpSize){
        let j = hp[(i*2)+1];
        if((i*2)+2 < hpSize && hp[(i*2)+2] < hp[(i*2)+1]){
            j = hp[(i*2)+2];
        }
        if(hp[i] <= hp[j]){
            break;
        }

        let temp = hp[i];
        hp[i] = hp[j];
        hp[j] = temp;
        i = j;
    }

    return hp[hpSize];
}


export default class TimeSlotQuery {

    public async availableSlots(slotsFor){
        // console.log(slotsFor);
        // console.log(slotsFor.id);
        // const slots = await TimeSlot.query().where('teacherId',slotsFor.id).andWhere('dayId',slotsFor.dayId);
        // console.log(slots);
        
        const dummy = [12,8,3,31,2];
        dummy.forEach(element => {
            insert(element);
        });
        console.log('HP SIZE: ',hpSize);
        for(let i=0;i<hpSize;i++){
            console.log(hp[i]);
        }

        // return slots;
    }
}