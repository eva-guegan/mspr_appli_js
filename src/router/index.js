import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Promotions from '../views/Liste_promotions.vue'
import QRCodeReader from '../views/QRCodeReader.vue'

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
  },
  {
    path: '/qrcode_reader',
    name: 'QRCodeReader',
    component: QRCodeReader
  },
]

const router = new VueRouter({
  routes
})

export default router
