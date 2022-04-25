<template>
	<div>
		<h2>Profile Details {{ userDetails.id }}</h2>
		<hr />
		<div>
			<h4 style="margin: 20px 10px">
				Username: {{ userDetails.user_name }}
			</h4>
			<h4 style="margin: 20px 10px">
				First Name: {{ userDetails.first_name }}
			</h4>
			<h4 style="margin: 20px 10px">
				Last Name: {{ userDetails.last_name }}
			</h4>
			<h4 style="margin: 20px 10px">Email: {{ userDetails.email }}</h4>
			<h4 style="margin: 20px 10px">Type: {{ userDetails.user_type }}</h4>
			<h4
				style="margin: 20px 10px"
				v-if="
					userDetails.user_type === 'teacher' ||
					userDetails.user_type === 'student'
				"
			>
				Dept: {{ userDetails.dept }}
			</h4>
			<h4 style="margin: 20px 10px" v-if="userDetails.course">
				Course: {{ userDetails.course }}
			</h4>
			<h4 style="margin: 20px 10px" v-if="userDetails.student_id">
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