<template>
	<div>
		<div>
			<button
				style="marging: 50px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="chooseOption()"
			>
				{{
					options === "appoinment"
						? "Create Slot"
						: "Appoinments Request"
				}}
			</button>
		</div>
		<!-- ***********CREATED SLOT ********* -->
		<div class="main-content" v-if="options === 'index'">
			<div style="background-color: #ffffff">
				<created-slot></created-slot>
			</div>
			<!-- *********ADD TIME SLOT ********** -->
			<div style="background-color: #ffffff">
				<div class="add-time-slot">
					<h2 class="_log_form_title">Add available time slots</h2>
					<div class="_log_form">
						<div class="_log_input_group">
							<Select
								placeholder="Select Day"
								size="large"
								v-model="day"
							>
								<Option value="1">monday</Option>
								<Option value="2">tueday</Option>
								<Option value="3">wednesday</Option>
								<Option value="4">thursday</Option>
								<Option value="5">friday</Option>
								<Option value="6">satarday</Option>
								<Option value="7">sunday</Option>
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
						<div
							class="_log_button"
							v-if="day && startTime && endTime"
						>
							<Button
								@click="addSlot"
								:loading="isLoading"
								:disabled="loading"
								type="success"
								size="large"
								long
								>{{
									isLoading ? "Please wait..." : "Add"
								}}</Button
							>
						</div>
					</div>
				</div>
			</div>
			<!-- ********* AVAILABLE SLOTS ************ -->
			<div style="background-color: #ffffff">
				<available-slot></available-slot>
			</div>
		</div>

		<!-- If app user click appoinment request -->
		<div style="display: flex" v-if="options === 'appoinment'">
			<uppcomming-appoinments />
		</div>
	</div>
</template>

<script>
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import "vue2-timepicker/dist/VueTimepicker.css";
import createdSlot from "./createdSlots.vue";
import availableSlots from "./availableSlots.vue";
import upcommingAppoinments from "./upcommingAppoinments.vue";
import moment from "moment";

export default {
	components: {
		"vue-timepicker": VueTimepicker,
		"created-slot": createdSlot,
		"available-slot": availableSlots,
		"uppcomming-appoinments": upcommingAppoinments,
	},
	data() {
		return {
			day: "",
			startTime: "",
			endTime: "",
			user: null,
			options: "index", // possible variable appoinment,index
		};
	},
	created() {
		this.user = this.$store.state.authUser;
		// console.log(this.user);
	},
	methods: {
		async addSlot() {
			this.isLoading = true;
			// console.log(this.day);
			const startTime = moment(this.startTime, "HH:mm");
			const endTime = moment(this.endTime, "HH:mm");
			if (endTime.diff(startTime).valueOf() > 0) {
				const addToDb = await this.callApi("post", "time-slots/add", {
					teacher_id: this.user.id,
					start_time: this.startTime,
					end_time: this.endTime,
					day_id: this.day,
				});

				// console.log(addToDb.data.msg);
				this.i(addToDb.data.msg);
			} else {
				this.e("Start Time and End time input is not valid");
			}
			this.isLoading = false;
		},
		chooseOption(value) {
			if (this.options === "index") {
				this.options = "appoinment";
			} else {
				this.options = "index";
			}
		},
	},
};
</script>

<style>
.main-content {
	height: 100%;
	display: grid;
	grid-template: 100% /1.3fr 1fr 1fr;
	gap: 30px;
	padding: 50px 0px;
}
.add-time-slot {
	background-color: #fff;
	padding: 30px 10px;
}
</style>