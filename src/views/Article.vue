<template>
    <div class="article-detail">
        <h2 class="title">{{data.title}}</h2>
        <h3 class="date">{{data.createDate}}<span class="separate" :class="{'hide':!data.category}">|</span>{{data.category}}
            <eye v-if="isEdit"><span class="separate" :class="{'hide':!data.category}">|</span><i class="iconfont icon-yanjing" style="font-size:22px;vertical-align: middle;"></i>{{data.views || 0}}</eye>
            <a class="edit" @click="edit" title="Edit Article" v-if="isEdit"><i class="iconfont icon-bianji"></i></a>
        </h3>
        <article class="content" v-html="data.content"></article>
        <div class="page">
            <a class="prev" @click="prev(data._id)"><i class="iconfont icon-shangyiye"></i><span>NEWER</span></a>
            <a class="next" @click="next(data._id)"><span>OLDER</span><i class="iconfont icon-xiayiye"></i></a>
        </div>
    </div>
</template>
<script>
    import marked from 'marked';
    import highlight from 'highlight.js';
    import 'highlight.js/styles/monokai-sublime.css'
    import '../assets/css/article.css'
    export default {
        data() {
            return {
                data: "",
                isEdit: false,
                compiledMarkdown: "",
                pageInfo: {
                    prev: {},
                    next: {}
                }
            }
        },
        components: {
            marked,
            highlight
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
                    if (window.innerWidth >= 769) {
                        this.jquery("html,body").animate({
                            scrollTop: 150
                        }, 300);
                    } else {
                        this.jquery("html,body").animate({
                            scrollTop: 100
                        }, 300);
                    }
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
                    if (window.innerWidth >= 769) {
                        this.jquery("html,body").animate({
                            scrollTop: 150
                        }, 300);
                    } else {
                        this.jquery("html,body").animate({
                            scrollTop: 100
                        }, 300);
                    }
                }
            },
            edit() {
                this.$router.replace({
                    name: 'write',
                    query: {
                        id: this.$route.params.id
                    }
                })
            },
            getData() {
                var $this = this
                var params = {
                    id: $this.$route.params.id
                }
                $this.$axios({
                    method: 'get',
                    url: $this.servUrl + '/api/getArticle',
                    params
                }).then((res) => {
                    res.data.data.createDate = $this.$utils.formatDate(res.data.data.createDate);
                    res.data.data.content = marked(res.data.data.content, {
                        renderer: new marked.Renderer(),
                        gfm: true,
                        tables: true,
                        breaks: false,
                        pedantic: false,
                        sanitize: false,
                        smartLists: true,
                        smartypants: false,
                        highlight: function (code) {
                            return highlight.highlightAuto(code).value;
                        }
                    })
                    this.data = res.data.data;
                    this.isEdit = res.data.logind;
                    $this.saveViews(res.data.data.views)
                }, (error) => {
                    console.log(error);
                });
            },
            saveViews(views) {
                var $this = this;
                var params = {
                    id: $this.$route.params.id,
                    views: views || 0
                }
                $this.$axios({
                    method: 'post',
                    url: $this.servUrl + '/api/saveViews',
                    params
                }).then((res) => {
                    console.log(res);
                }, (error) => {
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
            // if (this.$store.getters.getListData.length == "undefined" || !this.$store.getters.getListData.length) {
            this.request.getArticles({
                field: "article"
            });
            // }
            if (window.innerWidth >= 769) {
                this.jquery("html,body").animate({
                    scrollTop: 150
                }, 300);
            } else {
                this.jquery("html,body").animate({
                    scrollTop: 100
                }, 300);
            }

            this.getData();
        }
    }
</script>