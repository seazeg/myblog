<template>
    <div class="archive">
        <div class="box" v-for="data in listInfo">
            <h2>{{data.category}}</h2>
            <ul>
                <li v-for="item in data.data">
                    <h3>{{$utils.formatDate(item.createDate)}}</h3><a @click="open(item._id)">{{item.title}}</a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        computed: {
            listInfo: function () {
                var getdata = this.$store.getters.getTimeLine;
                var map = {},
                    result = [];
                for (var i = 0; i < getdata.length; i++) {
                    var ai = getdata[i];
                    if (!map[ai.category]) {
                        result.push({
                            category: ai.category,
                            data: [ai]
                        });
                        map[ai.category] = ai;
                    } else {
                        for (var j = 0; j < result.length; j++) {
                            var dj = result[j];
                            if (dj.category == ai.category) {
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                }
                console.log(result);
                return result;
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
            }
        },
        mounted() {
            this.request.getArticles({
                field: "archive"
            });
            this.jquery("html,body").scrollTop(0);
        }
    }
</script>