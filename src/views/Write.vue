<template>
    <div class="write">
        <textarea :value="input" @input="update" placeholder="正文"></textarea>
        <div class="edittitle">
            <input type="text" placeholder="Add your article title" v-model="title" />
            <input type="text" placeholder="Add your tags" v-model="category" />
        </div>
        <article v-html="compiledMarkdown"></article>
        <div class="doctitle">
            <input type="text" placeholder="Add your article title" v-model="title" readonly="readonly" />
            <input type="text" placeholder="Add your tags" v-model="category" readonly="readonly" />
        </div>
    </div>
</template>
<script>
    import _ from 'lodash'
    import marked from 'marked';
    import highlight from 'highlight.js';
    import 'highlight.js/styles/monokai-sublime.css'
    import '../assets/css/article.css'
    export default {
        data() {
            return {
                input: '# 正文',
                title: "Add your article title",
                category: "Add your tags",
                id: this.$route.query.id || ""
            }
        },
        components: {
            marked,
            highlight
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.input, {
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
            }
        },
        methods: {
            update: _.debounce(function (e) {
                var $this = this
                $this.input = e.target.value;
                var params = {
                    id: $this.id,
                    title: $this.title,
                    date: $this.$utils.formatDateTime(new Date()),
                    content: $this.input,
                    category: $this.category
                }
                $this.save(params)
            }, 300),
            save(params) {
                var $this = this
                $this.$axios({
                    method: "post",
                    url: $this.servUrl + '/api/saveArticle',
                    data: params
                }).then((res) => {
                    $this.id = res.data._id
                    console.log(res);
                }, (error) => {
                    console.log(error);
                });
            }
        },
        mounted() {
            var $this = this
            if ($this.$store.getters.getLogind) {
                if (!!$this.$route.query.id) {
                    var params = {
                        id: $this.$route.query.id
                    }
                    $this.$axios({
                        method: "get",
                        url: $this.servUrl + '/api/getArticle',
                        params
                    }).then((res) => {
                        $this.input = res.data.data.content;
                        $this.title = res.data.data.title;
                        $this.category = res.data.data.category;
                        console.log(res);
                    }, (error) => {
                        console.log(error);
                    });
                }
            } else {
                this.$router.replace({
                    path: '/'
                })
                console.log("未登录");
            }
        }
    }
</script>