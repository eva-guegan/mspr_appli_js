import Vue from 'vue'
import App from './components/App.vue'
import './registerServiceWorker'
import router from './router'
import AuthWrapper from "./components/AuthWrapper";

// BootstrapVue
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// Axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios)

//QRCodeReader
import VueQrcodeReader from 'vue-qrcode-reader'
Vue.use(VueQrcodeReader)

Vue.config.productionTip = false

new Vue({
  router,
  data() {
    return {
      baseApi: 'http://localhost:8083/',
      idUser: '',
    }
  },
  render: h => h(AuthWrapper)
}).$mount('#app')
