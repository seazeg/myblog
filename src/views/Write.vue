<template>
    <div class="write">
        <textarea :value="input" @input="update" placeholder="正文"></textarea>
        <input type="text" class="edittitle" placeholder="Add your article title" v-model="title" />
        <article v-html="compiledMarkdown"></article>
        <input type="text" class="doctitle" placeholder="Add your article title" v-model="title" readonly="readonly" />
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
                    content: $this.input
                }
                $this.save(params)
            }, 300),
            save(params) {
                var $this = this
                $this.$http({
                    method: 'POST',
                    url: this.servUrl + '/api/saveArticle',
                    params: params
                }).then(function (res) {
                    $this.id = res.data._id
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
            }
        },
        mounted() {
            var $this = this
            if (!!$this.$route.query.id) {
                var params = {
                    id: $this.$route.query.id
                }
                $this.$http({
                    method: 'GET',
                    url: $this.servUrl + '/api/getArticle',
                    params: params
                }).then(function (res) {
                    $this.input = res.data.content;
                    $this.title = res.data.title;
                    console.log(res);
                }, function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>