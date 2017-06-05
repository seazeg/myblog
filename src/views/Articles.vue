<template>
    <div class="article-list" v-if="mobile">
        <ul>
            <li v-for="item in listInfo">
                <h3>{{item.createDate}}</h3>
                <h2><a @click="open(item._id)">{{item.title}}</a></h2>
            </li>
        </ul>
        <div class="loading"><img v-if="loadText" src="../assets/images/loading.gif" width=60 /></div>
    </div>
    <div class="article-list" v-else>
        <ul>
            <li v-for="item in listInfo">
                <h3>{{item.createDate}}</h3>
                <h2><a @click="open(item._id)">{{item.title}}</a></h2>
            </li>
        </ul>
        <lay-pager :page-info="pageInfo" :fn="this.request.getArticles"></lay-pager>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                allLoaded: false,
                distance: 100,
                loadText: false
            }
        },
        computed: {
            listInfo: function () {
                return this.$store.getters.getListData
            },
            pageInfo: function () {
                return this.$store.getters.getPageInfo
            },
            mobile: function () {
                return window.innerWidth < 769
            }
        },
        methods: {
            open(id) {
                this.$router.push({
                    name: 'article',
                    params: {
                        id: id
                    }
                });
            },
            scroll() {
                var $this = this;
                var scrollTop = this.jquery(window).scrollTop();　　
                var scrollHeight = this.jquery(document).height();　　
                var windowHeight = this.jquery(window).height();　　
                var cur = $this.$store.getters.getPageInfo.curPage,
                    pcount = $this.$store.getters.getPageInfo.pageCount
                if (cur + 1 <= pcount) {
                    if (scrollTop + windowHeight == scrollHeight) {　
                        $this.loadText = true;
                        setTimeout(function () {
                            var params = {
                                curPage: cur + 1,
                                pageSize: 10
                            }
                            $this.$axios({
                                method: "get",
                                url: $this.servUrl + "/api/getArticles",
                                params
                            }).then((res) => {
                                $this.$store.dispatch("setMobData", res.data);
                                $this.loadText = false;
                            }, (error) => {
                                console.log(error);
                            });　　　

                        }, 1500);
                    }
                }

            }
        },
        mounted() {
            var params = {
                curPage: 1,
                pageSize: 10
            }
            this.request.getArticles(params);
            window.addEventListener('scroll', this.scroll)
        }
    }
</script>