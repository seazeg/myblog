<template>
  <div class="main" v-if="">
    <lay-header :isfold="isfold"></lay-header>
    <transition name="component-fade" mode="out-in">
      <router-view></router-view>
    </transition>
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
    computed: {
      mainLoading(){
        return 
      }
    },
    methods: {
      scroll() {
        this.scrollTop = document.body.scrollTop;
        if (this.scrollTop > 55) {
          this.isfold = true;
        } else {
          this.isfold = false;
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scroll)
    }
  }
</script>