<template>
    <div style="margin: 100px 50px; width:40%;" class="_log_form_main">
        <h2 class="_log_form_title">Created Slots</h2>
        <div v-if="createdSlots.length">
            <table>
                <tr>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Options</th>
                </tr>
                <tr v-for="(item,index) in createdSlots" :key="index">
                    <td v-if="editFor !== item.id">{{item.start_time}}</td>
                    <td v-if="editFor === item.id">
                        <vue-timepicker
                            placeholder="start-time"
                            v-model="startTime"
                        ></vue-timepicker>
                    </td>
                    <td v-if="editFor !== item.id">{{item.end_time}}</td>
                    <td v-if="editFor === item.id">
                        <vue-timepicker
                            placeholder="end-time"
                            v-model="endTime"
                        ></vue-timepicker>
                    </td>
                    <td>
                        <button v-on:click="edit(item.id)">{{editFor === item.id ? 'Undo':'Edit'}}</button>
                        <button v-on:click="update(item.id)">Update</button>
                        <button v-on:click="deleteSlot(item.id,index)">Delete</button>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            <h4>No data yet...</h4>
        </div>
        <hr>
        <Select
            placeholder="Select Day"
            size="large"
            v-model="day"
        >
            <Option value="1" >sunday</Option>
            <Option value="2" >monday</Option>
            <Option value="3">tueday</Option>
            <Option value="4">wednesday</Option>
            <Option value="5">thursday</Option>
            <Option value="6">Friday</Option>
            <Option value="7">Satarday</Option>
        </Select>
        <!-- {{day}} -->
        <!-- {{this.$store.state.authUser.id}} -->
    </div>
</template>
<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
export default {
    components:{
        "vue-timepicker": VueTimepicker,
    },
    data(){
        return {
            day:'',
            startTime: "",
			endTime: "",
            createdSlots:[],
            editFor:-1,
        }
    },
    async created(){
        try {
            
        } catch (error) {
            this.e('Something is wrong to fetch your created slots data');
        }
    },
    watch:{
        async day(newValue,oldValue){
            const {data} = await this.callApi('post','/time-slots/created',{day:newValue});
            this.createdSlots = data;
        }
    },
    methods:{
        async deleteSlot(slotId,index){
            const resData = await this.callApi('delete',`/time-slots/delete/?slotId=${slotId}`)
            this.i('Slot is deleted successfully')
            this.createdSlots.splice(index,1);
        },
        edit(slotId){
            if(slotId === this.editFor){
                this.editFor = -1;
            }else{
                this.editFor = slotId;
            }
            
        },
        async update(slotId){
            const reqData = {
                dayId:this.day,
                slotId:slotId,
                newStartTime:this.startTime+':00',
                newEndTime:this.endTime+':00',
            }
            try{
                await this.$axios.$put('/time-slots/update',reqData);
                this.i('Updated Successfully');
            }catch(error){
                this.i('Slot conflicting')
            }
        }
    }
}
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>