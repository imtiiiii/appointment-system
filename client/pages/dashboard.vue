<template>
	<div style="width: 60%; margin: 0 auto; border: 2px solid black">
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