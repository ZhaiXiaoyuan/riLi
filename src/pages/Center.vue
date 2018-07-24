<!--个人中心-->
<template>
    <div class="cm-full-page cm-page-bg center">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="user-info">
            <div class="item">
              <p>部门</p>
              <p>{{account.orgname}}</p>
            </div>
            <div class="item">
              <p>姓名</p>
              <p>{{account.username}}</p>
            </div>
            <div class="item">
              <p>工号</p>
              <p>{{account.code}}</p>
            </div>
          </div>
          <div class="model-list">
            <div class="btn go-btn" @click="toPreliminary()">
              <i class="icon go-icon"></i>
              <div class="text"><p>初赛模式</p><p>剩余次数（4）</p></div>
            </div>
            <div class="btn pk-btn" @click="toPk()">
              <i class="icon pk-icon"></i>
              <div class="text"><p>对战模式</p><p>剩余次数（4）</p></div>
            </div>
          </div>
          <div class="btn-list">
            <div class="cm-btn cm-page-btn">排行榜</div>
            <div class="cm-btn cm-page-white-btn">练习</div>
            <div class="cm-btn cm-page-white-btn">规则</div>
          </div>
          <div class="cm-footer">
            <i class="icon footer-icon"></i>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .center{
    text-align: center;
    background: url("../images/common/common-page-bg.jpg") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    .content-panel{
      position: absolute;
      left: 0rem;
      bottom: 0rem;
      width: 100%;
      height: 85%;
      background: url("../images/common/center-panel-bg.png") no-repeat;
      background-size: 100% 100%;
      .panel-bd{
        position: relative;
        padding: 0rem 0.28rem;
      }
    }
    .user-info{
      margin-top: 0.84rem;
      display: flex;
      .item{
        flex: 1;
        p{
          font-size: 0.32rem;
          color: #e60012;
          &+p{
            padding-top: 0.2rem;
            font-size: 0.28rem;
            color: #666;
          }
        }
        &+.item{
          border-left: 1px solid #ededed;
        }
      }
    }
    .model-list{
      margin-top: 0.88rem;
      display: flex;
      justify-content: space-between;
      padding: 0rem 0.28rem;
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.05rem;
        height: 1.8rem;
        .icon{
          margin-right: 0.2rem;
        }
        .text{
          color: #fff;
          text-align: center;
          p{
            font-size: 0.34rem;
            &+p{
              padding-top: 0.06rem;
              font-size: 0.24rem;
            }
          }
        }
      }
      .go-icon{
        display: inline-block;
        background: url("../images/common/go-icon.png") no-repeat;
        width: 0.84rem;
        height: 0.84rem;
        background-size: 100% 100%;
      }
      .pk-icon{
        display: inline-block;
        background: url("../images/common/pk-icon.png") no-repeat;
        width: 0.84rem;
        height: 0.84rem;
        background-size: 100% 100%;
      }
      .go-btn{
        background: url("../images/common/go-btn.png") no-repeat;
        background-size: 100% 100%;
      }
      .pk-btn{
        background: url("../images/common/pk-btn.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .btn-list{
      margin-top: 0.44rem;
      padding: 0rem 0.24rem;
      .cm-btn{
        width: 100%;
        &+.cm-btn{
          margin-top: 0.3rem;
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
              raceCount:5,
              pkCount:5,
              curDate:new Date(),
              nexDate:new Date().setDate(new Date().getDate()+1),
              questionList:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
          toPreliminary:function () {
            this.$router.push({name:'question',params:{pageType:'single'}});
          },
          toPk:function () {
            this.$router.push({name:'question',params:{pageType:'pk'}});
          }
        },

        created: function () {
        },
        mounted: function () {
          this.account=JSON.parse(Vue.cookie.get('account'));
        },

    };
</script>
