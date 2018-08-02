<!--对战记录-->
<template>
    <div class="cm-full-page cm-page-bg record-page">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <p class="title">对战记录</p>
          <div class="list-block">
            <ul class="entry-list">
              <li class="entry" v-for="(item,index) in entryList">
                <div class="entry-bd">
                  <div class="part left-part">
                    <p class="name">{{item.fightername}}</p>
                    <p>得分：{{item.fighterscore}}</p>
                  </div>
                  <div class="middle-part">vs</div>
                  <div class="part right-part" v-if="item.acceptername">
                    <p class="name">{{item.acceptername}}</p>
                    <p>得分：{{item.accepterscore}}</p>
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
    padding: 2rem 0rem 0.28rem 0rem;
    overflow: auto;
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
          padding: 0.4rem 0rem;
        }
      }
    }
    .entry-list{

    }
    .entry{
      .entry-hd{
        display: flex;
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
              entryList:[],
              pager:{
                pageNum: 1,
                pageSize: 20,
                isLoading:false,
                isFinished:false
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
