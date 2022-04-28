<template>
	<div style="background-color: #9cb0ba; margin: 10px 20px">
		<profile-details
			v-bind:userId="this.$route.params.id"
		></profile-details>
	</div>
</template>

<script>
import profileDetails from "../../components/profileDetails.vue";
export default {
	components: {
		"profile-details": profileDetails,
	},
	data() {
		return {
			userId: null,
			editProfile: false,
		};
	},
	async created() {
		this.userId = this.$route.params.id;
	},

};
</script>