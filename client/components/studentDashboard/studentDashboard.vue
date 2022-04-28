<template>
	<div>
		<div>
			<h3>Welcome to student's dashboard</h3>
		</div>
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
	</div>
</template>

<script>
import teacherList from "../adminDashboard/teacherList.vue";
export default {
	components: { teacherList },
	data() {
		return {
			showTeacherList: false,
			showHistory: false,
			showUpcomingMeeting: false,
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
		},
		seeUpcomingMeeting() {
			this.showUpcomingMeeting = !this.showUpcomingMeeting;
			this.showTeacherList = false;
			this.showHistory = false;
		},
	},
};
</script>

<style>
</style>