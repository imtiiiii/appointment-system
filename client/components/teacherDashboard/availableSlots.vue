<template>
    <div style="margin: 100px 50px">
        <h2>Available Slots</h2>
        <hr>
        <div v-if="availableSlots">
            <table>
                <tr>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <!-- <th>Country</th> -->
                </tr>
                <tr v-for="(item,index) in availableSlots" :key="index">
                    <td>{{item.start_time}}</td>
                    <td>{{item.end_time}}</td>
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
export default {
    data(){
        return {
            day:'',
            availableSlots:null,
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
            this.availableSlots = data;
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