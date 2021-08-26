<template>
  <div>
	  <div class="container login-container">
      <h3 class='text-center text-white mx-auto'>Sign in to start chatting with interesting people all over the world!</h3>
            <div class="row">
                <div class="col-md-6 login-form-1">
                    <h3>Sign In</h3>
					<form @submit.prevent='doLogin' action="">
                        <div class="form-group">
                            <input v-model='username' type="text" class="form-control" placeholder="Username" required/>
                        </div>
                        <div class="form-group">
                            <input v-model='password' type="password" class="form-control" placeholder="Password" required/>
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Sign In" />
                        </div>
					</form>
                </div>
                <div class="col-md-6 login-form-2">
                    <div class="login-logo">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                    </div>
                    <h3>Sign Up</h3>
					<form @submit.prevent='doRegister' action="">
                        <div class="form-group">
                            <input v-model='usernameRegis' type="text" class="form-control" placeholder="Username" required />
                        </div>
						<div class="form-group">
                            <input v-model='emailRegis' type="email" class="form-control" placeholder="Email" required/>
                        </div>
                        <div class="form-group">
                            <input v-model='passwordRegis' type="password" class="form-control" placeholder="Password" required />
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit2" value="Sign Up" />
                        </div>
					</form>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
	name:'Login',
	data(){
		return{
			username:'',
			password:'',
			usernameRegis: '',
			emailRegis: '',
			passwordRegis: ''
		}
	},
	methods: {
		...mapActions(['login', 'register']),
		async doLogin(){
			let user ={
				username: this.username,
				password: this.password
			}
			await this.login(user)
			await this.$router.push('/')
			await this.$swal(`Welcome ${this.username} !`)
			this.username =''
			this.password =''
		},
		async doRegister(){
			let user = {
				username: this.usernameRegis,
				password: this.passwordRegis,
				email: this.emailRegis
			}
            console.log('asdasd')
			await this.register(user)
            await this.$swal('Welcome')
            this.usernameRegis = ''
            this.passwordRegis = ''
            this.emailRegis = ''
		}
	},
	computed: {
		...mapState(['isLoggedIn']),
		// ...mapMutations(['LOGIN_TRUE'])

	}

}
</script>

<style scoped>
.login-container{
    margin-top: 5%;
    margin-bottom: 5%;
}
.login-logo{
    position: relative;
    margin-left: -41.5%;
}
.login-logo img{
    position: absolute;
    width: 20%;
    margin-top: 19%;
    background: #282726;
    border-radius: 4.5rem;
    padding: 5%;
}
.login-form-1{
    padding: 9%;
    background:#282726;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-1 h3{
    text-align: center;
    margin-bottom:12%;
    color:#fff;
}
.login-form-2{
    padding: 9%;
    background: #eeebe3;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19);
}
.login-form-2 h3{
    text-align: center;
    margin-bottom:12%;
    color: #282726
}
.btnSubmit{
    font-weight: 600;
    width: 50%;
    color: #282726;
    background-color: #fff;
    border: none;
    border-radius: 1.5rem;
    padding:2%;
}
.btnSubmit2{
    font-weight: 600;
    width: 50%;
    color: #fff;
    background-color: #282726;
    border: none;
    border-radius: 1.5rem;
    padding:2%;
}
</style>