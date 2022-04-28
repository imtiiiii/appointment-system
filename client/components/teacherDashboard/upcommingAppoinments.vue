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
                        <th>{{item.byWhichStudent.user_name}}</th>
                        <th>{{item.byWhichStudent.email}}</th>
                        <th>{{item.byWhichStudent.dept}}</th>
                        <th>{{item.byWhichStudent.course}}</th>
                        <th>{{item.agenda}}</th>
                        <th>
                            <button>Accept</button>
                            <button>Reject</button>
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
</style>