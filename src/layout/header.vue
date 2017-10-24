<template>
    <div class="header" :class="{'fold':isfold,'mgr':this.$route.name=='home',hide:this.$route.name=='write'||this.$route.name=='album'||this.$route.name=='photos'||this.$route.name=='upload'}">
        <div class="logo animated" :class="{'bounce':this.$route.name=='home','flipInX':this.$route.name!='home'}">
            <router-link to="/">
                <img :src="src" style="max-width:200px" />
            </router-link>
        </div>
        <div class="nav animated" :class="{'fadeIn':this.$route.name=='home','hide':this.$route.name=='login'}">
            <div class="box">
                <!--<router-link class="animate-link" to="/" :class="{'hover':this.$route.name=='home'}">home</router-link>-->
                <router-link class="animate-link" to="/articles" :class="{'hover':this.$route.name=='articles'||this.$route.name=='article'}">文章</router-link>
                <router-link class="animate-link" to="/archive" :class="{'hover':this.$route.name=='archive'}">归档</router-link>
                <router-link class="animate-link" to="/tags" :class="{'hover':this.$route.name=='tags'}">标签</router-link>
                <router-link class="animate-link" to="/about" :class="{'hover':this.$route.name=='about'}">关于</router-link>
                <router-link class="animate-link" to="/album" :class="{'hover':this.$route.name=='album'}">摄影</router-link>
                <router-link v-if="logind" class="animate-link" to="/write" :class="{'hover':this.$route.name=='write'}">撰写</router-link>
                <router-link v-if="logind" class="animate-link" to="/upload" :class="{'hover':this.$route.name=='upload'}">上传</router-link>
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
                if (this.$route.name == 'album') {
                    if (window.innerWidth > 600) {
                        return require('../assets/images/logo_w.png')
                    } else {
                        return require('../assets/images/logo_w@2x.png')
                    }

                } else {
                    if (window.innerWidth > 600) {
                        return require('../assets/images/logo.png')
                    } else {
                        return require('../assets/images/logo@2x.png')
                    }
                }
            }
        }
    }
</script>