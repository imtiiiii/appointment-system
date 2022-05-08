<template>
	<div>
		<div style="text-align: center">
			<h2>Welcome to your {{ type }} appointment</h2>
		</div>
		<div
			v-if="appointments.length !== 0"
			style="
				height: 100%;
				background-color: #b8caff;
				width: 70%;
				margin: 30px auto;
				padding-top: 1px;
				box-shadow: 10px 10px 5px #888888;
			"
		>
			<div class="slot">
				<h6>Date</h6>
				<h6>Agenda</h6>
				<h6>Time</h6>
				<h6>Teacher</h6>
				<h6>Depertment</h6>
			</div>
			<div
				class="slot"
				v-for="(appointment, index) of appointments"
				:key="index"
			>
				<h4 style="text-decoration: underline">
					{{ appointment.date }}
				</h4>
				<h4>{{ appointment.agenda }}</h4>
				<h4>
					{{ appointment.forWhichTimeSlot.start_time }}-{{
						appointment.forWhichTimeSlot.end_time
					}}
				</h4>
				<h4>
					{{
						appointment.forWhichTimeSlot.user.first_name +
						" " +
						appointment.forWhichTimeSlot.user.last_name
					}}
				</h4>
				<h4>{{ appointment.forWhichTimeSlot.user.dept }}</h4>
			</div>
		</div>
		<div v-else>
			<h3>Nothing to show</h3>
		</div>
	</div>
</template>

<script>
import moment from "moment";
moment().format();
export default {
	props: ["type"],
	data() {
		return {
			currentDate: null,
			appointments: [],
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
			this.appointments = [];
			// console.log("history called", this.currentDate);

			const res = await this.callApi(
				"get",
				`/appointments?id=${this.$store.state.authUser.id}&type=${this.type}`
			);
			// this.appointments = res.data;
			// console.log(res.data);
			for (let i of res.data) {
				// console.log("type= ", this.type);
				if (this.type == "upcoming") {
					let slot = moment(i.date);
					let currDate = moment();
					const compare = slot.isBefore(currDate);
					// console.log("??=", slot.isBefore(currDate));
					if (compare === false) {
						i.date = moment(i.date).format("DD-MM-YYYY");
						this.appointments.push(i);
					}
				} else if (this.type == "history") {
					let slot = moment(i.date);
					let currDate = moment();
					const compare = slot.isBefore(currDate);
					// console.log("??=", slot.isBefore(currDate));
					if (compare === true) {
						i.date = moment(i.date).format("DD-MM-YYYY");
						this.appointments.push(i);
					}
				}
			}
			// console.log("final", this.appointments);
		},
	},
};
</script>

<style scoped>
.slot {
	text-align: center;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	/* grid-row-gap: 100px; */
	grid-column-gap: 60px;
	margin: 10px 0px 100px 0px;
	padding: 30px 0px;
}
</style>