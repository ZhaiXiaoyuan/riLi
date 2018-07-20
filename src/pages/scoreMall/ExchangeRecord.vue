<!--礼品兑换记录-->
<template>
    <div class="exchange-record">
      <div class="survey-panel">
        <p>已兑换福利（个）</p>
        <div class="count">{{exchangedCount}}</div>
        <div  class="cm-btn btn link-btn" @click="checkUserInfo(()=>{$router.push({ name: 'giftList', params: { }})})">礼品商城</div>
      </div>
      <div class="list-panel">
        <ul class="entry-list">
          <li v-for="(item,index) in recordList" class="entry" :class="{'cm-disabled':item.rcvstatus==30||item.rcvstatus==40}">
            <div class="entry-bd">
              <p class="name">{{item.productName}}</p>
              <p class="info">
                <span class="field">领取时间：</span>
                {{item.rcvStartdate}}至{{item.rcvEnddate}}
              </p>
              <p class="info">
                <span class="field"> 备注：</span>
                {{item.rcvRemark}}
              </p>
              <p class="info">
                <span class="field">领取地址：</span>
                {{item.rcvAddress}}
              </p>
            </div>
            <div class="entry-ft">
              <div class="border">
                <span class="circle left-circle"></span>
                <span class="line"></span>
                <span class="circle right-circle"></span>
              </div>
              <div class="code">
                <p class="code-content">兑  换  码：{{item.excode}}</p>
                <p class="status" v-if="item.exstatus!=30">
                  <span class="cm-active" v-if="item.exstatus==20">未兑换</span>
                  <span v-if="item.exstatus==30">已兑换</span>
                </p>
                <p class="status" v-if="item.exstatus==30">
                  <span class="cm-active" v-if="item.rcvstatus==20">未领取</span>
                  <span  v-if="item.rcvstatus==30">已领取</span>
                  <span v-if="item.rcvstatus==40">已过期</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <scroll-load :page="pager" :no-data="'已经没有更多纪录了～'" @scrolling="getList()"></scroll-load>
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
                pageSize: 20,
                isLoading:false,
                isFinished:false,
              },
              recordList:[],
              exchangedCount:0,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getList:function (isInit) {
            if(isInit){
              this.pager.pageNum = 1;
              this.recordList = [];
            }
            let pager={
              'pager.pageNumber':this.pager.pageNum,
              'pager.pageSize':this.pager.pageSize
            }
            let params={
              ...Vue.tools.sessionInfo(),
              ...pager
            }
            Vue.api.getExchangeRecord(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                //
                this.exchangedCount=pager.totalRecordCount;
                this.recordList=this.recordList.concat(data.result);
                console.log('recordList:',this.recordList);
              }
            })
          }
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.getList();

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
