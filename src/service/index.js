import Vue from 'vue'
import Vuex from 'vuex'
import modules from '../store/'

Vue.use(Vuex)

const store = new Vuex.Store(modules)

const request = {
    requestList: function (params) {
        // Vue.http({
        //     method: 'GET',
        //     url: Vue.prototype.servUrl + '/api/getArticles',
        //     params: params
        // }).then(function (res) {
        //     store.dispatch("setData", res.data)
        // }, function (error) {
        //     console.log(error);
        // });


        Vue.prototype.$axios.get(Vue.prototype.servUrl + '/api/getArticles', {params}).then((res) => {
            store.dispatch("setData", res.data)
        }, (error) => {
            console.log(error);
        });

    }
}

Vue.prototype.request = {
    getArticles: request.requestList
}

export default store