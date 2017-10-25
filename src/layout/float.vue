<template>
    <div class="float animated">
        <div class="top" @click="top()" :class="{'hide':this.$route.name=='home'||this.$route.name=='write'||this.$route.name=='login'||this.$route.name=='album'||this.$route.name=='upload'}">
            <i class="iconfont icon-tophover"></i>
        </div>
        <router-link to='/' class="home" :class="{'hide':this.$route.name!='write'&&this.$route.name!='album'&&this.$route.name!='upload'}"
            title="back home">
            <i class="iconfont icon-fanhuishouye"></i>
        </router-link>
    </div>
</template>
<script>
    export default {
        name: "lay-float",
        methods: {
            top() {
                var $this = this
                $this.jquery("html,body").animate({
                    scrollTop: 0
                }, 300);
            }
        }
    }
</script>