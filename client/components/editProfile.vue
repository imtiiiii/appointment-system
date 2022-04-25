<template>
	<div>
		<h2>Edit Profile Page: {{ userId }}</h2>
		<hr />
		<div style="margin-left: 10px">
			<div>
				<label for="">First Name: </label>
				<input type="text" v-model="userInfo.first_name" />
			</div>
			<div>
				<label for="">Last Name: </label>
				<input type="text" v-model="userInfo.last_name" />
			</div>
			<div>
				<label for="">Email: </label>
				<input type="text" v-model="userInfo.email" />
			</div>
			<div
				v-if="
					userInfo.user_type === 'teacher' ||
					userInfo.user_type === 'student'
				"
			>
				<label for="">Depertment </label>
				<input type="text" v-model="userInfo.dept" />
			</div>
			<div v-if="userInfo.user_type === 'teacher'">
				<label for="">Course: </label>
				<input type="text" v-model="userInfo.course" />
			</div>
			<div v-if="userInfo.user_type === 'student'">
				<label for="">Student Id: </label>
				<input type="text" v-model="userInfo.studentId" />
			</div>
			<button v-on:click="updateUser">Update</button>
		</div>
	</div>
</template>
<script>
import _ from "lodash";
export default {
	props: ["userId"],
	data() {
		return {
			// userInfo:this.$store.state.authUser,
			userInfo: {},
		};
	},
	async created() {
		// console.log("edit profile props=", this.userId);
		const user = await this.callApi("get", `profile/${this.userId}`);
		// console.log("user=", user);
		if (user.status === 200) {
			this.userInfo = user.data;
			console.log("user info ", this.userInfo);
		}
	},
	methods: {
		async updateUser() {
			try {
				const resData = await this.callApi(
					"put",
					"/profile/update",
					this.userInfo
				);
				if (resData.status === 200) {
					this.s("Profile updated successfully");
				}
			} catch (error) {
				this.swr();
			}
		},
	},
};
</script>