<template>
    <div class="main">
        <ul>
            <li v-for="item in listInfo">
                <h3>{{item.date}}</h3>
                <h2><a>{{item.title}}</a></h2>
            </li>
        </ul>
        <lay-pager></lay-pager>
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
            }
        },
        methods: {

        },
        created() {
            var $this = this;
            this.$http.get(this.servUrl + '/api/getArticles', {
                    params: {
                        curpage: 1,
                        pagesize: 5
                    }
                })
                .then(function (response) {
                    $this.$store.dispatch("setListData", response.data)
                    console.log(response);
                })
                .catch(function (response) {
                    console.log(response);
                });
        }
    }
</script>