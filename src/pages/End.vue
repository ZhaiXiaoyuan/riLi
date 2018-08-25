<!--答题结束-->
<template>
    <div class="cm-full-page end">
      <i class="icon logo-black-icon"></i>
      <div class="content-panel">
        <div class="panel-bd" v-if="pageType=='single'&&scoreData">
          <p class="title">答题结束，本次答题获得积分</p>
          <div class="result">
            <div class="score">{{scoreData.score}}</div>
            <p class="name">{{scoreData.customer.username}}</p>
            <p class="integral">累计总积分：{{scoreData.customer.winscores}}分</p>
          </div>
          <div class="btn-list">
            <div class="cm-btn cm-page-white-solid-btn" @click="$router.push({name:'center',params:{}})">返回</div>
            <div class="cm-btn page-white-hollow-btn" @click="toPreliminary()">再来一局</div>
          </div>
        </div>
        <div class="panel-bd"  v-if="pageType=='pk'">
          <p class="title">对战答题结束</p>
          <p class="tips">待好友应战后才能看到自己的分数！</p>
          <div class="btn-list">
            <div class="cm-btn cm-page-white-solid-btn" @click="shareGuide()">发起挑战</div>
            <div class="cm-btn page-white-hollow-btn" @click="toPk()">再来一局</div>
            <div class="cm-btn page-white-hollow-btn" @click="$router.push({name:'center',params:{}})">返回</div>
          </div>
        </div>
      </div>
      <div class="footer-wrap">
        <i class="icon footer-icon"></i>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .end{
    text-align: center;
    padding-top: 1rem;
    background: url("../images/pages/end-bg.jpg") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    .content-panel{
      margin-top: 0.6rem;
      padding: 0rem 0.28rem;
      width: 100%;
      min-height: 70%;
      color: #fff;
      .panel-bd{
        position: relative;
        background: #e60012;
        padding-bottom: 0.6rem;
        width: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 25px rgba(230,0,18,0.4);
      }
      .title{
        padding-top: 0.6rem;
        font-size: 0.36rem;
      }
      .score{
        margin-top: 0.4rem;
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
        text-align: center;
        line-height: 1.8rem;
        font-size: 0.48rem;
        color: #e60012;
        background: #fff;
        border-radius: 50%;
      }
      .name{
        margin-top: 0.2rem;
        font-size: 0.3rem;
      }
      .integral{
        margin-top: 0.2rem;
        font-size: 0.3rem;
      }
      .tips{
        padding-top: 0.2rem;
        font-size: 0.3rem;
      }
    }
    .btn-list{
      margin-top: 0.4rem;
      padding: 0rem 0.24rem;
      .cm-btn{
        width: 100%;
        &+.cm-btn{
          margin-top: 0.3rem;
        }
      }
    }
    .footer-wrap{
      padding: 0.4rem 0rem;
      text-align: center;
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
              pageType:'single',//页面类型，single:单独答题,pk:'对战',
              scoreData:null,
              pkId:null,
              interval:null,
              counter:0,
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
                console.log('data:',data);
                if(data.pkStatus!=0&&!data.who){
                  this.$router.push({name:'error',params:{}});
                  return;
                }

                if(data.who=='当前是邀战人'){
                  /*document.title='日立电梯邀你对战';*/
                }
                if(data.pkStatus=='0'){
                  if(data.who!='当前是邀战人'){
                    clearInterval(this.interval);
                    this.$router.push({name:'question',params:{pageType:'pk',pkId:this.pkId}});
                  }
                }else if(data.pkStatus=='20'){
                  clearInterval(this.interval);
                  this.$router.push({name:'result',params:{pkId:this.pkId}});
                }
              }else{

              }
            });
          },
        },

        created: function () {
          this.pkId=this.$route.params.pkId;
          //
          if(!sessionStorage.getItem('refreshFlag')){
            sessionStorage.setItem('refreshFlag','true');
            window.location.reload();
          }else{
            sessionStorage.removeItem('refreshFlag');
            let targetLink=window.location.href.split('#')[0]+'#/question/pk/'+this.pkId;
         /*   alert(targetLink);*/
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
                    link: targetLink,
                    imgUrl: 'http://i4.bvimg.com/658256/ead7a275bdfea099.png',
                    callback:()=>{
                      Vue.operationFeedback({type:'complete',text:'分享成功'});
                    }
                  });
                }
              }
            });
          }
        },
        mounted: function () {
          this.account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          //
          this.pageType=this.$route.params.pageType;
          //
         /* if(!this.$route.query.refreshFlag&&this.pageType=='pk'&&this.pkId){
            window.location.href=window.location.href+'?refreshFlag=true';
          }*/
          //
          if(this.pageType=='single'){
            this.scoreData=JSON.parse(Vue.cookie.get('scoreData'));
            console.log('this.scoreData:',this.scoreData);
          }else if(this.pageType=='pk'&&this.pkId){
            this.getPkResult();
            this.interval=setInterval(()=>{
              this.getPkResult();
              this.counter++;
              if(this.counter>200){
                clearInterval(this.interval);
              }
            },3000)
          }

        },
      beforeRouteEnter (to, from, next) {
        //
        Vue.tools.sessionInfo();
        next();
      },
       beforeRouteLeave (to, from, next) {
         clearInterval(this.interval);
         next();
       },

    };
</script>
