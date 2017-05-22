import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import articles from '../views/Articles.vue'
import article from '../views/Article.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
        path: '/',
        name: 'home',
        component: home,
    }, {
        path: '/articles',
        name: 'articles',
        component: articles,
    }, {
        path: '/article/:id',
        name: 'article',
        component: article,
    }, {
        path: '*',
        redirect: '/'
    }]
})