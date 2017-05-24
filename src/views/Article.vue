<template>
    <div class="article-detail">
        <h2 class="title">{{data.title}}</h2>
        <h3 class="date">{{data.createDate}}<span class="separate">|</span>{{data.category}} <a class="edit" @click="edit" title="Edit Article"><i class="iconfont icon-bianji"></i></a></h3>
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
    import '../assets/css/highlight-theme/monokai-sublime.css'
    import '../assets/css/article.css'
    export default {
        data() {
            return {
                data: "",
                compiledMarkdown: "",
                pageInfo: [{
                    prev: {},
                    next: {}
                }]
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
            edit() {
                this.$router.replace({
                    name: 'write',
                    query: {
                        id: this.$route.params.id
                    }
                })
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
                    res.data.createDate = this.$utils.formatDate(res.data.createDate);
                    res.data.content = marked(res.data.content, {
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
            this.jquery("html,body").animate({
                scrollTop: 150
            }, 300);
            this.getData();
        }
    }
</script>