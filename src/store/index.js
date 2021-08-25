import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert'
import createPersistedState from "vuex-persistedstate";
const baseUrl= 'https://fishy-chat.herokuapp.com'
Vue.use(Vuex) 

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        isLoggedIn: false,
        roomName: '',
        currentPage: '',
        url: '',
        rooms: [],
        topic: '',
        translations: []
    },
    getters: {
        isLoggedIn: state => {
          return state.isLoggedIn;
        }
      },
    mutations: {
        CHANGE_CURRENT_PAGE(state, payload) {
            state.currentPage = payload
        },
        CHANGE_URL(state, payload) {
            state.url = payload;
        },
        LOGIN_TRUE(state, _){
            state.isLoggedIn = true;
        },
        LOGGEDIN_FALSE(state, _){
            state.isLoggedIn = false;
        },
        GET_ROOM(state,payload){
            state.rooms = payload
        },
        CHANGE_ROOM_NAME(state,payload){
            state.roomName = payload
        },
        GET_TRANSLATION(state,payload){
            state.translations = payload
        }
    },
    actions: {
        changePage(context, payload) {
            // console.log(payload)
            context.commit('CHANGE_CURRENT_PAGE', payload)
        },
        changeUrl(context, payload) {
            context.commit('CHANGE_URL', payload)
        },
        changeRoomName(context, payload) {
            context.commit('CHANGE_ROOM_NAME', payload)
        }
        ,
        async login(context, payload) {
            let result = await axios({
                method:'POST',
                data: payload,
                url: `${baseUrl}/login`
            })
            try {
                if(result){
                    context.commit('LOGIN_TRUE')
                    localStorage.setItem('access_token', result.data.access_token)
                }else{
                    $swal('Username not found')
                }
            } catch (error) {
                $swal('Username not found')
            }
        },
        async register(_, payload){
            let result = await axios({
                method: 'POST',
                data:payload,
                url:`${baseUrl}/register`
            })
            try {
                if (!result){
                    swal('An error occurred while registering')
                }else{
                    // console.log(result)
                }
            } catch (error) {
                swal('An error occurred while registering')
                console.log(error)
            }
        },
        logout(context) {
            localStorage.removeItem('access_token')
            context.commit('LOGGEDIN_FALSE')
        },
        addRoom(_, payload){
            axios({
                method: 'POST',
                data: payload,
                url: `${baseUrl}/videoRoom`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                console.log(response)
                router.push('/')
                swal('Room successfully created!')
            })
            .catch(err => {
                console.log(err)
            })
        },
        getRoomData(context,_) {
            axios({
                method: "GET",
                url: `${baseUrl}/getrooms`,
                header: {access_token: localStorage.access_token}
            })
            .then(response => {
                context.commit('GET_ROOM', response.data)
            })
            .catch(err => {
                console.log(err)
            })
        },
        getTranslatedLanguage(context){
            axios({
                method: 'GET',
                url : `${baseUrl}/translated/:id`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                context.commit('GET_TRANSLATION', response.data)
            })
            .catch(err => {
                context.commit('GET_TRANSLATION', {})
                console.log(err)
            })
        },
        postLanguage(_,payload) {
            axios({
                method: 'POST',
                data: payload,
                url: `${baseUrl}/translated`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteTranslation(_, id){
            axios({
                method: "DELETE",
                url: `${baseUrl}/translated/${id}`,
                headers: {access_token: localStorage.access_token}
            })
            .then(response =>{
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    modules: {},
    getters: {
        getPage : state => state.currentPage
    }
})