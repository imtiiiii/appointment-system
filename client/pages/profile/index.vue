<template>
    <div>
        <!-- {{$route.params.id}} -->
        <div style="margin-left:20px">
            <profile-details v-bind:userId="userId"> </profile-details>
        </div>
        
        <button style="margin-top:10px" v-on:click="editProfile=!editProfile">{{editProfile ? 'Undo': 'Edit Profile'}}</button>
        <div v-if="editProfile" style="margin-left:20px">
            <edit-profile></edit-profile>
        </div>
    </div>
</template>

<script>
import profileDetails from '../../components/profileDetails.vue'
import editProfile from '../../components/editProfile.vue'
export default {
    components:{
        'profile-details': profileDetails,
        'edit-profile': editProfile,
    },
    data(){
        return{
            userId: null,
            editProfile: false,
        }
    },
    async created(){
        this.userId = this.$store.state.authUser.id;
        console.log(this.userId);
    }
}
</script>