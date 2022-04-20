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
                        <router-link to="/login">
                            <button class="_log_btn _2menu_long" type="button">Login</button>
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
            <h2 class="_log_form_title">Sign Up</h2>

            <div class="_log_form">
                <div class="_log_input_group">
                    <Input v-model="form.first_name" placeholder="First name" size="large" type="text"></Input>
                </div>
                <div class="_log_input_group">
                    <Input v-model="form.last_name" placeholder="Last name" size="large" type="text"></Input>
                </div>
                <div class="_log_input_group">
                    <Input v-model="form.email" placeholder="Email address" size="large" type="text"></Input>
                </div>
                <div class="_log_input_group">
                    <Input v-model="form.password" placeholder="Password" size="large" type="password" password></Input>
                </div>
                <div class="_log_input_group">
                    <Input v-model="form.password_confirmation" placeholder="Confirm password" size="large" type="password" password></Input>
                </div>
                <div class="_log_input_group">
                    <Select placeholder="Please select your gender" size="large" v-model="form.gender">
                        <Option value="Female">Female</Option>
                        <Option value="Male">Male</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </div>

                <div class="_log_input_group">
                    <Checkbox v-model="form.agree" size="small" border> I agree with the <a href="">Terms</a> & <a href="">Privacy</a></Checkbox>                   
                </div>
                <div class="_log_button">
                    <Button @click.native="register" :loading="isLoading" :disabled="isLoading" type="success" size="large" long>{{isLoading?'Please wait...':'Sign Up'}}</Button>
                </div>
            </div>
        </div>
        <!-- Form -->
    </div>
</template>
<script>
export default {
    midleware:'guest',
    data(){
        return{
            form:{
                first_name:'',
                last_name:'',
                email:'',
                password:'',
                gender:'',
                password_confirmation:'',
                agree:true,
            },
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            isLoading: false,
        }
    },
    methods:{
        
        async register(){
            if(!this.form.agree) return this.i('Please accept our temrs and privacy policy')
            if(this.form.first_name == '') return this.i("Firstname is requied")
            if(this.form.last_name == '') return this.i("Lastname is requied")
            if(this.form.email == '') return this.i("Email is requied")
            if (this.form.email && !this.reg.test(this.form.email)) return this.i('Invalid email format!')
            if(this.form.password == '') return this.i("Password is requied")
            if(this.form.password.trim().length < 6) return this.i("Password must be at least 6 charecters long.")
            if(this.form.password != this.form.password_confirmation) return this.i("Password and confirm password doesn't match")
            if(this.form.gender == '') return this.i('Gender is required')
            this.form.email = this.form.email.toLowerCase()
            this.isLoading =true
            const res = await this.callApi('post','/auth/register', this.form)
            if(res.status == 200 ){
                this.s(res.data.msg)
                window.location.href = `/verify-account?email=${this.form.email}`;
                this.clearData()
            }
            this.isLoading =false
        },
        
        clearData(){
            this.form={
                first_name:'',
                last_name:'',
                email:'',
                password:'',
                gender:'',
                password_confirmation:'',
                agree:true,
            }
        }
        
        
        
    }
}
</script>