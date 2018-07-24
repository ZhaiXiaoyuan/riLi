<!--pk结果-->
<template>
    <div class="cm-full-page cm-page-bg result win">
      <div class="score-panel">
        <div class="part left-part win">
          <div class="part-bd">
            <div class="num">86<em>分</em></div>
            <i class="icon left-win-icon"></i>
            <span class="name">卡卡西</span>
          </div>
        </div>
        <p class="text" v-if="true">挑战成功</p>
        <p class="text" v-if="false">挑战失败</p>
        <p class="text" v-if="false">挑战平局</p>
        <div class="part right-part">
          <div class="part-bd">
            <div class="num">86<em>分</em></div>
            <i class="icon right-win-icon"></i>
            <span class="name">傻大木</span>
          </div>
        </div>
      </div>
      <div class="content-panel">
        <div class="panel-bd">
          <i class="icon win-icon" v-if="true"></i>
          <i class="icon lose-icon" v-if="false"></i>
          <i class="icon draw-icon" v-if="false"></i>
          <div class="data-block">
            <p class="win-count">胜场数目：<em>+1</em></p>
            <p class="name">卡卡西</p>
            <p class="total">挑战累计总胜利场数：78场</p>
          </div>
          <div class="btn-list">
            <div class="cm-btn cm-page-btn">再来一局</div>
            <div class="cm-btn cm-page-white-btn">查看答案</div>
            <div class="cm-btn cm-page-white-btn">返回</div>
          </div>
        </div>
      </div>
      <div class="cm-footer">
        <i class="icon footer-icon"></i>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .result{
    text-align: center;
    overflow: hidden;
    .score-panel{
      position: relative;
      z-index: 100;
      top:0.6rem;
      width: 100%;
      height: 1.4rem;
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
      .text{
        position: absolute;
        width: 100%;
        font-size: 0.48rem;
        color: #fff;
        text-align: center;
        height: 0.88rem;
        line-height: 0.88rem;
        top:0rem;
        bottom: 0rem;
        margin: auto;
      }
    }
    .content-panel{
      position: fixed;
      left: 0rem;
      bottom: 0.28rem;
      padding: 0rem 0.28rem;
      width: 100%;
      height: 76%;
      color: #fff;
      .panel-bd{
        position: relative;
        background: #fff;
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 4px 10px rgba(117,4,13,0.19);
      }
      .icon{
        position: absolute;
        top:-1rem;
        left: 0rem;
        right: 0rem;
        margin: auto;
        display: inline-block;
        width: 1.7rem;
        height: 1.9rem;
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
        padding-top: 1.2rem;
        color: #666;
        .win-count{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.36rem;
          em{
            font-size: 0.8rem;
            color: #e60012;
          }
        }
        .name{
          padding-top: 0.2rem;
          font-size: 0.28rem;
        }
        .total{
          padding-top: 0.2rem;
          font-size: 0.28rem;
        }
      }

    }
    .btn-list{
      margin-top: 0.6rem;
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
              pageType:'pk',//页面类型，single:单独答题,pk:'对战'
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {

        },

    };
</script>
