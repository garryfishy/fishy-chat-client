<template>
  <div class="container mt-5">
	  <div class="col-12 col-md-12">
		  <div class="card">
			  <div class="card-header">
				  <h2>Saved Translations</h2>
			  </div>
			  <div class="card-body">
				  <table class="table table-hover" v-if='translations.length > 0'> 
					  <thead>
						  <th></th>
						  <th>Original Text</th>
						  <th>Translated Text</th>
						  <th>Action</th>
					  </thead>
					  <tbody>
						  <tr v-for='(t,i) in translations' :key='t.id'>
							  <td>{{i+1}}</td>
							  <td>{{t.from}}</td>
							  <td>{{t.to}}</td>
							  <td>
								  <button class="btn btn-danger btn-sm" @click.prevent='deleteData(t.id)'>Delete</button>
							  </td>
						  </tr>
					  </tbody>
				  </table>
				  <h3 v-else class='text-center'>No data</h3>
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
import {mapState,mapActions, mapMutations} from 'vuex'
export default {
	name:"Save",
	data(){
		return{
			savedTranslation: []
		}
	},
	// beforeRouteEnter(to, from, next) {
	// 	next(vm => {
	// 		vm.fetchData()
	// 	})

	// },
	created(){
		this.fetchData()
	},
	methods: {
		...mapActions(['getTranslatedLanguage', 'deleteTranslation']),
		fetchData(){
			if(localStorage.getItem('savedTranslation')){
				this.savedTranslation = JSON.parse(localStorage.getItem('savedTranslation'))
			}
		},
		deleteData(id){
			this.$swal({
				title: 'Do you want to delete this data?',
				showDenyButton: true,
				showCancelButton: true,
				confirmButtonText: "Delete",
				denyButtonText: "No"
			})
			.then(response => {
				if(response.isConfirmed){
					// this.savedTranslation = this.savedTranslation.filter(sv => sv.id !== id)
					this.deleteTranslation(id)
					this.fetchTranslations()
					this.$swal({
					icon: 'success',
					title: 'Success',
					text: 'Translation deleted!'
					})
					this.fetchTranslations()
				}
			})
		},
		fetchTranslations(){
			this.getTranslatedLanguage()
		}
	},
	computed: {
		...mapState(['translations'])
	},
	mounted(){
		this.fetchTranslations()
	}
}
</script>

<style>

</style>