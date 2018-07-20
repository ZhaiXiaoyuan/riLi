<!--我的积分-->
<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div class="my-score">
      <div class="survey-panel">
        <div class="panel-bd">
          <p>可用积分</p>
          <p>{{score}}</p>
        </div>
        <div class="panel-ft">
          <router-link :to="{ name: 'giftList'}" class="arrows-right" tag="div">
            <i class="icon shopping-icon"></i>
            兑换商城
          </router-link>
          <router-link :to="{ name: 'exchangeRecord'}" class="arrows-right" tag="div">
            <i class="icon gift-icon"></i>
            我的兑换
          </router-link>
        </div>
      </div>
      <div class="list-panel">
        <div class="panel-hd">
          <span :class="{'active':listType=='income'}" @click="setListType('income')">收入{{sumData.psum}}</span>
          <span :class="{'active':listType=='cost'}" @click="setListType('cost')">支出{{sumData.msum}}</span>
        </div>
        <div class="panel-bd">
          <ul class="entry-list">
            <li class="entry" v-for="(entry,index) in entryList">
              <div class="entry-bd">
                <span class="field">{{entry.biztypeLabel}}</span>
                <span class="value" :class="{'error':!entry.pmflag}"><i class="icon">{{entry.pmflag?'+':'-'}}</i>{{entry.score}}</span>
              </div>
              <div class="entry-ft">
                {{entry.createtime||formatDate('MM-dd hh:mm')}}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
    </div>
  </mt-loadmore>
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
              sumData:{},
              pager:{
                pageNum: 1,
                pageSize: 10,
                isLoading:false,
                isFinished:false
              },
              entryList:[],
              score:0,
              listType:'income',//列表类型，income:收入,cost:支出
              totals:null,
              refreshTips:null,
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
              ...pager,
              type:this.listType=='income'?1:0,//收入/奖励=1 | 支付/兑换=0
            }
            Vue.api.getScoreRecordList(params).then((resp)=>{
              this.refreshTips&&this.refreshTips.onTopLoaded();
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                if(isInit){
                  this.totals=data.totals;
                }
                let pager=data.pager;
                this.pager.pageNum=this.pager.pageNum+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
              }
            })
          },
          getScore:function () {
            Vue.api.getScore({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.score=resp.message;
              }
            });
          },
          setListType:function (value) {
            this.listType=value;
            this.getList(true);
          },
          getSum:function () {
            Vue.api.qawardsum({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.sumData=JSON.parse(resp.message);
                console.log('this.sumData:',this.sumData);
              }
            });
          },
          loadTop:function () {
            this.refreshTips=this.$refs.loadmore;
            /**/
            this.getScore();
            /**/
            this.getSum();
            /**/
            this.getList(true);
          },
          loadBottom:function () {

          },
        },

        created: function () {
        },
        mounted: function () {
          /*获取可用积分*/
          this.getScore();
          /**/
          this.getSum();
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
