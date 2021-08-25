<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <router-link class="navbar-brand" to='/'>
  <span @click='emptyTopic' >
    <img src="@/assets/logo.png" width="60" height="25" alt="">
    </span> 
    </router-link>
  <div v-if='login===true' id="navbarNav">
    <ul class="navbar-nav">
      <!-- <li class="nav-item active">
        <router-link class="nav-link" to='/'>Home <span class="sr-only">(current)</span></router-link>
      </li> -->
      <li class="nav-item">
        <a @click='showModal' href='#' class="nav-link text-light">Saved</a>
      </li>
       <li class="nav-item">
        <a @click='doLogout' href='#' class="nav-link text-light">Logout</a>
      </li>
      <li class="nav-item">
        <router-link to='/create' class="nav-link text-light">Create Room</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'

export default {
  name:"Navbar",
  data(){
    return{
      login: false
    }
  },
  computed:{
    ...mapState(['isLoggedIn']),
    ...mapMutations(['CHANGE_TOPIC'])
  },
  methods:{
    ...mapActions(['changeTopic','logout']),
    async doLogout(){
      this.logout();
      this.$swal('You have been logged out')
      await this.$router.push('/login')
    },
    showModal(){
			this.$modal.show('bar')
		},
    emptyTopic(){
      console.log(this.topic)
      this.changeTopic('')
      console.log(this.topic)
    },
  },
  computed:{
    ...mapState(['currentPage'])
  },
  created(){
    if(localStorage.getItem('access_token')){
      this.login = true;
    }else{
      this.login = false
    }
  },
}
</script>

<style>

</style>