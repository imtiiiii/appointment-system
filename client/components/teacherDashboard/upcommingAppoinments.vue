<template>
    <div>
        <div style="display:flex; margin-left:35%">
            <div v-if="upCommingAppoinments.length > 0">
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Day</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Dept</th>
                        <th>Course</th>
                        <th>Agenda</th>
                        <th>Options</th>
                    </tr>
                    <tr v-for="(item,index) in upCommingAppoinments" :key="index">
                        <th>{{item.date}}</th>
                        <th>{{item.forWhichTimeSlot.day.day_name}}</th>
                        <th><button id="link" v-on:click="jumpToProfile(item.byWhichStudent.id)">{{item.byWhichStudent.user_name}}</button> </th>
                        <th>{{item.byWhichStudent.email}}</th>
                        <th>{{item.byWhichStudent.dept}}</th>
                        <th>{{item.byWhichStudent.course}}</th>
                        <th>{{item.agenda}}</th>
                        <th>
                            <!-- acceptAppointment(item.id,index,1) here 1 means enum value of status accept -->
                            <Button v-on:click="changeStatus(item.id,index,'1')">Accept</Button>
                            <!-- acceptAppointment(item.id,index,1) here 2 means enum value of status rejection -->
                            <Button v-on:click="changeStatus(item.id,index,'2')">Reject</Button>
                        </th>
                    </tr>
                </table>
            </div>
            <div v-else style="margin: 50% 130%">
                <h4 class="_log_form_title">No Upcomming Appoinments Request </h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            upCommingAppoinments:[]
        }
    },
    async created(){
        const {data} = await this.callApi('get','/appointments/upCommingAppoinments');
        this.upCommingAppoinments = data;

    },
    methods:{
        async changeStatus(itemId,index,status){
            try {
                const data = await this.callApi('put','/appointments/status',{
                    appointmentId:itemId,
                    status:status,
                })
                this.upCommingAppoinments.splice(index,1);
                const messageBody = (status=='1'?'Appointment Accepted':'Appointment Rejected');
                this.i(messageBody)
            } catch (error) {
                this.swr();
            }
            
        },
        jumpToProfile(profileId){
            this.$router.push(`profile/${profileId}`)
        }
    }
}
</script>

<style>
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
    button#link {
        background: none!important;
        border: none;
        padding: 0!important;
        /*optional*/
        font-family: arial, sans-serif;
        /*input has OS specific font-family*/
        color: #069;
        text-decoration: underline;
        cursor: pointer;
    }
</style>