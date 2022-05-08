<template>
	<div>
		<h2>Edit Profile Page</h2>
		<hr />
		<div style="width: 50%">
			<div class="_log_form">
				<div class="_log_input_group">
					<Label>First Name:</Label>
					<Input
						placeholder="First Name"
						size="large"
						type="text"
						v-model="userInfo.first_name"
					></Input>
				</div>
				<div class="_log_input_group">
					<Label>Last Name:</Label>
					<Input
						placeholder="Last Name"
						size="large"
						type="text"
						v-model="userInfo.last_name"
					></Input>
				</div>
				<!-- User Can not change him/her email address  -->
				<!-- <div class="_log_input_group">
					<Label>Email:</Label>
					<Input
						v-model="userInfo.email"
						placeholder="Email"
						size="large"
						type="text"
					></Input>
				</div> -->
				<div
					class="_log_input_group"
					v-if="
						$store.state.authUser.user_type === 'teacher' ||
						$store.state.authUser.user_type === 'student'
					"
				>
					<Label>Depertment:</Label>
					<Input
						v-model="userInfo.dept"
						placeholder="Depertment"
						size="large"
						type="text"
					></Input>
				</div>
				<div
					class="_log_input_group"
					v-if="$store.state.authUser.user_type === 'teacher'"
				>
					<Label>Course Name:</Label>
					<Input
						v-model="userInfo.course"
						placeholder="Course"
						size="large"
						type="text"
					></Input>
				</div>
				<div
					class="_log_input_group"
					v-if="$store.state.authUser.user_type === 'student'"
				>
					<Label>Student ID:</Label>
					<Input
						v-model="userInfo.student_id"
						placeholder="Student ID"
						size="large"
						type="text"
					></Input>
				</div>
				<div
					class="_log_input_group"
					v-if="this.$store.state.authUser.user_type === 'admin'"
				>
					<Label>User Status:</Label>
					<Input
						v-model="userInfo.status"
						placeholder="status"
						size="large"
						type="text"
					></Input>
				</div>

				<div class="_log_button">
					<Button
						v-on:click="updateUser"
						type="success"
						size="large"
						long
						:loading="isLoading"
						:disabled="loading"
						>{{ isLoading ? "Please wait..." : "Update" }}</Button
					>
				</div>
			</div>
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
			// console.log("user info ", this.userInfo);
		}
	},
	methods: {
		async updateUser() {
			this.isLoading = true;
			try {
				const resData = await this.callApi(
					"put",
					"/profile/update",
					this.userInfo
				);
				this.isLoading = false;
				if (resData.status === 200) {
					this.s("Profile updated successfully");
				}
			} catch (error) {
				this.isLoading = false;
				this.swr();
			}
		},
	},
};
</script>