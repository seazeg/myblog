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
      <img ref="img" :src="item.src" v-show="item.show" :alt="item.name" @load="imgLoad()">
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




  .loader {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: 175px;
    height: 100px;
  }

  .loader span {
    display: block;
    background: #ccc;
    width: 7px;
    height: 10%;
    border-radius: 14px;
    margin-right: 5px;
    float: left;
    margin-top: 25%;
  }

  .loader span:last-child {
    margin-right: 0px;
  }

  .loader span:nth-child(1) {
    animation: load 2.5s 1.4s infinite linear;
  }

  .loader span:nth-child(2) {
    animation: load 2.5s 1.2s infinite linear;
  }

  .loader span:nth-child(3) {
    animation: load 2.5s 1s infinite linear;
  }

  .loader span:nth-child(4) {
    animation: load 2.5s 0.8s infinite linear;
  }

  .loader span:nth-child(5) {
    animation: load 2.5s 0.6s infinite linear;
  }

  .loader span:nth-child(6) {
    animation: load 2.5s 0.4s infinite linear;
  }

  .loader span:nth-child(7) {
    animation: load 2.5s 0.2s infinite linear;
  }

  .loader span:nth-child(8) {
    animation: load 2.5s 0s infinite linear;
  }

  .loader span:nth-child(9) {
    animation: load 2.5s 0.2s infinite linear;
  }

  .loader span:nth-child(10) {
    animation: load 2.5s 0.4s infinite linear;
  }

  .loader span:nth-child(11) {
    animation: load 2.5s 0.6s infinite linear;
  }

  .loader span:nth-child(12) {
    animation: load 2.5s 0.8s infinite linear;
  }

  .loader span:nth-child(13) {
    animation: load 2.5s 1s infinite linear;
  }

  .loader span:nth-child(14) {
    animation: load 2.5s 1.2s infinite linear;
  }

  .loader span:nth-child(15) {
    animation: load 2.5s 1.4s infinite linear;
  }

  @keyframes load {
    0% {
      background: #ccc;
      margin-top: 25%;
      height: 10%;
    }
    50% {
      background: #444;
      height: 100%;
      margin-top: 0%;
    }
    100% {
      background: #ccc;
      height: 10%;
      margin-top: 25%;
    }
  }
</style>