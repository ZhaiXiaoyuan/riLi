<!--排行榜-->
<template>
    <div class="cm-full-page cm-page-bg rank">
      <i class="icon logo-icon"></i>
      <ul class="tab-list">
        <li :class="{'active':type=='personal'}" @click="getList('personal')">个人排行</li>
        <li :class="{'active':type=='team'}" @click="getList('team')">团队排行</li>
        <li :class="{'active':type=='pk'}" @click="getList('pk')">挑战排行</li>
      </ul>
      <div class="content-panel">
        <div class="panel-hd">
          <div class="hd-content">
            <div class="user-info">
              <div class="block-hd">我的排行</div>
              <div class="block-bd">
                <div class="item">
                  <p>{{customerRankInfo.winscores}}</p>
                  <p>个人积分<em>(分)</em></p>
                </div>
                <div class="item">
                  <p>{{customerRankInfo.sum}}</p>
                  <p>团队积分<em>(分)</em></p>
                </div>
                <div class="item">
                  <p>{{customerRankInfo.wincounts}}</p>
                  <p>挑战胜场数<em>(场)</em></p>
                </div>
              </div>
            </div>
          </div>
          <div class="gap"></div>
        </div>
        <div class="panel-bd">
          <div class="entry-block">
            <ul class="entry-list" v-if="type=='personal'">
              <li v-for="(item,index) in entryList">
                <div class="index">{{index+1<10?'0'+(index+1):index+1}}</div>
                <div class="user">
                  <p>{{item.username}}</p>
                  <p>{{item.orgname}}</p>
                </div>
                <div class="score">
                  <i class="icon"></i>
                  <span class="num">{{item.winscores}}</span>
                  <em>分</em>
                </div>
              </li>
            </ul>
            <ul class="entry-list" v-if="type=='team'">
              <li v-for="(item,index) in entryList">
                <div class="index">{{index+1<10?'0'+(index+1):index+1}}</div>
                <div class="user">
                  <p>{{item.orgname}}</p>
                  <p>日立电梯</p>
                </div>
                <div class="score">
                  <i class="icon"></i>
                  <span class="num">{{item.sum}}</span>
                  <em>分</em>
                </div>
              </li>
            </ul>
            <ul class="entry-list" v-if="type=='pk'">
              <li v-for="(item,index) in entryList">
                <div class="index">{{index+1<10?'0'+(index+1):index+1}}</div>
                <div class="user">
                  <p>{{item.username}}</p>
                  <p>{{item.orgname}}</p>
                </div>
                <div class="score">
                  <i class="icon"></i>
                  <span class="num">{{item.wincounts}}</span>
                  <em>场</em>
                </div>
              </li>
            </ul>
          </div>
          <div class="footer-wrap">
            <i class="icon footer-icon"></i>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .rank{
    text-align: center;
    background: url("../images/common/common-page-bg.jpg") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    padding-top: 1.6rem;
    .content-panel{
      margin-top: 0.3rem;
      width: 100%;
      height: 85%;
      padding: 0rem 0.28rem;
      .panel-hd{
        position: relative;
        z-index: 10;
        .hd-content{
          display: flex;
          align-items: center;
          background: #fff;
          min-height: 1.6rem;
          border-top-left-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
        }
        .gap{
          background: url("../images/common/panel-gap.png") no-repeat;
          width: 100%;
          height: 0.21rem;
          background-size: 100% 100%;
        }
      }
      .panel-bd{
        position: relative;
        padding: 0.4rem 0.28rem;
        background: #fff;
        height: 80%;
        overflow: auto;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        box-shadow: 0px 10px 50px rgba(117,4,13,0.1);
      }
    }
    .tab-list{
      display: flex;
      justify-content: space-between;
      padding: 0rem 0.28rem;
      li{
        width: 2.10rem;
        height: 0.64rem;
        text-align: center;
        line-height: 0.64rem;
        border-radius: 0.32rem;
        border: 1px solid #fff;
        color: #fff;
        font-size: 0.32rem;
        &.active{
          background: #fff;
          color: #ef0719;
        }
      }
    }
    .user-info{
      width: 100%;
      .block-hd{
        font-size: 0.3rem;
        color: #333;
      }
      .block-bd{
        margin-top: 0.08rem;
        display: flex;
      }
      .item{
        flex: 1;
        p{
          font-size: 0.3rem;
          color: #e60012;
          &+p{
            padding-top: 0.08rem;
            font-size: 0.28rem;
            color: #666;
            em{
              font-size: 0.24rem;
            }
          }
        }
        &+.item{
          border-left: 1px solid #ededed;
        }
      }
    }
    .entry-block{
      width: 100%;
      height: 88%;
      overflow: auto;
      .entry-list{
        li{
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0rem 0.28rem;
          &+li{
            margin-top: 0.16rem;
          }
        }
      }
      .index{
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("../images/common/index-bg.png") no-repeat;
        width: 1.12rem;
        height: 1.12rem;
        background-size: 100% 100%;
        font-size: 0.36rem;
        color: #e60012;
      }
      .user{
        margin-left: 0.08rem;
        font-size: 0.28rem;
        color: #333;
        font-family: '宋体';
        p+p{
          padding-top: 0.12rem;
          font-size: 0.24rem;
          color: #b2b2b2;
        }
      }
      .score{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
        font-size: 0.36rem;
        color: #e60012;
        em{
          padding-left: 0.04rem;
          font-size: 0.24rem;
        }
        .icon{
          margin-right: 0.08rem;
          position: relative;
          top:-0.04rem;
          display: inline-block;
          background: url("../images/common/star-icon.png") no-repeat;
          width: 0.3rem;
          height: 0.3rem;
          background-size: 100% 100%;
        }
      }
    }
    .footer-wrap{
      margin-top: 0.4rem;
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
              customerRankInfo:{},
              entryList:[],
              type:null,//列表类型，personal:个人,team:团队,pk:对战
            }
        },
        computed: {},
        watch: {},
        methods: {
          getPersonalRank:function () {
            let params={
              ...Vue.tools.sessionInfo()
            }
            Vue.api.getPersonalRank(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.customerRankInfo=data.customer;
                this.entryList=data.customers;
                console.log('data:',data);
              }else{

              }
            });
          },
          getTeamRank:function () {
            let params={
              ...Vue.tools.sessionInfo()
            }
            Vue.api.getTeamRank(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.customerRankInfo=data.customer;
                this.entryList=data.team;
              }else{

              }
            });
          },
          getPkRank:function () {
            let params={
              ...Vue.tools.sessionInfo()
            }
            Vue.api.getPkRank(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.customerRankInfo=data.customer;
                this.entryList=data.customers;
                console.log('data:',data);
              }else{

              }
            });
          },
          getList:function (type) {
            this.type=type;
            if(this.type=='personal'){
              this.getPersonalRank();
            }else if(this.type=='team'){
              this.getTeamRank();
            }else if(this.type=='pk'){
              this.getPkRank();
            }
          }
        },

        created: function () {
        },
        mounted: function () {
          this.getList('personal');
        },

    };
</script>
