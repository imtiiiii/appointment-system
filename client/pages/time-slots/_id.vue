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
		<h3>Look for appointments:</h3>
		<div class="available-bookings">
			<div>
				<client-only>
					<date-picker
						:inline="true"
						v-model="date_today"
						format="D"
					/>
				</client-only>
			</div>
			<div v-if="date_today !== null && slots.length !== 0" class="slot">
				<div v-for="(slot, index) of slots" :key="index">
					<button
						class="update"
						style="
							background-color: #42cc8c;
							width: 100%;
							padding: 15px 0px;
						"
					>
						{{ slot.start_time }}-{{ slot.end_time }}
					</button>
				</div>
			</div>
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
			slots: [],
		};
	},
	created() {
		// console.log("created", this.date_today);
	},
	methods: {},
	watch: {
		timings: function () {
			// console.log(" im from watch date  = ", this.date_today);
		},
	},
	computed: {
		async timings() {
			if (this.date_today !== null) {
				let date = moment(this.date_today).format("DD MMM YYYY");
				let day = moment(this.date_today).isoWeekday();
				console.log(date.toString());
				console.log(day.toString());
				const data = {
					teacher_id: this.id,
					day_id: day,
				};
				const slots = await this.callApi(
					"get",
					`time-slots?teacher_id=${this.id}&day_id=${day}`
				);
				this.slots = slots.data;
			}
		},
	},
};
</script>

<style>
.available-bookings {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-row-gap: 26px;
}
.slot {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 20px;
}
</style>