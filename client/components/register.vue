<template>
	<div>
		<!-- Form -->
		<div class="_log_form_main" style="margin-top: 150px">
			<h2 class="_log_form_title">Sign Up</h2>

			<div class="_log_form">
				<!-- ********** FIRST NAME ***************** -->
				<div class="_log_input_group">
					<Input
						v-model="form.firstName"
						placeholder="First name"
						size="large"
						type="text"
					></Input>
				</div>
				<!-- ********* LAST NAME ********** -->
				<div class="_log_input_group">
					<Input
						v-model="form.lastName"
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
						v-model="form.userType"
					>
						<Option value="teacher">teacher</Option>
						<Option value="student">student</Option>
						<Option v-if="user" value="admin">admin</Option>
					</Select>
				</div>
				<!-- **********STUDENT ID ************ -->
				<div
					class="_log_input_group"
					v-if="form.userType === 'student'"
				>
					<Input
						placeholder="STUDENT ID"
						size="large"
						type="text"
						v-model="form.studentId"
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
	data() {
		return {
			user: null,
			form: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				password_confirmation: "",
				userType: "",
				studentId: null,
				dept: null,
			},
			reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
			isLoading: false,
		};
	},
	methods: {
		async register() {
			// ************FRONT END VALIDATION**************

			this.form.email = this.form.email.toLowerCase();
			if (this.form.firstName == "") {
				return this.i("Firstname is requied");
			}
			if (this.form.lastName == "") return this.i("Lastname is requied");
			// console.log(this.form.user_type);
			if (this.form.email == "") return this.i("Email is requied");
			if (this.form.email && !this.reg.test(this.form.email))
				return this.e("Invalid email format!");
			if (this.form.password == "") return this.i("Password is requied");
			if (this.form.password.trim().length < 6) {
				return this.e("Password must be at least 6 charecters long.");
			}
			if (this.form.password != this.form.password_confirmation)
				return this.e("Password and confirm password doesn't match");
			if (this.form.userType === "") {
				return this.i("Please choose your identity");
			}
			// if (this.form.dept === "" || this.form.dept === null) {
			// 	return this.i("Please choose your Depertment");
			// }
			if (
				(this.form.userType === "student" &&
					this.form.studentId === null) ||
				this.form.studentId === ""
			) {
				return this.e("Provide your student ID");
			}
			// *******  IF VALIDATION PASSES **********
			// ********** COVERING CORNER CASES*********
			if (this.form.userType === "teacher") this.form.studentId = null;
			if (this.form.dept === "") this.form.dept = null;
			this.isLoading = true;
			// regReq means registration request
			// const regReq = await this.callApi(
			// 	"post",
			// 	"http://localhost:3333/auth/register",
			// 	this.form
			// );
			// this.isLoading = false;
			// if (regReq.status === 200) {
			// 	this.clearData();
			// 	return this.s("Your registration requested submitted");
			// } else {
			// 	return this.e("something went wrong please try again");
			// }
			// // console.log(this.form);
			try {
				const regReq = await this.$axios.$post("http://localhost:3333/auth/register",this.form);
				this.isLoading = false;
				this.i('Registration is successfully done.')
				this.i('Account will be active after admin approval')
			} catch (error) {
				const err = error.response.data.message;
				Object.keys(err).forEach((value)=>{
					this.e(err[value][0].message);
					
				});
				this.isLoading = false;
			}
			
		},

		clearData() {
			this.form = {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				password_confirmation: "",
				userType: "",
				studentId: null,
				dept: null,
			};
		},
	},
	created() {
		this.user = this.$store.state.authUser;
	},
};
</script>

<style>
</style>