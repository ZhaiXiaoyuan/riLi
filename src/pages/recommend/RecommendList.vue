<!--推荐买房列表-->
<template>
    <div class="recommend-list">
      <div class="survey-panel">
        <div class="panel-bd">
          <ul>
            <li>
              <p>{{totals&&totals.urate|toFixed(2)}}%</p>
              <p>有效推荐率</p>
            </li>
            <li>
              <p>{{totals&&totals.acount}}</p>
              <p>推荐总数</p>
            </li>
            <li>
              <p>{{totals&&totals.rsum}}</p>
              <p>共赚积分</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-panel">
        <div class="panel-hd">
          <ul class="cm-tab-list">
            <li :class="{'active':type==0}" @click="setType(0)"><span>待确认</span></li>
            <li :class="{'active':type==1}" @click="setType(1)"><span>有效推荐</span></li>
            <li :class="{'active':type==2}" @click="setType(2)"><span>无效推荐</span></li>
          </ul>
        </div>
        <div class="panel-bd">
          <ul>
            <li class="entry" v-for="(entry,index) in entryList">
              <div class="entry-bd">
                <div class="field">
                  <span>{{entry.buyerName}}</span>
                  <span class="gender">{{entry.buyerGenderLabel}}</span>
                </div>
                <span class="value">{{entry.buyerMobilephone}}</span>
              </div>
              <div class="entry-ft">推荐时间：{{entry.createtime.split('.')[0]|formatDate('yyyy年MM月dd日')}}</div>
            </li>
          </ul>
          <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              type:0,//是否有效【0=待确认 | 1=有效推荐 | 2=无效推荐】
              pager:{
                pageNum: 1,
                pageSize: 20,
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
              iseffect:this.type,
              ...pager
            }
            Vue.api.getRecommendList(params).then((resp)=>{
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
          },
          setType:function (value) {
            this.type=value;
            this.getList(true);
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
