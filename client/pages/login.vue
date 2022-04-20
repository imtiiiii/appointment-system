<template>
    <div>
        <div class="_2menu">
            <div class="_2menu_con">
                <div class="row align-items-center">
                    <div class="col">
                        <router-link to="/">
                            <h3 class="_menu_logo_text">
                                <span class="_menu_logo_symbol">C</span>
                                <span class="_menu_logo_text_main">CONNECTIVER</span>
                            </h3>
                        </router-link>
                    </div>

                    <div class="col-auto">
                        <router-link to="/register">
                            <button class="_log_btn _2menu_long" type="button">Sign Up</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Banner -->
        <div class="_4banner">
            <div class="_4banner_main">
                <h1 class="_4banner_title">Connectiver</h1>
                <p class="_4banner_text">Creating a conscious and safe community where human<br/> connection and new ideas can thrive</p>
            </div>
        </div>
        <!-- Banner -->

        <!-- Form -->
        <div class="_log_form_main">
            <h2 class="_log_form_title">Login</h2>

            <div class="_log_form">
                <div class="_log_input_group">
                    <Input v-model="form.email" placeholder="Email address" size="large" type="text"></Input>
                </div>
                
                <div class="_log_input_group">
                    <Input v-model="form.password" placeholder="Password" size="large" type="password" password></Input>
                </div>
                
                <div class="_log_button">
                    <Button @click.native="login" :loading="isLoading" :disabled="isLoading" type="success" size="large" long>{{isLoading?'Please wait...':'Login'}}</Button>
                </div>

                <p class="_log_forget"><nuxt-link to="/forgot_password">Forgot password?</nuxt-link></p>
            </div>
        </div>
        <!-- Form -->
    </div>
</template>

<script>
export default {
    middleware:'guest',
    data(){
       return{
          form : {
              email : '',
              password : '',

          },
          isLoading : false
       }
    },
    methods : {
       async login(){
          if(this.form.email == '') return this.i("Email is requied")
          if(this.form.password == '') return this.i("Password is requied")
          this.form.email = this.form.email.toLowerCase()
          this.isLoading = true
          const res = await this.callApi('post', '/auth/login', this.form)
          if(res.status==200){
            window.location = '/'
          }
          this.isLoading = false
       }
    }
}
</script>