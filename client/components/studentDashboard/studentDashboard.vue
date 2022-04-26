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
			>
				History
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				Upcoming appointments
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
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
		<div>
			<teacher-list></teacher-list>
		</div>
	</div>
</template>

<script>
import teacherList from "../adminDashboard/teacherList.vue";
export default {
	components: { teacherList },
};
</script>

<style>
</style>