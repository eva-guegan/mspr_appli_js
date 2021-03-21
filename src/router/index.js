import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Promotions from '../views/Liste_promotions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/liste_promotions',
    name: 'Promotions',
    component: Promotions
  }
]

const router = new VueRouter({
  routes
})

export default router
