import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VeeValidate from 'vee-validate';
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


Vue.use(VeeValidate);


Vue.prototype.jquery = $
Vue.prototype.$axios = axios
Vue.prototype.$utils = utils
Vue.prototype.servUrl = "http://localhost:3000";
// Vue.prototype.servUrl = "";

//权限限制
axios({
  method: "get",
  url: "http://localhost:3000/api/g"
}).then((res) => {
  store.dispatch('setLogind', res.data.logind);
}, (error) => {
  console.log(error);
});


//响应拦截器
axios.interceptors.response.use(function (response) {
  //对响应数据做些事
  return response;
}, function (error) {
  //请求错误时做些事
  return Promise.reject(error);
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})