<template>
    <div class="float animated" :class="{'hide':this.$route.name=='home'}">
        <div class="top" @click="top()"></div>
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