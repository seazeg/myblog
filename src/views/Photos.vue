<template>
  <div id="photos" class="photos-box" style="width:100%;">
    <div class="loader" id="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="item" v-for="item in data">
      <!-- <img ref="img" :src="item.src" v-show="item.show" :alt="item.name" @load="imgLoad()"> -->
      <img ref="img" :src="'/'+item.src" v-show="item.show" :alt="item.name" @load="imgLoad()">
    </div>
  </div>
</template>
<script>
  import '../utils/viewer/viewer'
  export default {
    data() {
      return {
        data: [],
        imgLen: 0
      }
    },
    methods: {
      getData() {
        var _this = this
        var params = {
          id: _this.$route.params.id.split("?")[0]
        }
        _this.$axios({
          method: 'get',
          url: _this.servUrl + '/api/getPhotos',
          params
        }).then((res) => {
          _this.data = JSON.parse(res.data.data.src);
        }, (error) => {
          console.log(error);
        });
      },
      imgLoad() {
        var _this = this;
        _this.imgLen++;
        if (_this.imgLen >= _this.$route.params.id.split("?")[1]) {
          var $ = _this.jquery;
          $('#photos').viewer({
            zoomRatio: 0.25,
            interval: 3000,
            minZoomRatio: 0.25,
            maxZoomRatio: 2,
            hide: function () {
              _this.$router.replace({
                path: '/album'
              })
            }
          });
          _this.$refs.img[0].click();
        }
      }
    },
    mounted() {

      this.getData();
      //异步延时
      setTimeout(function () {

      }, 50)
    }
  }
</script>
<style scoped>
  @import '../utils/viewer/viewer.css';
  @import '../assets/css/loader.css';
  #photos {
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

  #photos .item .tit {
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