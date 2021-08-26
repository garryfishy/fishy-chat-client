<template>
  <div>
    <button class="open-button" @click="openForm">Translate</button>

    <div class="chat-popup" id="myForm">
	  <template v-if='result && !is_loading'>
              <button class="btn btn-sm btn-warning" @click.prevent='save'>
                <i class="far fa-star"></i>
              </button>
		</template>
      <div>
        <form action="#" class="form-container">
      <button
        @click="closeForm"
        type="button"
        class="btn-muted collapsible"
		style='border-radius: 10px; background: red;height: 30px '
      >
        x
      </button>
          Translate from:
          <select class="form-control" v-model="from" @change="toLanguage">
            <option v-for="l in to_list" :key="l.code" :value="l.code">
              {{l.language}}
            </option>
          </select>
          <textarea
            v-model="text"
            class="form-control"
            id=""
            cols="30"
            rows="2"
            @keyup="changeText"
          ></textarea>

          <form action="">
            Translate to:
            <select class="form-control" v-model="to" @change="toLanguage">
              <option v-for="l in to_list" :key="l.code" :value="l.code">
                {{l.language}}
              </option>
            </select>
            <div style="background: rgb(239 239 239); min-height: 100px">
              <p v-if="is_loading" style="padding: 2px 3px">. . .</p>
              <p v-if="is_error" style="padding: 2px 3px">
                <b>Something went wrong.</b>
              </p>
              <p v-if="!is_loading && !is_error" style="padding: 2px 3px">
                <b>{{result}}</b>
              </p>
            </div>
            <button @click.prevent="translate" type="submit" class="btn mt-3">
              Translate for me
            </button>
          </form>
          <template v-if="result && !is_loading"> </template>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import list from '../list'
import {mapState,mapActions, mapMutations} from 'vuex'

export default {
	name:"TranslateBox",
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
			// savedTranslation: []
		}
	},
	methods:{
		...mapActions(['postLanguage']),
		 openForm() {
 		 document.getElementById("myForm").style.display = "block";
		},
		 closeForm() {
		 document.getElementById("myForm").style.display = "none";
		 this.text = ''
		 this.result =''
		},
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
			// this.savedTranslation.unshift({
			// 	id: Date.now().toString(),
			// 	origin: `${this.text} (${this.from})`,
			// 	result: `${this.result} (${this.to})`
			// });
			// localStorage.setItem('savedTranslation', JSON.stringify(this.savedTranslation))
			let result = {
				from: `${this.text},(${this.from})`,
				to:`${this.result},(${this.to})`
			}
			// console.log(result)
			this.postLanguage(result)
			// console.log('masuk sini juga')
			this.$swal({
				icon: 'success',
				title: 'Success',
				text: 'Translation saved!'
			})
			this.text =''
			this.result =''
		},
	},
		mounted() {
		if(localStorage.getItem('savedTranslation')){
			this.savedTranslation = JSON.parse(localStorage.getItem('savedTranslation'))
		}
	}
}
</script>

<style>
.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  position: fixed;
  bottom: 23px;
  left: 28px;
  width: 280px;
}

/* The popup chat - hidden by default */
.chat-popup {
  display: none;
  position: fixed;
  bottom: 0;
  left: 15px;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: grey;
}

/* Full-width textarea */
.form-container textarea {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
  resize: none;
  min-height: 100px;
}

/* When the textarea gets focus, do something */
.form-container textarea:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/send button */
.form-container .btn {
  background-color: darkgray;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover,
.open-button:hover {
  opacity: 1;
}
</style>
