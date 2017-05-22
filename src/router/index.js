import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/Home.vue'
import articles from '../views/Articles.vue'
import article from '../views/Article.vue'
import archive from '../views/Archive.vue'
import about from '../views/About.vue'

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
        path: '/archive',
        name: 'archive',
        component: archive,
    }, {
        path: '/about',
        name: 'about',
        component: about,
    }, {
        path: '*',
        redirect: '/'
    }]
})


