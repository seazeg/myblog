<template>
    <div class="header" :class="{'fold':isfold,'mgr':this.$route.name=='home',hide:this.$route.name=='write'}">
        <div class="logo animated" :class="{'bounce':this.$route.name=='home','flipInX':this.$route.name!='home'}">
            <router-link to="/"><img :src="src" style="max-width:200px"/></router-link>
        </div>
        <div class="nav animated" :class="{'fadeIn':this.$route.name=='home','hide':this.$route.name=='login'}">
            <div class="box">
                <!--<router-link class="animate-link" to="/" :class="{'hover':this.$route.name=='home'}">home</router-link>-->
                <router-link class="animate-link" to="/articles" :class="{'hover':this.$route.name=='articles'||this.$route.name=='article'}">文章</router-link>
                <router-link class="animate-link" to="/archive" :class="{'hover':this.$route.name=='archive'}">归档</router-link>
                <router-link class="animate-link" to="/about" :class="{'hover':this.$route.name=='about'}">关于</router-link>
                <router-link v-if="logind" class="animate-link" to="/write" :class="{'hover':this.$route.name=='write'}">撰写</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "lay-header",
        props: {
            isfold: Boolean
        },
        computed: {
            logind() {
                return this.$store.getters.getLogind
            },
            src() {
                if (window.innerWidth > 600) {
                    return require('../assets/images/logo.png')
                } else {
                    return require('../assets/images/logo@2x.png')
                }
            }
        }
    }
</script>