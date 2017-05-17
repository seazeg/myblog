import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/bootstrap.min.css'
import './assets/css/cover.css'

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
