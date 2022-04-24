<template>
	<div>
		<div
			v-for="(request, index) of requests"
			:key="index"
			style="margin: 30px 20px"
		>
			<div style="background-color: #9cb0ba; padding: 10px 20px">
				<h4>
					name: {{ request.first_name + " " + request.last_name }}
				</h4>
				<hr />
				<h4>email:{{ request.email }}</h4>
				<hr />
				<h4>identity:{{ request.user_type }}</h4>
				<hr />
				<h4 v-if="request.user_type === 'student'">
					Student id: {{ request.student_id }}
				</h4>

				<div style="margin: 30px 0px">
					<button
						v-on:click.once="accept(request.id)"
						class="accept"
						style="
							background-color: #42cc8c;
							width: 100px;
							padding: 15px 0px;
						"
					>
						Accept
					</button>
					<button
						v-on:click.once="reject(request.id)"
						class="reject"
						style="
							background-color: #ff531d;
							width: 100px;
							padding: 15px 0px;
						"
					>
						Reject
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
			requests: null,
		};
	},
	async created() {
		const res = await this.callApi("get", "dashboard/request");
		if (res.status === 200) {
			this.requests = res.data;
		}
		console.log("requests=>", this.requests);
	},
	methods: {
		async accept(id) {
			const accept = await this.callApi(
				"put",
				"dashboard/update/status",
				{
					id: id,
					status: "1",
				}
			);
		},
		async reject(id) {
			const reject = await this.callApi(
				"put",
				"dashboard/update/status",
				{
					id: id,
					status: "2",
				}
			);
		},
	},
};
</script>

<style scoped>
a.accept {
	display: inline-block;
	padding: 0.46em 1.6em;
	border: 0.1em solid #000000;
	margin: 0 0.2em 0.2em 0;
	border-radius: 0.12em;
	box-sizing: border-box;
	text-decoration: none;
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	color: #000000;
	text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
	background-color: #ffffff;
	text-align: center;
	transition: all 0.15s;
}
a.accept:hover {
	text-shadow: 0 0 2em rgba(255, 255, 255, 1);
	color: #ffffff;
	border-color: #ffffff;
}
a.reject {
	display: inline;
	padding: 0.46em 1.6em;
	border: 0.1em solid #000000;
	margin: 0 0.2em 0.2em 0;
	border-radius: 0.12em;
	box-sizing: border-box;
	text-decoration: none;
	font-family: "Roboto", sans-serif;
	font-weight: 300;
	color: #000000;
	text-shadow: 0 0.04em 0.04em rgba(0, 0, 0, 0.35);
	background-color: #ffffff;
	text-align: center;
	transition: all 0.15s;
}
a.reject:hover {
	text-shadow: 0 0 2em rgba(255, 255, 255, 1);
	color: #ffffff;
	border-color: #ffffff;
}
</style>