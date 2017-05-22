<template>
    <div class="main">
        <ul>
            <li v-for="item in listInfo">
                <h3>{{item.date}}</h3>
                <h2><a>{{item.title}}</a></h2>
            </li>
        </ul>
        <lay-pager :page-info="pageInfo" :fn="this.request.getArticles"></lay-pager>
    </div>
</template>
<script>
    export default {
        data() {
            return {
  
            }
        },
        computed: {
            listInfo: function () {
                return this.$store.getters.getListData
            },
            pageInfo: function () {
                return this.$store.getters.getPageInfo
            }
        },
        methods: {

        },
        created() {
            var params = {
                curPage: 1,
                pageSize: 2
            }
            this.request.getArticles(params);
        }
    }
</script>