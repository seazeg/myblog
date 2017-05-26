<template>
    <div class="pager">
        <span class="prev animate-link" @click="prev(pageInfo.curPage-1,pageInfo.pageSize)" :class="{'n':pageInfo.curPage-1==0}"><i class="iconfont icon-shangyiye"></i></span>
        <span v-for="pageNum in pageInfo.pageCount" v-if="(pageInfo.curPage<=3?pageNum<=5:pageNum<=pageInfo.curPage+2&&pageNum>=pageInfo.curPage-2)||(pageInfo.pageCount-pageInfo.curPage<3?pageNum>=pageInfo.pageCount-4:pageNum<=pageInfo.curPage+2&&pageNum>=pageInfo.curPage-2)"
            class="num animate-link" :class="{'m':pageNum==pageInfo.curPage}" @click="go(pageNum,pageInfo.pageSize)">{{pageNum}}</span>
        <span class="next animate-link" @click="next(pageInfo.curPage+1,pageInfo.pageCount,pageInfo.pageSize)" :class="{'n':pageInfo.curPage==pageInfo.pageCount}"><i class="iconfont icon-xiayiye"></i></span>
    </div>
</template>
<script>
    export default {
        name: "lay-pager",
        props: {
            pageInfo: [Object, Array],
            fn: Function
        },
        methods: {
            common(curpage, psize) {
                var params = {
                    curPage: curpage,
                    pageSize: psize
                }
                this.fn(params);
                this.jquery("html,body").animate({
                    scrollTop: 150
                }, 300);
            },
            go(curpage, psize) {
                this.common(curpage, psize);
            },
            prev(curpage, psize) {
                if (curpage < 1) {
                    return;
                } else {
                    this.common(curpage, psize);
                }
            },
            next(curpage, pcount, psize) {
                if (curpage > pcount) {
                    return;
                } else {
                    this.common(curpage, psize);
                }
            }
        }
    }
</script>