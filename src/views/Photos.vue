<template>
  <div id="viewlist" class="flex-images" style="width:100%;">
    <div class="item" :data-w="item.w" :data-h="item.h" v-for="item in d">
      <!-- <span class="tit" v-show="item.show">{{item.name}}</span> -->
      <img ref="img" :src="item.src" :alt="item.name" v-show="item.show">
    </div>
  </div>
</template>
<script>
  import '../utils/viewer/viewer'
  // import '../utils/flewImages/jquery.flex-images.min.js'
  export default {
    data() {
      return {
        d: [{
          name: "图1",
          src: "../src/assets/images/pho/1.jpg",
          w: "600",
          h: "400",
          show: false
        }, {
          name: "图2",
          src: "../src/assets/images/pho/2.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图3",
          src: "../src/assets/images/pho/3.jpg",
          w: "700",
          h: "300",
          show: false
        }, {
          name: "图4",
          src: "../src/assets/images/pho/4.jpg",
          w: "200",
          h: "100",
          show: false
        }, {
          name: "图5",
          src: "../src/assets/images/pho/5.jpg",
          w: "400",
          h: "300",
          show: false
        }, {
          name: "图6",
          src: "../src/assets/images/pho/6.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图7",
          src: "../src/assets/images/pho/7.jpg",
          w: "600",
          h: "300",
          show: false
        }, {
          name: "图8",
          src: "../src/assets/images/pho/8.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图1",
          src: "../src/assets/images/pho/1.jpg",
          w: "600",
          h: "300",
          show: false
        }, {
          name: "图2",
          src: "../src/assets/images/pho/2.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图3",
          src: "../src/assets/images/pho/3.jpg",
          w: "700",
          h: "300",
          show: false
        }, {
          name: "图4",
          src: "../src/assets/images/pho/4.jpg",
          w: "200",
          h: "100",
          show: false
        }, {
          name: "图5",
          src: "../src/assets/images/pho/5.jpg",
          w: "400",
          h: "300",
          show: false
        }, {
          name: "图6",
          src: "../src/assets/images/pho/6.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图7",
          src: "../src/assets/images/pho/7.jpg",
          w: "600",
          h: "300",
          show: false
        }, {
          name: "图8",
          src: "../src/assets/images/pho/8.jpg",
          w: "900",
          h: "300",
          show: false
        }, {
          name: "图1",
          src: "../src/assets/images/pho/1.jpg",
          w: "600",
          h: "300",
          show: false
        }, {
          name: "图2",
          src: "../src/assets/images/pho/2.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图3",
          src: "../src/assets/images/pho/3.jpg",
          w: "700",
          h: "300",
          show: false
        }, {
          name: "图1",
          src: "../src/assets/images/pho/1.jpg",
          w: "600",
          h: "300",
          show: false
        }, {
          name: "图2",
          src: "../src/assets/images/pho/2.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图3",
          src: "../src/assets/images/pho/3.jpg",
          w: "700",
          h: "300",
          show: false
        }, {
          name: "图4",
          src: "../src/assets/images/pho/4.jpg",
          w: "200",
          h: "100",
          show: false
        }, {
          name: "图5",
          src: "../src/assets/images/pho/5.jpg",
          w: "400",
          h: "300",
          show: false
        }, {
          name: "图6",
          src: "../src/assets/images/pho/6.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图7",
          src: "../src/assets/images/pho/7.jpg",
          w: "600",
          h: "300",
          show: false
        }, {
          name: "图8",
          src: "../src/assets/images/pho/8.jpg",
          w: "700",
          h: "300",
          show: false
        }, {
          name: "图4",
          src: "../src/assets/images/pho/4.jpg",
          w: "200",
          h: "100",
          show: false
        }, {
          name: "图5",
          src: "../src/assets/images/pho/5.jpg",
          w: "400",
          h: "300",
          show: false
        }, {
          name: "图6",
          src: "../src/assets/images/pho/6.jpg",
          w: "500",
          h: "300",
          show: false
        }, {
          name: "图7",
          src: "../src/assets/images/pho/7.jpg",
          w: "600",
          h: "300",
          show: false
        }, {
          name: "图8",
          src: "../src/assets/images/pho/8.jpg",
          w: "700",
          h: "300",
          show: false
        }]
      }
    },
    methods: {
      // imgMenter(o) {
      //   o.show = false
      // },
      // imgMleave(o) {
      //   o.show = false
      // }
    },
    mounted() {
      var _this = this;
      var $ = _this.jquery;
      $('#viewlist').viewer({
        zoomRatio: 0.5,
        hide: function () {
          _this.$router.replace({
            path: '/album'
          })
        }
      });

      _this.$refs.img[0].click();

      // setTimeout(function () {
      //   $('#viewlist').flexImages({
      //     rowHeight: 300
      //   });

      // }, 150);
    }



  }
</script>
<style scoped>
  @import '../utils/viewer/viewer.css';
  /* @import '../utils/flewImages/jquery.flex-images.css'; */

  #viewlist {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background: #2f3238;
  }
  /* #viewlist .item img {
    opacity: 0.5;
  } */
  /* #viewlist .item img:hover {
    opacity: 1;
    cursor: url('../assets/images/zoom_w.ico'), auto;

  }*/

  #viewlist .item .tit {
    position: absolute;
    color: #fff;
    bottom: 0;
    background: #000;
    width: 100%;
    opacity: 0.8;
    font-size: 14px;
    padding: 5px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    z-index: 10;
  }
</style>