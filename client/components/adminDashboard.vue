<template>
	<div>
		<div
			style="
				display: flex;
				justify-content: space-between;
				padding: 20px 50px;
			"
		>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				Pending Requests
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				Student's list
			</button>
			<button
				style="marging: 30px 20px"
				class="_log_btn _2menu_long"
				type="button"
			>
				Teacher's list
			</button>
		</div>
		<pending-request></pending-request>
	</div>
</template>

<script>
import pendingRequestVue from "./pendingRequest.vue";
export default {
	components: {
		"pending-request": pendingRequestVue,
	},
};
</script>

<style>
</style>