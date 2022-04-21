<template>
	<div>
		<admin-dashboard></admin-dashboard>
	</div>
</template>

<script>
import adminDashboard from "../components/adminDashboard.vue";
export default {
	components: { adminDashboard },
	created() {
		console.log("hello");
	},
};
</script>

<style scoped>
</style>