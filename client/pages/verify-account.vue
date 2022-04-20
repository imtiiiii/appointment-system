
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
                 <h1 class="_4banner_title">Verify Account</h1>
            </div>
        </div>
        <!-- Banner -->

        <!-- Form -->

        <div class="_log_form_main" >
            <h2 class="_log_form_title">Please enter verification code to verify account</h2>

            <div class="_log_form">
                 <div class="_log_input_group">
                    <Input class="_log_input" size="large" placeholder="Verification code"  v-model="verify.verificationCode"  type="text">Send</Input>
                </div>
                
                <div class="_log_button">
                    <Button class="_log_btn _btn_long" :loading="isLoading" :disabled="isLoading" @click="verifyCode">{{ isLoading ? 'Please wait . . .' : 'Verify'}}</Button>
                </div>

            </div>
            
        </div>
        
    </div>
</template>
<script>
export default {
  middleware:"guest",
  data(){
    return{
        isLoading:false,

        email: this.$route.query.email,
        verify:{
          verificationCode:''
        },
        
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,

    }
  },

  methods:{

    async verifyCode() {
        // this.clearData()

        if(!this.verify.verificationCode  || this.verify.verificationCode.trim()=='' || this.verify.verificationCode==null){
            this.i('Verification code is required!')
            return
        }
        if(this.verify.verificationCode.trim().length < 6){
            this.i('The value must be at least 6 characters long!')
            return
        }
        
         if (!this.email) {
            this.i("Invalid email format!");
            return
        }
        
         if (this.email && !this.reg.test(this.email)) {
            this.i("Invalid email format!");
            return
        }

        this.isLoading = true;
        this.verify.email=this.email
        const res = await this.callApi('post','/auth/verifyEmail', this.verify)
        if(res.status==200){
            this.s("Account verification Successful!")
            window.location ='/'
        }
        this.isLoading = false;
    },

    // clearData() {
    //     this.verifyError =''
    // },


  },
  
  created(){
    if(!this.$route.query || !this.$route.query.email){
          window.location = '/'
      }
  }


}
</script>