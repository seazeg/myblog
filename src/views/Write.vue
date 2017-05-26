<template>
    <div class="write">
        <textarea :value="input" @input="update" placeholder="正文"></textarea>
        <input type="text" class="edittitle" placeholder="Add your article title" v-model="title" />
        <article v-html="compiledMarkdown"></article>
        <input type="text" class="doctitle" placeholder="Add your article title" v-model="title" readonly="readonly" />
        <select>
            <option>请选择分类</option>
            <option>杂谈</option>
            <option>技术文章</option>
        </select>
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
                $this.$axios({
                    method: "post",
                    url: $this.servUrl + '/api/saveArticle',
                    params
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
            if (!!$this.$route.query.id) {
                var params = {
                    id: $this.$route.query.id
                }
                $this.$axios({
                    method: "get",
                    url: $this.servUrl + '/api/getArticle',
                    params
                }).then((res) => {
                    $this.input = res.data.content;
                    $this.title = res.data.title;
                    console.log(res);
                }, (error) => {
                    console.log(error);
                });


            }
        }
    }
</script>