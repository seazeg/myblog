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
const upload = resolve => require(['../views/Upload.vue'], resolve);

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
        path: '/login',
        name: 'login',
        meta: {
            requireAuth: false
        },
        component: login,
    }, {
        path: '/',
        name: 'home',
        meta: {
            requireAuth: false
        },
        component: home,
    }, {
        path: '/articles',
        name: 'articles',
        meta: {
            requireAuth: false
        },
        component: articles,
    }, {
        path: '/article/:id',
        name: 'article',
        meta: {
            requireAuth: false
        },
        component: article,
    }, {
        path: '/archive',
        name: 'archive',
        meta: {
            requireAuth: false
        },
        component: archive,
    }, {
        path: '/write',
        name: 'write',
        meta: {
            requireAuth: true
        },
        component: write,
    }, {
        path: '/about',
        name: 'about',
        meta: {
            requireAuth: false
        },
        component: about,
    }, {
        path: '/tags',
        name: 'tags',
        meta: {
            requireAuth: false
        },
        component: tags,
    }, {
        path: '/album',
        name: 'album',
        meta: {
            requireAuth: false
        },
        component: album,
    }, {
        path: '/photos/:id',
        name: 'photos',
        meta: {
            requireAuth: false
        },
        component: photos,
    }, {
        path: '/upload',
        name: 'upload',
        meta: {
            requireAuth: true
        },
        component: upload,
    }, {
        path: '*',
        meta: {
            requireAuth: false
        },
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