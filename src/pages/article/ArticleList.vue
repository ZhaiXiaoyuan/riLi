<!--美文列表-->
<template>
    <div class="article-list">
      <div class="survey-panel">
        <div class="data-info">
          <p><i class="icon share-icon"></i>分享：<em>{{totals&&totals.scount }}</em></p>
          <p><i class="icon diamond-icon"></i>积分：<em>{{totals&&totals.ssum}}</em></p>
        </div>
        <div class="handle">
          <router-link :to="{ name: 'awardRule',params:{type:'shareAward'}}"  class="cm-btn handle-btn">奖励规则</router-link>
        </div>
      </div>
      <div class="list-panel">
        <ul class="entry-list">
          <router-link :to="{ name: 'articleDetail', params: { id: entry.id }}" v-for="(entry,index) in entryList" tag="li" :key="entry.id">
            <div class="img-wrap">
              <img :src="entry.titlepicUrl">
              <p class="text">分享此篇文章获得{{entry.score}}积分</p>
            </div>
            <p class="cm-text title">{{entry.title}}</p>
            <p class="cm-text sub">{{entry.remark}}</p>
            <p class="addition">
              <span class="date">发表于{{entry.deploytime|formatDate('yyyy年MM月dd日')}}</span>
              <span class="label">阅读全文</span>
            </p>
          </router-link>
        </ul>
      </div>
      <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              pager:{
                pageNum: 1,
                pageSize: 10,
                isLoading:false,
                isFinished:false
              },
              entryList:[],
              totals:null,
            }
        },
        computed: {},
        watch: {},
        methods: {

          getList:function (isInit) {
            if(isInit){
              this.pager.pageNum = 1;
              this.entryList = [];
            }
            let pager={
              'pager.pageNumber':this.pager.pageNum,
              'pager.pageSize':this.pager.pageSize
            }
            let params={
              ...Vue.tools.sessionInfo(),
              ...pager
            }
            Vue.api.getArticleList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                if(isInit){
                  this.totals=data.totals;
                }
                let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
              }
            })
          }
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.getList(true);

        },
        route: {
           /* data: function(transition) {
                return Vue.utils.getCustomer().then(function (data) {
                    {
                        return {}
                    }
                });


            },
            waitForData: true,*/
        }

    };
</script>
