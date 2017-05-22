<template>
    <div class="header" :class="{'fold':isfold}">
        <div class="logo"><img src="../../assets/images/logo.png" /></div>
        <div class="nav">
            <div class="box">
                <router-link class="animate-link" to="/">Home</router-link>
                <router-link class="animate-link" to="/articles">Articles</router-link>
                <router-link class="animate-link" to="/about">About</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "lay-header",
        props: {
            isfold: Boolean
        }
    }
</script>