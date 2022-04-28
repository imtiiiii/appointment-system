<template>
	<div>
		<div></div>
		<!-- ALL BUTTONS -->
		<div>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seeHistory"
			>
				History
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seeUpcomingMeeting()"
			>
				Upcoming appointments
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seeTeachers"
			>
				Teacher list
			</button>
			<!-- <button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				Search
			</button> -->
		</div>
		<div v-if="showTeacherList">
			<teacher-list></teacher-list>
		</div>
		<div v-if="showHistory">
			<students-appointment v-bind:type="type"></students-appointment>
		</div>
		<div v-if="showUpcomingMeeting">
			<students-appointment v-bind:type="type"></students-appointment>
		</div>
	</div>
</template>

<script>
import teacherList from "../adminDashboard/teacherList.vue";

import moment from "moment";
import StudentsAppointment from "./studentsAppointment.vue";
moment().format();
export default {
	components: { teacherList, StudentsAppointment },
	data() {
		return {
			showTeacherList: false,
			showHistory: false,
			showUpcomingMeeting: false,
			type: "",
		};
	},
	methods: {
		seeTeachers() {
			this.showTeacherList = !this.showTeacherList;

			this.showHistory = false;
			this.showUpcomingMeeting = false;
		},
		seeHistory() {
			this.showHistory = !this.showHistory;
			this.showUpcomingMeeting = false;
			this.showTeacherList = false;
			this.type = "history";
		},
		seeUpcomingMeeting() {
			this.showUpcomingMeeting = !this.showUpcomingMeeting;
			this.showTeacherList = false;
			this.showHistory = false;
			this.type = "upcoming";
		},
	},
};
</script>

<style>
</style>