<template>
  <div id="app" >
    <modal name="bar" styles='background: none' :adaptive="true">
      <Saved />
    </modal>
    <navbar v-if='isLoggedIn'>
    </navbar>
    <keep-alive>
      <div class="min-vh-100">
      <router-view/>
      </div>
    </keep-alive>
    <Translate v-if='isLoggedIn'>
    </Translate>
    <Hfooter/>
  </div>
<!-- import createPersistedState from "vuex-persistedstate";
    plugins: [createPersistedState()], -->

</template>

<script>
import Saved from './views/Saved.vue'
import navbar from './components/Navbar.vue'
import Translate from './components/Translate.vue'
import Hfooter from 'vue-hacktiv8-footer'

import {mapState,mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name:"App",
  data(){
    return{
      pages:'',
      loginState: false
    }
  },
  components: {
    navbar,
    Hfooter,
    Translate,
    Saved
  },
  computed:{
    ...mapState(['currentPage', 'isLoggedIn']),
  },
  methods:{
    ...mapActions(['changePage']),
    ...mapMutations(['CHANGE_CURRENT_PAGE','LOGIN_TRUE']),
    pageChange(page){
      this.changePage(page)
      // this.$store.dispatch('changePage', page)
      this.pages=this.currentPage
    },
  },
  created(){
    this.loginState = this.isLoggedIn
    this.pageChange(this.$route.path)
	}
}
</script>

<style scoped>
#app{
  min-height: screen
}
</style>
