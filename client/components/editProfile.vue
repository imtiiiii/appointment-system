<template>
    <div>
        <h2>Edit Profile Page:</h2>
        <hr>
        <div style="margin-left:10px">
            <div>
                <label for="">First Name: </label>
                <input type="text"  v-model="userInfo.first_name">
            </div>
            <div>
                <label for="">Last Name: </label>
                <input type="text" v-model="userInfo.last_name">
            </div>
            <div>
                <label for="">Depertment </label>
                <input type="text" v-model="userInfo.dept">
            </div>
            <div>
                <label for="">Course: </label>
                <input type="text" v-model="userInfo.course">
            </div>
            <div>
                <label for="">Student Id: </label>
                <input type="text" v-model="userInfo.student_id">
            </div>
            <button v-on:click="updateUser">Update</button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userInfo:this.$store.state.authUser,
        }
    },
    methods:{
        async updateUser(){
            
        }
    }
    
}
</script>