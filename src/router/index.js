import Vue from 'vue'
import VueRouter from 'vue-router'
import Nanobar from 'nanobar'
import home from '../views/Home.vue'
import articles from '../views/Articles.vue'
import article from '../views/Article.vue'
import archive from '../views/Archive.vue'
import about from '../views/About.vue'
import write from '../views/Write.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode:"history",
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
        path: '/write',
        name: 'write',
        component: write,
    }, {
        path: '/about',
        name: 'about',
        component: about,
    }, {
        path: '*',
        redirect: '/'
    }]
})



const nanobar = new Nanobar({
    classname:'loading'
});

router.beforeEach((to, from, next) => {
    nanobar.go(30)
    next();
})
router.afterEach(() => {
    nanobar.go(100)
})


export default router