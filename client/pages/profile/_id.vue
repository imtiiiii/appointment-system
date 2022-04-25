<template>
	<div>
		{{ userId }}
		<profile-details
			v-bind:userId="this.$route.params.id"
		></profile-details>
		<button
			style="margin-top: 10px"
			v-on:click="editProfile = !editProfile"
		>
			{{ editProfile ? "Undo" : "Edit Profile" }}
		</button>
		<div v-if="editProfile" style="margin-left: 20px">
			<edit-profile v-bind:userId="userId"></edit-profile>
		</div>
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