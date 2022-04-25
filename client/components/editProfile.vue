<template>
    <div>
        <h2>Edit Profile Page:</h2>
        <hr>
        <div style="margin-left:10px">
            <div>
                <label for="">First Name: </label>
                <input type="text"  v-model="userInfo.firstName">
            </div>
            <div>
                <label for="">Last Name: </label>
                <input type="text" v-model="userInfo.lastName">
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
                <input type="text" v-model="userInfo.studentId">
            </div>
            <button v-on:click="updateUser">Update</button>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    data(){
        return {
            // userInfo:this.$store.state.authUser,
            userInfo:{
                firstName : this.$store.state.authUser.first_name,
                lastName : this.$store.state.authUser.last_name,
                dept: this.$store.state.authUser.dept,
                course: this.$store.state.authUser.course,
                studentId: this.$store.state.authUser.student_id,
            }
        }
    },
    methods:{
        
        async updateUser(){
            try {
                const resData = await this.callApi('put','/profile/update',this.userInfo);
                if(resData.status === 200){
                    this.s('Profile updated successfully');
                }
            } catch (error) {
                this.swr();
            }
            

        }
    }
    
}
</script>