<template>
  <div class="footer" :class="{'hide':this.$route.name=='home'||this.$route.name=='write'||this.$route.name=='album'}">©2017. Evan.G</div>
</template>
<script>
  export default {
    name: "lay-footer"
  }
</script>