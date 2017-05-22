<template>
    <div class="article-detail">
        <h2>{{data.title}}</h2>
        <h3>{{data.date}}</h3>
        <div v-html="data.content"></div>
        <div style="position:fixed;bottom:20px;cursor:pointer" @click="next(data._id)">下一篇</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                data: {}
            }
        },
        computed: {

        },
        methods: {
            next(id) {
                var temp = this.$store.getters.getListInfo
                temp.map(function (v,index) {
                    if (v._id == id) {
                        console.log("本体:",v);
                    }
                });
            }
        },
        mounted() {
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
    }
</script>