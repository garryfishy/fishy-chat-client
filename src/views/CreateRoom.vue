<template>
  <div class="container mt-5">
    <div class="card bg-secondary">
      <div class="card-header">
        <h3>Create your own chat room!</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent='newRoom' action="">
          <div class="form-group row">
            <label
              for="colFormLabelSm"
              class="col-sm-2 col-form-label col-form-label-sm"
              >Name</label
            >
            <div class="col-sm-10">
              <input
			  	v-model='name'
                type="text"
                class="form-control form-control-sm"
                id="colFormLabelSm"
                placeholder="New room name"
              />
            </div>
          </div>
		  <div class="form-group row">
            <label
              for="colFormLabelSm"
              class="col-sm-2 col-form-label col-form-label-sm"
              >Description</label
            >
            <div class="col-sm-10">
              <input
			  v-model='description'
                type="text"
                class="form-control form-control-sm"
                id="colFormLabelSm"
                placeholder="Describe your room!"
              />
            </div>
          </div>
		  <div class="form-group row">
            <label
              for="colFormLabelSm"
              class="col-sm-2 col-form-label col-form-label-sm"
              >Image</label
            >
            <div class="col-sm-10">
              <input
			  @change="imgFiles"
                type="file"
                id="colFormLabelSm"
                placeholder="col-form-label-sm"
              />
            </div>
          </div>
		  <button class='btn btn-light'>Submit</button>		  
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex'

export default {
	name:'Create-Room',
	data(){
		return{
			name:'',
			description:'',
			imgUrl: ''
		}
	},
	methods: {
		...mapActions(['changeTopic', 'addRoom']),
		async newRoom(){
		let form = new FormData();
		form.append("name", this.name)
		form.append("description",this.description)
		form.append("image", this.imgUrl)
		let result = this.addRoom(form)
		try {
			if(result){
				// this.$swal('Room successfully created!')
				// this.$router.push('/')
			}else{
				console.log(error)
			}
		} catch (error) {
			console.log(error)
		}
		},
		imgFiles(event) {
			this.imgUrl = event.target.files[0]
		},
	}

}
</script>

<style></style>
