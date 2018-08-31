<!--首页-->
<template>
    <div class="home">
      <div class="btn-wrap">
        <div class="cm-btn cm-page-btn" @click="toStart()">开始竞赛</div>
      </div>
      <div class="progress-wrap" :class="{'active':loading}">
        <div class="progress">
          <div class="progress-bar progress-bar-info progress-bar-striped"  :class="{'active':loading}" style="width: 100%;">
            <!--<div class="progress-value">85%</div>-->
          </div>
        </div>
        <div class="slogan">天天向上&nbsp;&nbsp;追求卓越</div>
      </div>
      <div class="cm-footer">
        <i class="icon footer-icon"></i>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .home{
    .btn-wrap{
      position: absolute;
      left: 0rem;
      bottom: 3.2rem;
      width: 100%;
      text-align: center;
    }
    .progress-wrap{
      position: absolute;
      width: 100%;
      left: 0rem;
      bottom: 1.7rem;
      padding: 0rem 0.28rem;
      opacity: 0;
      .progress.active .progress-bar, .progress-bar.active {
        -webkit-animation: progress-bar-stripes 2s linear infinite;
        -o-animation: progress-bar-stripes 2s linear infinite;
        animation: progress-bar-stripes 2s linear infinite;
      }
      .progress-bar-info {
        background-color: #5bc0de;
      }
      .progress-striped .progress-bar, .progress-bar-striped {
        background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-image: -o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
        -webkit-background-size: 40px 40px;
        background-size: 40px 40px;
      }
      .progress-bar {
        float: left;
        width: 0;
        height: 100%;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        background-color: #337ab7;
        -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
        box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
        -webkit-transition: width .6s ease;
        -o-transition: width .6s ease;
        transition: width .6s ease;
      }
      .progress{
        margin: 0rem auto;
        height: 25px;
        background: #fff;
        width: 6.08rem;
        padding: 5px;
        overflow: visible;
        border-radius: 20px;
        border-top: 1px solid #fff;
        border-bottom: 1px solid #fff;
      }
      .progress .progress-bar{
        border-radius: 20px;
        position: relative;
       /* animation: animate-positive 2s;*/
      }
      .progress .progress-value{
        display: block;
        padding: 3px 7px;
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
        background: #191919;
        border: 1px solid #000;
        position: absolute;
        top: -40px;
        right: -10px;
      }
      .progress .progress-value:after{
        content: "";
        border-top: 10px solid #191919;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: absolute;
        bottom: -6px;
        left: 26%;
      }
      .progress-bar.active{
        animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 1.8s;
      }
      @-webkit-keyframes animate-positive{
        0% { width: 0; }
      }
      @keyframes animate-positive{
        0% { width: 0; }
      }
      .slogan{
        margin-top: 0.2rem;
        font-size: 0.44rem;
        color: #333;
        text-align: center;
      }
      &.active{
        opacity: 1;
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
              loading:false,
            }
        },
        computed: {},
        watch: {},
        methods: {
          toStart:function () {
            this.loading=true;
            setTimeout(()=>{
              this.$router.push({name:'login',params:{}});
            },1800)
          },
        },

        created: function () {
         /* Vue.tools.shareConfig({
            title: '王者PK，不服来战！',
            desc:'Come on，你就是我命运中的对手！',
            link: window.location.href,
            imgUrl: 'http://thyrsi.com/t6/362/1535337162x-1404755636.png',
            callback:()=>{
              Vue.operationFeedback({type:'complete',text:'分享成功'});
            }
          });*/

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
                  imgUrl: 'http://thyrsi.com/t6/362/1535337162x-1404755636.png',
                  callback:()=>{
                    Vue.operationFeedback({type:'complete',text:'分享成功'});
                  }
                });
              }
            }
          });
        },
        mounted: function () {


        },

    };
</script>
