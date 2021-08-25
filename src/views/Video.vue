<template>
  <div class="container">
    <!-- <Textbox /> -->
	<!-- <Video/> -->
	<div id="video">
		<h1 class='text-center text-light'>You are in {{roomName}} room!</h1>
		<h5 class='text-center text-light'>Please be nice to one another!</h5>
	<div class="row h-100">
   <div id='my-video' style="width: 5rem; height:35rem" class="col-sm-12 mx-auto">
   </div>
</div>
  </div>
	
  </div>
</template>

<script>

import Textbox from '../components/Textbox.vue'
import Translate from '../components/Translate.vue'
import DailyIframe from '@daily-co/daily-js';
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
	name:"Video",
	data(){
		return{
			pages:''
		}
	},
	components: {
		Textbox,
		Translate,
	},
	computed:{
		...mapState(['url','rooms','roomName'])
	}
	,
	methods:{
		 openForm() {
 		 document.getElementById("myForm").style.display = "block";
		},
		closeForm() {
		 document.getElementById("myForm").style.display = "none";
		},
	},
	mounted(){
		let kanan = document.getElementById('my-video')
		console.log(kanan)
		let callFrame = DailyIframe.createFrame(kanan,{
 		showFullscreenButton: true})
        callFrame.join({ url: `${this.url}` });
		console.log(this.url, '<<ini di video')
	},
}
</script>

<style scoped>
</style>
