<template>
	<div>
		<div
			style="
				display: flex;
				justify-content: space-between;
				border-bottom: 2px solid black;
			"
		>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seePendingReq()"
			>
				Pending Requests
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seeStudentList()"
			>
				Student's list
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="seeTeacherList()"
			>
				Teacher's list
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
				v-on:click="addUsers()"
			>
				Add user
			</button>
		</div>
		<div v-if="pendingReq === true">
			<pending-request></pending-request>
		</div>
		<div v-if="studentList === true">
			<student-list></student-list>
		</div>
		<div v-if="teacherList === true">
			<teacher-list></teacher-list>
		</div>
		<div v-if="addUser === true">
			<register></register>
		</div>
	</div>
</template>

<script>
import Register from "./register.vue";
import pendingRequestVue from "./pendingRequest.vue";
import StudentList from "./studentList.vue";
import TeacherList from "./teacherList.vue";
export default {
	components: {
		"pending-request": pendingRequestVue,
		StudentList,
		TeacherList,
		Register,
	},
	data() {
		return {
			pendingReq: false,
			teacherList: false,
			studentList: false,
			addUser: false,
		};
	},
	methods: {
		seePendingReq() {
			this.pendingReq = !this.pendingReq;
			this.teacherList = false;
			this.studentList = false;
			this.addUser = false;
		},
		seeTeacherList() {
			this.pendingReq = false;
			this.teacherList = !this.teacherList;
			this.studentList = false;
			this.addUser = false;
		},
		seeStudentList() {
			this.pendingReq = false;
			this.teacherList = false;
			this.studentList = !this.studentList;
			this.addUser = false;
		},
		addUsers() {
			this.pendingReq = false;
			this.teacherList = false;
			this.studentList = false;
			this.addUser = !this.addUser;
		},
	},
};
</script>

<style>
</style>