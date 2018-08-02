<!--pk结果-->
<template>
    <div class="cm-full-page cm-page-bg result win">
      <div class="score-panel" v-if="resultData.fightinfo">
        <div class="panel-bd">
          <div class="part left-part" :class="{'win':resultData.fightinfo.fighterscore>resultData.fightinfo.accepterscore}">
            <div class="part-bd">
              <div class="num">{{resultData.fightinfo.fighterscore}}<em>分</em></div>
              <i class="icon left-win-icon"></i>
              <span class="name">{{resultData.fightinfo.fightername}}</span>
            </div>
          </div>
          <div class="part right-part"  :class="{'win':resultData.fightinfo.fighterscore<resultData.fightinfo.accepterscore}">
            <div class="part-bd">
              <div class="num">{{resultData.fightinfo.accepterscore}}<em>分</em></div>
              <i class="icon right-win-icon"></i>
              <span class="name">{{resultData.fightinfo.acceptername}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="status" v-if="userType=='fight'&&resultData.fightinfo">
            <i class="icon win-icon" v-if="resultData.fightinfo.fighterscore>resultData.fightinfo.accepterscore"></i>
            <i class="icon lose-icon" v-if="resultData.fightinfo.fighterscore<resultData.fightinfo.accepterscore"></i>
            <i class="icon draw-icon" v-if="resultData.fightinfo.fighterscore==resultData.fightinfo.accepterscore"></i>
          </div>
          <div class="status" v-if="userType=='accept'&&resultData.fightinfo">
            <i class="icon win-icon" v-if="resultData.fightinfo.fighterscore<resultData.fightinfo.accepterscore"></i>
            <i class="icon lose-icon" v-if="resultData.fightinfo.fighterscore>resultData.fightinfo.accepterscore"></i>
            <i class="icon draw-icon" v-if="resultData.fightinfo.fighterscore==resultData.fightinfo.accepterscore"></i>
          </div>

          <div class="data-block"  v-if="userType=='fight'&&resultData.fightinfo">
            <p class="win-count">
              <span>胜场数：</span><i class="icon"></i><span class="num">{{resultData.fightinfo.fighterscore>resultData.fightinfo.accepterscore?1:0}}</span>
            </p>
            <p class="name">{{account.username}}</p>
            <p class="total">挑战累计总胜利场数：{{resultData.fwincounts}}场</p>
          </div>

          <div class="data-block"  v-if="userType=='accept'&&resultData.fightinfo">
            <p class="win-count">
              胜场数：<i class="icon"></i><span class="num">{{resultData.fightinfo.accepterscore>resultData.fightinfo.fighterscore?1:0}}</span>
            </p>
            <p class="name">{{account.username}}</p>
            <p class="total">挑战累计总胜利场数：{{resultData.awincounts}}场</p>
          </div>

          <div class="btn-list">
            <div class="cm-btn cm-page-btn" @click="toPk()">再来一局</div>
            <div class="cm-btn cm-page-white-btn"  @click="$router.push({name:'answer',params:{pkId:pkId}})">查看答案</div>
            <div class="cm-btn cm-page-white-btn" @click="$router.push({name:'center',params:{}})">返回</div>
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
  .result{
    text-align: center;
    padding-top: 0.4rem;
    padding-bottom: 0.8rem;
    .score-panel{
      overflow: hidden;
      padding: 0.32rem 0rem 0.6rem 0rem;
      .panel-bd{
        position: relative;
        z-index: 100;
        width: 100%;
        height: 1.4rem;
      }
      .part{
        position: absolute;
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 1.4rem;
        border-radius: 0.7rem;
        background: #fff;
        padding: 0.08rem;
        .part-bd{
          position: relative;
          display: flex;
          align-items: center;
          border:1px solid #e61c20;
          color: #e60012;
          width: 3.8rem;
          height: 1.2rem;
          border-radius: 0.6rem;
          box-shadow: 1px 1px 10px rgba(230,28,32,0.4);
          .icon{
            display: none;
            position: absolute;
            top:-0.4rem;
          }
        }
        .num{
          padding: 0rem 0.32rem;
          font-size: 0.56rem;
          em{
            padding-left: 0.08rem;
            font-size: 0.3rem;
          }
        }
        .left-win-icon{
          display: inline-block;
          background: url("../images/common/left-win-icon.png") no-repeat;
          width: 0.81rem;
          height: 0.71rem;
          background-size: 100% 100%;
        }
        .right-win-icon{
          display: inline-block;
          background: url("../images/common/right-win-icon.png") no-repeat;
          width: 0.81rem;
          height: 0.71rem;
          background-size: 100% 100%;
        }
        .name{
          position: absolute;
          bottom: -0.7rem;
          font-size: 0.28rem;
          color: #fff;
          padding: 0rem 0.5rem;
        }
        &.win{
          .part-bd{
            color: #f4bb10;
            border:1px solid #f4bb10;
            box-shadow: 1px 1px 10px rgba(244,187,16,0.4);
          }
          .icon{
            display: inline-block;
          }
        }
      }
      .left-part{
        left: -25%;
        .part-bd{
          justify-content: flex-end;
        }
        .icon{
          right: -0.24rem;
        }
      }
      .right-part{
        right: -25%;
        .icon{
          left: -0.24rem;
        }
      }
    }
    .content-panel{
      margin-top: 0.24rem;
      padding: 0rem 0.28rem;
      width: 100%;
      color: #fff;
      .panel-bd{
        position: relative;
        background: #fff;
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 15px rgba(117,4,13,0.19);
        padding-bottom: 0.4rem;
      }
      .status{
        .icon{
          position: absolute;
          top:-1.7rem;
          left: 0rem;
          right: 0rem;
          margin: auto;
          display: inline-block;
          width: 3.4rem;
          height: 2.7rem;
        }
      }
      .win-icon{
        display: inline-block;
        background: url("../images/common/win-icon.png") no-repeat;
        background-size: 100% 100%;
      }
      .lose-icon{
        display: inline-block;
        background: url("../images/common/lose-icon.png") no-repeat;
        background-size: 100% 100%;
      }
      .draw-icon{
        display: inline-block;
        background: url("../images/common/draw-icon.png") no-repeat;
        background-size: 100% 100%;
      }
      .data-block{
        text-align: center;
        padding-top: 1.1rem;
        color: #666;
        .win-count{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.36rem;
          line-height: normal;
          .icon{
            display: inline-block;
            background: url("../images/common/add-icon.png") no-repeat;
            width: 0.42rem;
            height: 0.42rem;
            background-size: 100% 100%;
          }
          .num{
            font-size: 0.8rem;
            color: #e60012;
          }
        }
        .name{
          padding-top: 0.02rem;
          font-size: 0.28rem;
        }
        .total{
          padding-top: 0.2rem;
          font-size: 0.28rem;
        }
      }
      .footer-wrap{
        margin-top: 0.6rem;
      }

    }
    .btn-list{
      margin-top: 0.4rem;
      padding: 0rem 0.24rem;
      .cm-btn{
        width: 100%;
        &+.cm-btn{
          margin-top: 0.2rem;
        }
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
              pkId:null,
              resultData:{},
              userType:null,//用户类型,fight:'邀战者',accept:'应战者'
            }
        },
        computed: {},
        watch: {},
        methods: {
          getPkResult:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              fightinfoid:this.pkId,
            }
            Vue.api.getPkResult(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.resultData=data;
                if(this.resultData.fightinfo&&this.resultData.fightinfo.acceptername==this.account.username){
                  this.userType='accept';
                }else{
                  this.userType='fight';
                }
              }else{

              }
            });
          },
          toPk:function () {
            this.$router.push({name:'question',params:{pageType:'pk'}});
          }
        },

        created: function () {
        },
        mounted: function () {
          this.account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          this.pkId=this.$route.params.pkId;
          //
          this.getPkResult();
        },

    };
</script>
