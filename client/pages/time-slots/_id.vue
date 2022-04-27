<template>
	<div
		style="
			background-color: #9cb0ba;
			margin: 10px 20px;
			padding: 20px 10px;
			height: 400vh;
		"
	>
		<div>
			<profile-details v-bind:userId="id"></profile-details>
		</div>
		<hr />
		<div>
			<h3>Look for appointments:</h3>
			<div>
				<button v-on:click="chk()">check!!!!!!!</button>
			</div>
			<client-only>
				<h1>??????</h1>
				<date-picker :inline="true" v-model="date_today" format="D" />
			</client-only>
		</div>
	</div>
</template>

<script>
import profileDetails from "../../components/profileDetails.vue";
import moment from "moment";
moment().format();
export default {
	components: { profileDetails },
	data() {
		return {
			id: this.$route.params.id,
			date_today: null,
		};
	},
	created() {
		// console.log("created", this.date_today);
	},
	methods: {
		chk() {
			let date = moment(this.date_today).format("DD MMM YYYY");
			let day = moment(this.date_today).isoWeekday();
			// let x = this.date_today.getDay();

			// console.log(x.toString());
		},
	},
	watch: {
		con: function () {
			// console.log(" im from watch date  = ", this.date_today);
		},
	},
	computed: {
		con() {
			if (this.date_today !== null) {
				let date = moment(this.date_today).format("DD MMM YYYY");
				let day = moment(this.date_today).isoWeekday();
				console.log(date.toString());
				console.log(day.toString());
			}
		},
	},
};
</script>

<style>
</style>