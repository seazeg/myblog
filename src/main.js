import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import VueResource from 'vue-resource'
import './layout/index'
import './assets/css/base.css'
import './assets/css/font.css'
import './assets/fonts/iconfont.css'
import './assets/css/animate.css'
import './assets/css/common.css'
import $ from 'jquery'
import utils from './utils/utils'
import store from './service/'
    
// Vue.use(VueResource);


Vue.prototype.jquery = $
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils
Vue.prototype.servUrl = "http://localhost:3000";



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})