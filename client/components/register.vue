<template>
	<div>
		<!-- Form -->
		<div class="_log_form_main">
			<h2 class="_log_form_title">Sign Up</h2>

			<div class="_log_form">
				<!-- ********** FIRST NAME ***************** -->
				<div class="_log_input_group">
					<Input
						v-model="form.first_name"
						placeholder="First name"
						size="large"
						type="text"
					></Input>
				</div>
				<!-- ********* LAST NAME ********** -->
				<div class="_log_input_group">
					<Input
						v-model="form.last_name"
						placeholder="Last name"
						size="large"
						type="text"
					></Input>
				</div>
				<!-- ********* EMAIL ADDRESS *********** -->
				<div class="_log_input_group">
					<Input
						v-model="form.email"
						placeholder="Email address"
						size="large"
						type="text"
					></Input>
				</div>
				<!-- *********** PASSWORD ************* -->
				<div class="_log_input_group">
					<Input
						v-model="form.password"
						placeholder="Password"
						size="large"
						type="password"
					></Input>
				</div>
				<!-- ********CONFIRM PASSWORD******* -->
				<div class="_log_input_group">
					<Input
						v-model="form.password_confirmation"
						placeholder="Confirm password"
						size="large"
						type="password"
					></Input>
				</div>
				<!-- USER_TYPE SELECT -->
				<div class="_log_input_group">
					<Select
						placeholder="Your identity"
						size="large"
						v-model="form.user_type"
					>
						<Option value="teacher">teacher</Option>
						<Option value="student">student</Option>
						<Option v-if="form.email" value="admin">admin</Option>
					</Select>
				</div>
				<!-- **********STUDENT ID ************ -->
				<div
					class="_log_input_group"
					v-if="form.user_type === 'student'"
				>
					<Input
						placeholder="STUDENT ID"
						size="large"
						type="text"
						v-model="form.student_id"
					></Input>
				</div>
				<!-- *******DEPT.********* -->
				<div class="_log_input_group">
					<Input
						placeholder="your depertment"
						size="large"
						type="text"
						v-model="form.dept"
					></Input>
				</div>
				<!-- ******** COURSE ************** -->
				<div
					class="_log_input_group"
					v-if="form.user_type === 'teacher'"
				>
					<Input
						placeholder="COURSE"
						size="large"
						type="text"
						v-model="form.course"
					></Input>
				</div>

				<!-- ********* GENDER SELECT *********** -->
				<!-- <div class="_log_input_group">
					<Select
						placeholder="Please select your gender"
						size="large"
						v-model="form.gender"
					>
						<Option value="Female">Female</Option>
						<Option value="Male">Male</Option>
						<Option value="Other">Other</Option>
					</Select>
				</div> -->
				<!-- ******** TERMS AND CONDITION ******** -->
				<!-- <div class="_log_input_group">
					<Checkbox v-model="form.agree" size="small" border>
						I agree with the <a href="">Terms</a> &
						<a href="">Privacy</a></Checkbox
					>
				</div> -->
				<div class="_log_button">
					<Button
						@click.native="register"
						:loading="isLoading"
						:disabled="isLoading"
						type="success"
						size="large"
						long
						>{{ isLoading ? "Please wait..." : "Sign Up" }}</Button
					>
				</div>
			</div>
		</div>
		<!-- Form -->
	</div>
</template>

<script>
export default {
	midleware: "guest",
	data() {
		return {
			form: {
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				password_confirmation: "",
				user_type: "",
				student_id: null,
				dept: null,
				course: null,
			},
			reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
			isLoading: false,
		};
	},
	methods: {
		async register() {
			// ************FRONT END VALIDATION**************
			this.form.email = this.form.email.toLowerCase();
			if (this.form.first_name == "")
				return this.i("Firstname is requied");
			if (this.form.last_name == "") return this.i("Lastname is requied");
			// console.log(this.form.user_type);
			if (this.form.email == "") return this.i("Email is requied");
			if (this.form.email && !this.reg.test(this.form.email))
				return this.i("Invalid email format!");
			if (this.form.password == "") return this.i("Password is requied");
			if (this.form.password.trim().length < 6) {
				return this.e("Password must be at least 6 charecters long.");
			}
			if (this.form.password != this.form.password_confirmation)
				return this.e("Password and confirm password doesn't match");
			if (this.form.user_type === "") {
				return this.i("Please choose your identity");
			}
			if (this.form.dept === null) {
				return this.i("Please choose your Depertment");
			}
			if (
				this.form.user_type === "teacher" &&
				this.form.course === null
			) {
				return this.e("Kindly add your course name");
			}
			if (
				this.form.user_type === "student" &&
				this.form.student_id === null
			) {
				return this.e("Provide your student ID");
			}
			// ******* IF VALIDATION PASSES , DATA WILL GO TO SERVER**********
			return this.clearData();
		},

		clearData() {
			this.form = {
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				password_confirmation: "",
				user_type: "",
				student_id: null,
				dept: null,
				course: null,
			};
		},
	},
};
</script>

<style>
</style>