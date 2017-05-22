<template>
    <div class="article-detail">
        <h2>{{data.title}}</h2>
        <h3>{{data.date}}</h3>
        <div v-html="data.content"></div>
        <div style="position:fixed;bottom:20px;cursor:pointer" @click="prev(data._id)">上一篇</div>
        <div style="position:fixed;bottom:20px;right:610px;cursor:pointer" @click="next(data._id)">下一篇</div>
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
        computed: {

        },
        methods: {
            prev(id) {
                var temp = this.$store.getters.getId;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]._id == id) {
                        this.pageInfo.prev = temp[i - 1] || {}
                    }
                }
                console.log("上一页:", this.pageInfo.prev);
                if (!!this.pageInfo.prev._id) {
                    this.$router.push({
                        name: 'article',
                        params: {
                            id: this.pageInfo.prev._id
                        }
                    })
                }

            },
            next(id) {
                var temp = this.$store.getters.getId;
                for (var i = 0; i < temp.length; i++) {
                    if (temp[i]._id == id) {
                        this.pageInfo.next = temp[i + 1] || ""
                    }
                }
                console.log("下一页:", this.pageInfo.next);
                if (!!this.pageInfo.next._id) {
                    this.$router.push({
                        name: 'article',
                        params: {
                            id: this.pageInfo.next._id
                        }
                    })
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