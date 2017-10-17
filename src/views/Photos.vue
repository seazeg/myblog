<template>
  <div>
    <div id="viewlist" style="width:100%">
      <img src="../assets/images/pho/1.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/2.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/3.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/4.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/5.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/6.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/7.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/8.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/9.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
      <img src="../assets/images/pho/10.jpg" data-url="../assets/images/pho/1.jpg" alt="Picture">
    </div>
  </div>
</template>
<script>
  import '../../node_modules/imageviewer/dist/viewer.min.js'
  import '../../node_modules/imageviewer/dist/viewer.min.css'
  export default {
    methods: {

    },
    mounted() {
      this.jquery('#viewlist').viewer({
        show: function () {
          var docElm = document.documentElement;
          //W3C  
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
          }
          //FireFox  
          else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
          }
          //Chrome等  
          else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
          }
          //IE11
          else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          }
        }
      });
    }
  }
</script>
<style scoped>
  #viewlist img {
    width: 200px;
    margin-right: 10px;
    display: inline-block;
  }
</style>