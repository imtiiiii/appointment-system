<template>
	<div
		style="background-color: #9cb0ba; margin: 10px 20px; padding: 100px 0px"
	>
		<profile-details
			v-bind:userId="this.$route.params.id"
		></profile-details>
		<div
			v-if="
				$store.state.authUser.user_type === 'admin' ||
				$store.state.authUser.id === userId
			"
		>
			<button
				v-on:click="editProfile = !editProfile"
				style="
					background-color: #42cc8c;
					width: 100px;
					padding: 15px 0px;
					margin: 10px 20px;
				"
			>
				{{ editProfile ? "Undo" : "Edit Profile" }}
			</button>
		</div>
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
		this.userId = parseInt(this.userId);
		// console.log("userId", this.userId);
		// console.log("user type", this.$store.state.authUser.user_type);

		// console.log(" auth user user id", this.$store.state.authUser.id);
		// console.log("router id", this.userId);
	},
	mounted() {
		// if (
		// 	this.$store.state.authUser.user_type !== "admin" &&
		// 	this.userId !== this.$store.state.authUser.id
		// ) {
		// 	this.$router.push("/profile");
		// }
	},
};
</script>