<template>
	<div>
		<div>welcome to your appointment history</div>
	</div>
</template>

<script>
import moment from "moment";
moment().format();
export default {
	data() {
		return {
			currentDate: null,
		};
	},
	watch: {
		chk() {},
		history() {},
	},
	computed: {
		chk() {
			let now = moment().toString();
			this.currentDate = now;
			// console.log(this.currentDate);
		},
		async history() {
			console.log("history called", this.currentDate);

			const res = await this.callApi(
				"get",
				`/appointments?id=${
					this.$store.state.authUser.id
				}&type=${"history"}`
			);
			console.log(res);
		},
	},
};
</script>

<style>
</style>