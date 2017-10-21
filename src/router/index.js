import Vue from 'vue'
import VueRouter from 'vue-router'
import Nanobar from 'nanobar'
// import login from '../views/Login.vue'
// import home from '../views/Home.vue'
// import articles from '../views/Articles.vue'
// import article from '../views/Article.vue'
// import archive from '../views/Archive.vue'
// import about from '../views/About.vue'
// import write from '../views/Write.vue'

//路由懒加载
const login = resolve => require(['../views/Login.vue'], resolve);
const home = resolve => require(['../views/Home.vue'], resolve);
const articles = resolve => require(['../views/Articles.vue'], resolve);
const article = resolve => require(['../views/Article.vue'], resolve);
const archive = resolve => require(['../views/Archive.vue'], resolve);
const about = resolve => require(['../views/About.vue'], resolve);
const write = resolve => require(['../views/Write.vue'], resolve);
const tags = resolve => require(['../views/Tags.vue'], resolve);
const album = resolve => require(['../views/Album.vue'], resolve);
const photos = resolve => require(['../views/Photos.vue'], resolve);

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
        path: '/login',
        name: 'login',
        component: login,
    }, {
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
        path: '/tags',
        name: 'tags',
        component: tags,
    }, {
        path: '/album',
        name: 'album',
        component: album,
    },{
        path: '/photos',
        name: 'photos',
        component: photos,
    }, {
        path: '*',
        redirect: '/'
    }]
})



const nanobar = new Nanobar({
    classname: 'loading'
});

router.beforeEach((to, from, next) => {
    nanobar.go(30)
    next();
})
router.afterEach(() => {
    nanobar.go(100)
})


export default router