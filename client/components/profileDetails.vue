<template>
	<div>
		<h2>Profile Details {{ userDetails.id }}</h2>
		<hr />
		<div style="background-color: #9cb0ba">
			<h4>Username: {{ userDetails.user_name }}</h4>
			<h4>First Name: {{ userDetails.first_name }}</h4>
			<h4>Last Name: {{ userDetails.last_name }}</h4>
			<h4>Email: {{ userDetails.email }}</h4>
			<h4>Type: {{ userDetails.user_type }}</h4>
			<h4
				v-if="
					userDetails.user_type === 'teacher' ||
					userDetails.user_type === 'student'
				"
			>
				Dept: {{ userDetails.dept }}
			</h4>
			<h4 v-if="userDetails.course">Course: {{ userDetails.course }}</h4>
			<h4 v-if="userDetails.student_id">
				Student Id: {{ userDetails.student_id }}
			</h4>
		</div>
	</div>
</template>
<script>
export default {
	props: ["userId"],
	data() {
		return {
			userDetails: {},
		};
	},
	async created() {
		const { data } = await this.callApi("get", `/profile/${this.userId}`);
		this.userDetails = data;
		// console.log(this.userDetails);
	},
};
</script>