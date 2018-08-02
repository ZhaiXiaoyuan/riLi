<!--对战记录-->
<template>
    <div class="cm-page-bg record-page" style="min-height: 100%;">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <p class="title">对战记录</p>
          <div class="tab-wrapper">
            <ul class="tab-list">
              <li :class="{'active':type=='invite'}" @click="setType('invite')">
                邀战
              </li>
              <li :class="{'active':type=='accept'}" @click="setType('accept')">应战</li>
            </ul>
          </div>
          <div class="list-block">
            <ul class="entry-list">
              <li class="entry" v-for="(item,index) in entryList" @click="toDetail(item)">
                <div class="entry-bd">
                  <div class="part left-part">
                    <p class="name">{{item.fightername}}</p>
                    <p class="score">得分：{{item.fighterscore}}</p>
                  </div>
                  <div class="middle-part">vs</div>
                  <div class="part right-part" v-if="item.acceptername">
                    <p class="name">{{item.acceptername}}</p>
                    <p class="score" v-if="item.status=='10'">答题中</p>
                    <p class="score" v-if="item.status=='20'">得分：{{item.accepterscore}}</p>
                  </div>
                  <div class="part right-part" v-if="!item.acceptername">
                    <p class="name">
                      <span v-if="item.status=='0'">暂无人应战</span>
                      <span v-if="item.status=='10'">答题中</span>
                      <span v-if="item.status=='30'">失效</span>
                    </p>
                  </div>
                </div>
                <div class="entry-ft">
                  {{item.createtime.split('.')[0]}}
                </div>
              </li>
            </ul>
            <scroll-load :page="pager" @scrolling="getList()"></scroll-load>
          </div>
          <div style="text-align: center;padding: 0.4rem 0rem 0.2rem 0rem;">
            <i class="icon footer-icon"></i>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .record-page{
    padding: 1.8rem 0rem 0.28rem 0rem;
    overflow: auto;
    background-attachment: fixed;
    .content-panel{
      width: 100%;
      padding: 0rem 0.28rem;
      .panel-bd{
        position: relative;
        background: #fff;
        width: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 15px rgba(117,4,13,0.19);
        .title{
          font-size: 0.36rem;
          color: #4c4c4c;
          text-align: center;
          padding: 0.3rem 0rem;
        }
      }
    }
    .tab-wrapper{
      display: flex;
      justify-content: center;
      border-bottom: 1px solid #e5e5e5;
    }
    .tab-list{
      display: inline-block;
      justify-content: center;
    /*  border-top-left-radius: 0.1rem;
      border-right-left-radius: 0.1rem;*/
      overflow: hidden;
      li{
        float: left;
        padding:0.1rem 0.4rem;
        border: 1px solid #e5e5e5;
        border-bottom: none;
        font-size: 0.28rem;
        color: #666;
        &+li{
          border-left: none;
        }
        &.active{
          background: #e60012;
          border: 1px solid #e60012;
          color: #fff;
        }
      }
    }
    .entry-list{
      margin-top: 0.2rem;
      padding: 0rem 0.2rem;
    }
    .entry{
      padding: 0rem 0.2rem;
      box-shadow: 0px 1px 5px rgba(0,0,0,0.2);
      border-radius: 0.1rem;
      .entry-bd{
        display: flex;
        align-items: center;
        padding: 0.16rem 0rem;
        .part{
          flex: 1;
        }
        .name{

        }
        .score{
          padding-top: 0.04rem;
          font-size: 0.24rem;
          color: #999;
        }
        .middle-part{
          font-size: 0.4rem;
        }
        .right-part{
          text-align: right;
        }
      }
      .entry-ft{
        padding: 0.16rem 0rem;
        border-top: 1px dotted #e5e5e5;
        text-align: right;
      }
      &+.entry{
        margin-top: 0.2rem;
      }
    }
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {
        },
        data: function () {
            return {
              account:{},
              type:'invite',
              entryList:[],
              pager:{
                pageNum: 1,
                pageSize: 10,
                isLoading:false,
                isFinished:false,
              },
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
            Vue.api.getInviteRecord(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('data:',data);
                if(isInit){
                  this.totals=data.totals;
                }
                this.pager.pageNum=data.pageNumber+1;
                this.pager.maxPage=data.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
                console.log('this.entryList:',this.entryList);
              }
            })
          },
          getAcceptList:function (isInit) {
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
            Vue.api.getAcceptRecord(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('data:',data);
                if(isInit){
                  this.totals=data.totals;
                }
                this.pager.pageNum=data.pageNumber+1;
                this.pager.maxPage=data.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.entryList=this.entryList.concat(data.result);
                console.log('this.entryList:',this.entryList);
              }
            })
          },
          toDetail:function (item) {
            if(item.status=='20'){
              this.$router.push({name:'result',params:{pkId:item.fighterid}});
            }else{
              this.$router.push({name:'end',params:{pageType:'pk',pkId:item.fightid}});
            }
          },
          setType:function (type) {
            this.type=type;
            if(this.type=='invite'){
              this.getList(true);
            }else if(this.type=='accept'){
              this.getAcceptList(true);
            }
          },
        },

        created: function () {

        },
        mounted: function () {
          this.account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};

          //
          this.getList(true);

        },

    };
</script>
