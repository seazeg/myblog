import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/base.css'
import './assets/css/font.css'
import './assets/css/common.css'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
