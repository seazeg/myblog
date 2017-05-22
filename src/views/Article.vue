<template>
    <div class="article-detail">
        <h2>{{data.title}}</h2>
        <h3>{{data.date}}</h3>
        <div class="content" v-html="data.content"></div>
        <div class="page">
            <a class="prev" @click="prev(data._id)"><i class="iconfont icon-shangyiye"></i><span>Prev</span></a>
            <a class="next" @click="next(data._id)"><span>Next</span><i class="iconfont icon-xiayiye"></i></a>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: {},
                pageInfo: [{
                    prev: {},
                    next: {}
                }]
            }
        },
        methods: {
            prev(id) {
                var temp = this.$store.getters.getId;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]._id == id) {
                        this.pageInfo.prev = temp[i - 1] || {}
                    }
                }
                if (!!this.pageInfo.prev._id) {
                    this.$router.push({
                        name: 'article',
                        params: {
                            id: this.pageInfo.prev._id
                        }
                    })
                    this.jquery("html,body").animate({
                        scrollTop: 150
                    }, 300);
                }

            },
            next(id) {
                var temp = this.$store.getters.getId;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]._id == id) {
                        this.pageInfo.next = temp[i + 1] || ""
                    }
                }
                if (!!this.pageInfo.next._id) {
                    this.$router.push({
                        name: 'article',
                        params: {
                            id: this.pageInfo.next._id
                        }
                    })
                    this.jquery("html,body").animate({
                        scrollTop: 150
                    }, 300);
                }
            },
            getData() {
                var params = {
                    id: this.$route.params.id
                }
                this.$http({
                    method: 'GET',
                    url: this.servUrl + '/api/getArticle',
                    params: params
                }).then(function (res) {
                    res.data.date = this.$utils.formatDate(res.data.date)
                    this.data = res.data;
                }, function (error) {
                    console.log(error);
                });
            }
        },
        watch: {
            $route() {
                this.getData();
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>