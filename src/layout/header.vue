<template>
    <div class="header" :class="{'fold':isfold,'mgr':this.$route.name=='home',hide:this.$route.name=='write'}">
        <div class="logo animated" :class="{'bounce':this.$route.name=='home','flipInX':this.$route.name!='home'}">
            <router-link to="/"><img src="../assets/images/logo.png" /></router-link>
        </div>
        <div class="nav animated" :class="{'fadeIn':this.$route.name=='home'}">
            <div class="box">
                <!--<router-link class="animate-link" to="/" :class="{'hover':this.$route.name=='home'}">home</router-link>-->
                <router-link class="animate-link" to="/articles" :class="{'hover':this.$route.name=='articles'||this.$route.name=='article'}">articles</router-link>
                <router-link class="animate-link" to="/archive" :class="{'hover':this.$route.name=='archive'}">archive</router-link>
                <router-link class="animate-link" to="/about" :class="{'hover':this.$route.name=='about'}">about</router-link>
                 <router-link v-if="logind" class="animate-link" to="/write" :class="{'hover':this.$route.name=='write'}">write</router-link>
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
            logind(){
                return this.$store.getters.getLogind
            }
        }
    }
</script>