import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './views/layout/index'
import './assets/css/base.css'
import './assets/css/font.css'
import './assets/css/common.css'
import $ from 'jquery'

Vue.prototype.jquery = $


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})