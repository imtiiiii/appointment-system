
<template>
    <div>
        <div class="_2menu">
            <div class="_2menu_con">
                <div class="row align-items-center">
                    <div class="col">
                        <router-link to="/">
                            <h3 class="_menu_logo_text" v-if="$config.IS_CONNECTIVER=='yes'">
                                <span class="_menu_logo_symbol">C</span>
                                <span class="_menu_logo_text_main">CONNECTIVER</span>
                            </h3>
                            <div class="_menu_logo" v-else>

                              <div class="_menu_logo_text logo_img">
                                  <!-- <img src="/logo.jpg" alt="" title=""> -->
                              </div>

                            </div>

                        </router-link>
                    </div>

                    <div class="col-auto">
                        <router-link to="/">
                            <button class="_log_btn _2menu_long conn_sign_in" type="button" v-if="$config.IS_CONNECTIVER=='yes'">Login</button>
                            <button class="_log_btn _2menu_long" type="button" v-else>Login</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Banner -->
        <div class="_4banner">
            <div class="_4banner_main">
                 <!-- <h1 class="_4banner_title">Connectiver</h1> -->
                 <h1 class="_4banner_title">Password Reset</h1>
                <!-- <p class="_4banner_text">Creating a conscious and safe community where human<br/> connection and new ideas can thrive</p> -->
            </div>
        </div>
        <!-- Banner -->

        <!-- Form -->
        <div class="_log_form_main" v-if="!isHide">
            <h2 class="_log_form_title">Find Your Account</h2>

            <div class="_log_form">
                 <div class="_log_input_group">
                    <Input class="_log_input" size="large" placeholder="Email address" v-model="email"  type="text"></Input>
                </div>
                
                <div class="_log_button">
                    <Button class="_log_btn _btn_long" :loading="isLoading" :disabled="isLoading" @click="forgotPassword">{{ isLoading ? 'Please wait . . .' : 'Send'}}</Button>
                </div>

                <p class="_log_forget"><router-link to="/">Login</router-link></p>
            </div>
            
        </div>
        <div class="_log_form_main" v-if="isHide2">
            <h2 class="_log_form_title">Check your email for a code</h2>

            <div class="_log_form">
                 <div class="_log_input_group">
                    <Input class="_log_input" size="large" placeholder="Code"  v-model="verify.verificationCode"  type="text">Send</Input>
                </div>
                
                <div class="_log_button">
                    <Button class="_log_btn _btn_long" :loading="isLoading" :disabled="isLoading" @click="verifyCode">{{ isLoading ? 'Please wait . . .' : 'Verify'}}</Button>
                </div>

            </div>
            
        </div>
        <div class="_log_form_main" v-if="isHide3">
            <h2 class="_log_form_title">Reset Your Password</h2>

            <div class="_log_form">
                
                 <div class="_log_input_group">
                    <Input class="_log_input" size="large"  type="password" placeholder="Enter your new password" v-model="reset.password"></Input>
                </div>
                
                 <div class="_log_input_group">
                    <Input class="_log_input" size="large" type="password" placeholder="Confirm your password" v-model="repassword"></Input>
                </div>
                
                <div class="_log_button">
                    <Button class="_log_btn _btn_long" :loading="isLoading" :disabled="isLoading" @click="resetPassword">{{ isLoading ? 'Please wait . . .' : 'Reset Password'}}</Button>
                </div>

            </div>
            
        </div>
        <!-- <div class="_log_form_main">
            <h2 class="_log_form_title">Find Your Account</h2>

            <div class="_log_form">
                <p class="_log_form_text">
                    Please enter the email address you used at signup and we'll send you a password reset email:
                </p>
                 <div class="_log_input_group">
                    <Input class="_log_input" size="large" placeholder="Email address" v-model="user.email"  type="text"></Input>
                </div>
                <div class="_log_input_group">
                    <Input class="_log_input" size="large" placeholder="Password" v-model="user.password"  type="password"></Input>
                </div>
                <div class="_log_button">
                    <Button class="_log_btn _btn_long" :loading="isSiningup" :disabled="isSiningup" @click="login">Send</Button>
                </div>

                <p class="_log_forget"><router-link to="/login">Login</router-link></p>
            </div>
            
        </div> -->
        
    </div>
</template>
<script>
export default {
  middleware:"guest",
  data(){
    return{
        isLoading:false,

        isHide:false,
        isHide2:false,
        isHide3:false,

        email:'',

        userDataError:'',

        verify:{
          verificationCode:''
        },
        verifyError:'',

        reset:{
            password:'',
        },
        repassword:'',
        reseterror:{
            password:'',
            repassword:'',
        },


        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,


    }
  },

  methods:{

    async forgotPassword() {

        this.clearData()
        let flag = 1
        if(!this.email  || this.email.trim()=='' || this.email==null){
            this.i('Email is required!')
            return
        }
        if (this.email && !this.reg.test(this.email)) {
            this.i("Invalid email format!");
            return
        }
        if(flag==0) return
        this.isLoading = true;
        const res = await this.callApi('post','/auth/sendResetToken', {email:this.email})
        if(res.status==200){
            this.isHide = true
            this.isHide2 = true
            this.s("Your email verification code has been sent.")

        }
        
        this.isLoading = false;
    },

    async verifyCode() {
        this.clearData2()

        if(!this.verify.verificationCode  || this.verify.verificationCode.trim()=='' || this.verify.verificationCode==null){
            this.i('Verification code is required!')
            return
        }
        if(this.verify.verificationCode.trim().length < 6){
            this.i('The value must be at least 6 characters long!')
            return
        }

        this.isLoading = true;
        this.verify.email=this.email
        const res = await this.callApi('post','/auth/verifyCode', this.verify)
        if(res.status==200){
            this.s("Verification Successful")
            this.isHide2=false
            this.isHide3=true
            //    window.location = "/resetPassword";
        }
        this.isLoading = false;
    },

    async resetPassword() {

        this.clearData3()
        let flag = 1
        if(!this.reset.password  || this.reset.password.trim()=='' || this.reset.password==null){
            this.i('Password is required!')
            return
        }

        if(this.reset.password.trim().length <6 ){
            this.i('Password must be at least 6 characters long!')
            return
        }

        if(!this.repassword  || this.repassword.trim()=='' || this.repassword==null){
            this.i('Confirm password is required!')
            return
        }
        if (this.repassword && this.reset.password != this.repassword) {
            this.i("Password does not match!");
            return
        }

        if(flag==0) return
        this.isLoading = true;
        let obj =this.reset
         obj.email =this.email
        const res = await this.callApi('post','/auth/passwordReset', obj)
        if(res.status==200){
            this.s("Reset Password Successfull")
            this.clearData4()
               window.location = "/";
        }
        this.isLoading = false;
    },





    clearData() {
        this.userDataError =''
    },

    clearData2() {
        this.verifyError =''
    },
    clearData3() {
        this.reseterror = {
            password:'',
            repassword:'',
        }
    },
    clearData4() {
        this.reset = {
            password:'',
        },
        this.repassword=''
    },


  },


}
</script>