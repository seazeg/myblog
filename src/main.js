import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import './views/layout/index'
import './assets/css/base.css'
import './assets/css/font.css'
import './assets/css/common.css'
import $ from 'jquery'
import axios from 'axios'
import utils from './utils/utils'
import modules from './store/'

Vue.use(Vuex)

const store = new Vuex.Store(modules)



Vue.prototype.jquery = $
Vue.prototype.$http = axios;
Vue.prototype.$utils = utils
Vue.prototype.servUrl = "http://localhost:3000";



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})