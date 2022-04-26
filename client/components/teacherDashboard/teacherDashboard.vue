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
		<div style="display: flex">
			<created-slot></created-slot>
			<div style="margin: 100px 50px; width: 50%">
				<!-- <client-only>
					<date-picker v-model="date_today" format="HH:MM" />
				</client-only> -->
				<!-- <vue-timepicker v-model="date_today"></vue-timepicker> -->
				<div class="_log_form_main">
					<h2 class="_log_form_title">Add available time slots</h2>

					<div class="_log_form">
						<div class="_log_input_group">
							<Select
								placeholder="Select Day"
								size="large"
								v-model="day"
							>
								<Option value="1">sunday</Option>
								<Option value="2">monday</Option>
								<Option value="3">tueday</Option>
								<Option value="4">wednesday</Option>
								<Option value="5">thursday</Option>
								<Option value="6">Friday</Option>
								<Option value="7">Satarday</Option>
							</Select>
						</div>
						<div class="_log_input_group">
							<vue-timepicker
								placeholder="start-time"
								v-model="startTime"
							></vue-timepicker>
						</div>
						<div class="_log_input_group">
							<vue-timepicker
								placeholder="end-time"
								v-model="endTime"
							></vue-timepicker>
						</div>
						<div class="_log_button">
							<Button
								@click="addSlot"
								type="success"
								size="large"
								long
								>Add</Button
							>
						</div>
					</div>
				</div>
			</div>
			<!-- <div style="margin: 100px 50px">
				<h2>Available Slots</h2>
			</div> -->
			<available-slot></available-slot>
		</div>
	</div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import createdSlot from "./createdSlots.vue";
import availableSlots from "./availableSlots.vue";

export default {
	components: {
		"vue-timepicker": VueTimepicker,
		"created-slot": createdSlot,
		"available-slot": availableSlots,
	},
	data() {
		return {
			day: "",
			startTime: "",
			endTime: "",
			user: null,
		};
	},
	created() {
		this.user = this.$store.state.authUser;
		// console.log(this.user);
	},
	methods: {
		async addSlot() {
			// console.log(this.day);
			// console.log(this.startTime);
			// console.log(this.endTime);
			const addToDb = await this.callApi("post", "time-slots/add", {
				teacher_id: this.user.id,
				start_time: this.startTime,
				end_time: this.endTime,
				day_id: this.day,
			});
			// console.log(addToDb.data.msg);
			this.i(addToDb.data.msg);
		},
	},
};
</script>

<style>
</style>