<!--个人中心-->
<template>
    <div class="cm-full-page cm-page-bg center">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-hd">
          <div class="hd-content">
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
          </div>
          <div class="gap"></div>
        </div>
        <div class="panel-bd">
          <div class="model-list">
            <div class="btn go-btn" @click="toPreliminary()" :class="{'cm-disabled':!raceCount}">
              <i class="icon go-icon"></i>
              <div class="text"><p>初赛模式</p><p>剩余次数（{{raceCount}}）</p></div>
            </div>
            <div class="btn pk-btn" @click="toPk()"  :class="{'cm-disabled':!pkCount}">
              <i class="icon pk-icon"></i>
              <div class="text"><p>对战模式</p><p>剩余次数（{{pkCount}}）</p></div>
              <div class="record-btn" @click="toRecord($event)"><span>对战记录</span></div>
            </div>
          </div>
          <div class="btn-list">
            <div class="cm-btn cm-page-btn" @click="$router.push({name:'rank',params:{}})">排行榜</div>
            <div class="cm-btn cm-page-white-btn"  @click="$router.push({name:'practice',params:{}})">练习</div>
            <div class="cm-btn cm-page-white-btn"  @click="$router.push({name:'rule',params:{}})">规则</div>
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
  .center{
    text-align: center;
    padding: 2rem 0rem 0.28rem 0rem;
    .content-panel{
      width: 100%;
      padding: 0rem 0.28rem;
      .panel-hd{
        position: relative;
        z-index: 10;
        .hd-content{
          display: flex;
          align-items: center;
          background: #fff;
          min-height: 1.5rem;
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
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        box-shadow: 0px 10px 50px rgba(117,4,13,0.1);
      }
    }
    .user-info{
      display: flex;
      width: 100%;
      .item{
        flex: 1;
        p{
          font-size: 0.32rem;
          color: #e60012;
          &+p{
            padding-top: 0.1rem;
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
      display: flex;
      justify-content: space-between;
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
        position: relative;
        background: url("../images/common/pk-btn.png") no-repeat;
        background-size: 100% 100%;
        .record-btn{
          position: absolute;
          right: 0rem;
          bottom: -0.44rem;
          font-size: 0.28rem;
          color: #f3c50b;
          text-decoration: underline;
        }
      }
    }
    .btn-list{
      margin-top: 0.7rem;
      .cm-btn{
        width: 100%;
        &+.cm-btn{
          margin-top: 0.24rem;
        }
      }
    }
    .footer-wrap{
      margin-top: 1rem;
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
              maxCount:100,
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
          toRecord:function ($event) {
            $event.stopPropagation();
            this.$router.push({name:'record',params:{}});
          }
        },

        created: function () {
          //
          if(!sessionStorage.getItem('refreshFlag')){
            sessionStorage.setItem('refreshFlag','true');
            window.location.reload();
          }else{
            sessionStorage.removeItem('refreshFlag');

            Vue.tools.wxConfig({
              debug:false,
              beta:true,
              url:window.location.href,
              jsApiList:['hideMenuItems','onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              callback:(data)=>{
                if(data){
                  Vue.tools.shareConfig({
                    title: '兄dei，一起来玩吧！',
                    desc:'属于我们日立电梯的王者争霸，还有丰厚的赏金等着你！勇敢的少年啊，快来挑战吧！',
                    link: window.location.href,
                    imgUrl: 'http://i4.bvimg.com/658256/ead7a275bdfea099.png',
                    callback:()=>{
                      Vue.operationFeedback({type:'complete',text:'分享成功'});
                    }
                  });
                }
              }
            });
          }
/*
          Vue.tools.shareConfig({
            title: '兄dei，一起来玩吧！',
            desc:'属于我们日立电梯的王者争霸，还有丰厚的赏金等着你！勇敢的少年啊，快来挑战吧！',
            link: window.location.href,
            imgUrl: 'http://i4.bvimg.com/658256/ead7a275bdfea099.png',
            callback:()=>{
              Vue.operationFeedback({type:'complete',text:'分享成功'});
            }
          });*/
        },
        mounted: function () {
          this.account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          this.checkCount({
            callback:(data)=>{
              this.raceCount=basicConfig.maxCount-data.stime;
              this.pkCount=basicConfig.maxCount-data.ftime;
            }
          });
        },

    };
</script>
