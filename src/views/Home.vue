<template>
  <div class='container'>
    <h1 class="text-center text-light">Welcome to Fishy Chat!</h1>
    <h5 class="text-center text-light">Choose a topic that meets your interest!</h5>
	<div class="row ml-5 mt-5">
	<div v-for='r in rooms' :key='r.id' class="card text-white bg-dark mt-5 mx-auto" style="width: 18rem">
      <img class="card-img-top" :src="r.imgUrl" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title text-center">{{r.name}}</h5>
        <p class="card-text">{{r.description}}</p>
        <a @click='toVideo(r.url, r.name)' href="#" class="btn btn-primary mt-auto text-center ">Enter Chat</a>
      </div>
	</div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex'
// import Saved from './Saved.vue'

export default {
	name:'Home',
	
	components:{
		// Saved
	},
	computed:{
		...mapState(['topic','isLoggedIn', 'rooms']),
		...mapMutations(['LOGIN_TRUE']),
			isLoggedIn() {
     	 return this.$store.getters.isLoggedIn
    }
	},
	methods:{
		...mapActions(['changeUrl', 'addRoom', 'getRoomData', 'changeRoomName']),
		toVideo(url, name){
			console.log(url)
			this.changeUrl(url)
			this.changeRoomName(name)
			console.log(url)
			this.$router.push('/video')
		},
		fetchData(){
			console.log('test')
			this.getRoomData()
			console.log('ada')
			
		},		
	},
	created(){
		this.fetchData()
	},
	mounted(){
		this.fetchData()
	}

}
</script>

<style scoped>
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
}

</style>
