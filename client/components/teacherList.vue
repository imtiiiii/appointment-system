<template>
	<div>
		<div
			v-for="(teacher, index) of teachers"
			:key="index"
			style="margin: 30px 20px"
		>
			<div style="background-color: #9cb0ba; padding: 10px 20px">
				<h4>
					name: {{ teacher.first_name + " " + teacher.last_name }}
				</h4>
				<hr />
				<h4>email:{{ teacher.email }}</h4>
				<hr />
				<h4>identity:{{ teacher.user_type }}</h4>
				<hr />

				<div style="margin: 30px 0px">
					<button
						v-on:click.once="update(teacher.id)"
						class="update"
						style="
							background-color: #42cc8c;
							width: 100px;
							padding: 15px 0px;
						"
					>
						Update
					</button>
					<button
						v-on:click.once="erase(teacher.id)"
						class="reject"
						style="
							background-color: #ff531d;
							width: 100px;
							padding: 15px 0px;
						"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			teachers: null,
		};
	},
	async created() {
		const teachers = await this.callApi("get", "/dashboard/teacher-list/");
		if (teachers.status === 200) {
			this.teachers = teachers.data;
			console.log(this.teachers);
		}
	},
	methods: {
		erase(id) {
			console.log("erase id", id);
		},
		update(id) {
			console.log("update id", id);
		},
	},
};
</script>

<style>
</style>