import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import './views/layout/index'
import './assets/css/base.css'
import './assets/css/font.css'
import './assets/fonts/iconfont.css'
import './assets/css/common.css'
import $ from 'jquery'
// import axios from 'axios'
import utils from './utils/utils'
import store from './service/'


Vue.use(VueResource)


Vue.prototype.jquery = $
// Vue.prototype.$http = axios;
Vue.prototype.$utils = utils
Vue.prototype.servUrl = "http://localhost:3000";


Vue.prototype.request.getArticles({
  field: "_id"
});


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})