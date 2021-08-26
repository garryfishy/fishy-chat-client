import Vue from 'vue'
import VueRouter from 'vue-router'
import Video from '../views/Video.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CreateRoom from '../views/CreateRoom.vue'
import Saved from '../views/Saved.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home'
  },
  {
    path: '/create',
    component: CreateRoom,
    name: 'CreateRoom'
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/video',
    component: Video,
    name: 'Video'
  },
  {
    path: '/saved',
    component: Saved,
    name: 'Saved'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) next({ name: 'Login' })
  else next()
})

export default router
