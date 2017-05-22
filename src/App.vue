<template>
  <div class="main">
    <lay-header :isfold="isfold"></lay-header>
    <router-view></router-view>
    <lay-footer></lay-footer>
    <lay-float></lay-float>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {
        scrollTop: "",
        isfold: false
      }
    },
    methods: {
      scroll() {
        this.scrollTop = document.body.scrollTop;
        if (this.scrollTop > 55) {
          this.isfold = true;
        }else{
          this.isfold = false;
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scroll)
    }
  }
</script>