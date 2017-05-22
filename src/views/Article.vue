<template>
    <div class="main">
        <ul>
            <li v-for="item in listInfo.data">
                <h3>{{item.date}}</h3>
                <h2><a>{{item.title}}</a></h2>
            </li>
        </ul>
        <lay-pager :page-info="test" :fn="this.request.getArticles"></lay-pager>
      
    </div>
</template>
<script>
    export default {
        data() {
            return {
                test: {
                    curPage: 1,
                    pageCount: 4,
                    pageSize: 5,
                    pageTotal: 19
                }
            }
        },
        computed: {
            listInfo: function () {
                return this.$store.getters.getListData
            }
        },
        methods: {

        },
        created() {
            var params = {
                curPage: 1,
                pageSize: 5
            }
            this.request.getArticles(params);
        }
    }
</script>