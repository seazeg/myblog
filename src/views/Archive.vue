<template>
  <div class="archive">
    <div class="box" v-for="data in listInfo">
      <h2>{{data.bDate}}</h2>
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
        for (var x in getdata) {
          if (!!getdata[x].createDate) {
            getdata[x].bDate = getdata[x].createDate.substring(0, 4);
          }

        }
        var map = {},
          result = [];
        for (var i = 0; i < getdata.length; i++) {
          var ai = getdata[i];
          if (!map[ai.bDate]) {
            result.push({
              bDate: ai.bDate,
              data: [ai]
            });
            map[ai.bDate] = ai;
          } else {
            for (var j = 0; j < result.length; j++) {
              var dj = result[j];
              if (dj.bDate == ai.bDate) {
                dj.data.push(ai);
                break;
              }
            }
          }
        }
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
    }
  }
</script>