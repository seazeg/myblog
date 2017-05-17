import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import article from '../views/Article.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: home,
    }, {
        path: '/article',
        name: 'article',
        component: article
    }, {
        path: '*',
        redirect: '/'
    }]
})