<template>
    <div class="float">
        <div class="top" @click="top()"></div>
    </div>
</template>
<script>
    export default {
        name: "lay-float",
        methods: {
            top() {
                this.jquery("html,body").animate({
                    scrollTop: 0
                }, 300);
            }
        }
    }
</script>