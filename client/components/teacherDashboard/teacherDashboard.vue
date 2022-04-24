<template>
	<div>
		<div>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				Manage Your Meeting Slots
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				History
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				Add time slots
			</button>
		</div>
		<div>
			<!-- <client-only>
				<date-picker v-model="date_today" format="HH:MM" />
			</client-only> -->
			<vue-timepicker v-model="date_today"></vue-timepicker>
		</div>
		<div>
			<button v-on:click="time">check</button>
		</div>
	</div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
	components: {
		"vue-timepicker": VueTimepicker,
	},
	data() {
		return {
			date_today: "",
		};
	},
	methods: {
		time() {
			console.log(this.date_today);
		},
	},
};
</script>

<style>
</style>