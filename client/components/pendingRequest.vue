<template>
	<div></div>
</template>

<script>
export default {
	data() {
		return {
			requests: null,
		};
	},
	async created() {
		const res = await this.callApi("get", "dashboard/request");
		console.log(res);
	},
};
</script>

<style>
</style>