<template>
    <div>
        <!-- {{$route.params.id}} -->
        <profile-details v-bind:userId="this.$route.params.id"></profile-details>
    </div>
</template>

<script>
import profileDetails from '../../components/profileDetails.vue'
export default {
    components:{
        'profile-details': profileDetails,
    },
    data(){
        return{
            editProfile: false,
        }
    }
}
</script>