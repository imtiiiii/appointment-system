<template>
	<div>
		<div v-if="user.user_type === 'admin'">
			<h3>Admin dashboard</h3>
			<admin-dashboard></admin-dashboard>
		</div>
		<div v-if="user.user_type === 'teacher'">
			<h3>Teacher dashboard</h3>
			<teacher-dashboard></teacher-dashboard>
		</div>
		<div v-if="user.user_type === 'student'">
			<h3>Student dashboard</h3>
			<student-dashboard></student-dashboard>
		</div>
	</div>
</template>

<script>
import adminDashboard from "../components/adminDashboard/adminDashboard.vue";
import StudentDashboard from "../components/studentDashboard/studentDashboard.vue";
import TeacherDashboard from "../components/teacherDashboard/teacherDashboard.vue";

export default {
	middleware: "auth",
	components: { adminDashboard, TeacherDashboard, StudentDashboard },
	data() {
		return {
			user: null,
		};
	},
	created() {
		// console.log("hello");
		this.user = this.$store.state.authUser;
		// console.log(this.user);
	},
};
</script>

<style scoped>
</style>