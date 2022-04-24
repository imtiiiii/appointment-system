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
	</div>
</template>

<script>
import adminDashboard from "../components/adminDashboard/adminDashboard.vue";
import TeacherDashboard from "../components/teacherDashboard/teacherDashboard.vue";

export default {
	middleware: "auth",
	components: { adminDashboard, TeacherDashboard },
	data() {
		return {
			user: null,
		};
	},
	created() {
		console.log("hello");
		this.user = this.$store.state.authUser;
		console.log(this.user);
	},
};
</script>

<style scoped>
</style>