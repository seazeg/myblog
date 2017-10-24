<template>
    <div class="album-box">
        <div class="grid">
            <figure class="effect-bubba" v-for="item in data">
                <img :src="item.albumPic" alt="img22">
                <figcaption>
                    <h2>{{item.title}}
                        <span>{{item.subTitle}}</span>
                    </h2>
                    <p>{{item.desc}}</p>
                    <a class="animate-link" @click="open(item._id)"></a>
                </figcaption>
            </figure>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: []
            }
        },
        methods: {
            open(id) {
                this.$router.push({
                    name: 'photos',
                    params: {
                        id: id
                    }
                });
            }
        },
        mounted() {
            var _this = this;
            _this.$axios({
                method: "get",
                url: _this.servUrl + '/api/getAlbum',
            }).then((res) => {
                _this.data = res.data.data
            }, (error) => {
                console.log(error);
            });
        }
    }
</script>
<style scoped>
    @import '../assets/css/set.css';
    .album-box {
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

    .album-box h2,
    .album-box p {
        color: #fff;
    }

    .album-box h2 {
        font-size: 24px;
        font-weight: bolder;
    }

    .album-box span {
        font-size: 12px;
        font-style: initial;
        letter-spacing: 4px;
        display: block;
        font-weight: normal;
        margin-top: 2px;
    }

    .album-box .tit {
        margin: 0 auto;
        margin-top: 20px;
        text-align: center;
    }


    .album-box .tit img {
        width: 200px;
    }
</style>