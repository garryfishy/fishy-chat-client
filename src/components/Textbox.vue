<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6 ml-4">
        <form>
          <div class="row">
			<div class="col">
              Translate from:
              <select class="form-control" v-model="from" @change="toLanguage">
                <option v-for="l in to_list" :key="l.code" :value='l.code'>
                  {{l.language}}
                </option>
              </select>
            </div>
            <div class="col">
              Translate to:
              <select class="form-control" v-model="to" @change="toLanguage">
                <option v-for="l in to_list" :key="l.code" :value='l.code'>
                  {{l.language}}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col mt-2">
      <div class="col-md-6">
        <div class="card mb-5">
          <div class="card-body">
            <form action="">
              <label for="text">Text: </label>
              <textarea
                v-model="text"
                class="form-control"
                id=""
                cols="30"
                rows="5"
				@keyup='changeText'
              ></textarea>                
			  <button type="button" class="btn btn-primary mt-3" @click.prevent="translate"> Translate</button>
            </form>
          </div>
        </div>
		<template v-if='result && !is_loading'>
            <div class="col mb-5 ">
              <button class="btn btn-sm btn-primary mr-2">
                <i class="clas fas fa-copy">Copy</i>
              </button>
              <button class="btn btn-sm btn-warning" @click.prevent='save'>
                <i class="far fa-star">Save</i>
              </button>
            </div>
		</template>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <form action="">
              <label for="text">Translation: </label>
              <div style="background: rgb(239 239 239); min-height: 135px">
                <p v-if="is_loading" style="padding: 2px 3px">. . .</p>
                <p v-if='is_error' style='padding: 2px 3px'><b>Something went wrong.</b></p>
                <p v-if="!is_loading && !is_error" style="padding: 2px 3px">
                  <b>{{result}}</b>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import list from '../list'
const baseUrl = 'https://amm-api-translate.herokuapp.com'
export default {
	name:"Textbox",
	data(){
		return{
			text:'',
			result:'',
			to: 'id',
			from: 'en',
			to_list: list,
			hasil: '',
			is_loading:false,
			is_error:false,
			cancel_source:null,
			savedTranslation: []
		}
	},
	methods: {
		changeText(){
			if(this.text){
				this.is_loading = true;
				this.is_error = false
				console.log(this.text)
				// this.translate();
			}else{
				this.result= null
			}
		},
		translate(){
			var axios = require("axios").default;
			var options = {
			method: 'GET',
  			url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
  			params: {text: `${this.text}`, to: `${this.to}`, from: `${this.from}`},
  			headers: {
  			  'x-rapidapi-host': 'nlp-translation.p.rapidapi.com',
  			  'x-rapidapi-key': '0a3e779b89msh7744b89298a386dp1f9204jsn60bdd2bc95c3'
 			}
			};
			axios.request(options)
			.then(response => {
				const translated = response.data.translated_text
				// console.log(this.text);
				this.is_error = false;
				this.is_loading = false
				console.log(translated)
				// let lastResult = translated`.${this.to}`
				this.result = translated[this.to]
			})
			.catch(function (error) {
				console.error(error);
			});
		},
		cancelTranslate(){
			if(this.cancel_source){
				this.cancel_source.cancel()
			}
		},
		toLanguage(){
			if(this.text !== null && this.text !== ''){
				this.is_loading = true;
				this.is_error = false
				this.translate()
			}
		},
		save(){
			this.savedTranslation.unshift({
				id: Date.now().toString(),
				origin: `${this.text} (${this.from})`,
				result: `${this.result} (${this.to})`
			});
			localStorage.setItem('savedTranslation', JSON.stringify(this.savedTranslation))
			this.$swal({
				icon: 'success',
				title: 'Success',
				text: 'Translation saved!'
			})

		}
	},
	mounted() {
		if(localStorage.getItem('savedTranslation')){
			this.savedTranslation = JSON.parse(localStorage.getItem('savedTranslation'))
		}
	},
	

}
</script>

<style></style>
