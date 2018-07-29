<!--答题结束-->
<template>
    <div class="cm-full-page end">
      <i class="icon logo-icon"></i>
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
          <p class="tips">请等待对手挑战后查看结果！</p>
          <div class="btn-list">
            <div class="cm-btn cm-page-white-solid-btn" @click="shareGuide()">发起挑战</div>
            <div class="cm-btn page-white-hollow-btn" @click="toPk()">再来一局</div>
            <div class="cm-btn page-white-hollow-btn" @click="$router.push({name:'center',params:{}})">返回</div>
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
  .end{
    text-align: center;
    padding-top: 1.2rem;
    background: url("../images/pages/end-bg.jpg") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    .content-panel{
      margin-top: 0.6rem;
      padding: 0rem 0.28rem;
      width: 100%;
      height: 70%;
      color: #fff;
      .panel-bd{
        position: relative;
        background: #e60012;
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 25px rgba(230,0,18,0.4);
      }
      .title{
        padding-top: 0.7rem;
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
                if(data.pkStatus=='10'){
                  if(data.who!='当前是邀战人'&&data.mess=='暂未有应战人接受对战'){
                    this.$router.push({name:'question',params:{pageType:'pk',pkId:pkId}});
                  }
                }else if(data.pkStatus=='20'){
                  this.$router.push({name:'result',params:{pkId:this.pkId}});
                }
              }else{

              }
            });
          },
        },

        created: function () {
        },
        mounted: function () {
          this.pageType=this.$route.params.pageType;
          this.pkId=this.$route.params.pkId;
          //
          this.sessionInfo();
          //
          if(this.pageType=='single'){
            this.scoreData=JSON.parse(Vue.cookie.get('scoreData'));
            console.log('this.scoreData:',this.scoreData);
          }else if(this.pageType=='pk'&&this.pkId){
            this.getPkResult();
            this.interval=setInterval(()=>{
              this.getPkResult();
              this.counter++;
              if(this.counter>300){
                clearInterval(this.interval);
              }
            },3000)
          }
        },
       beforeRouteLeave (to, from, next) {
         clearInterval(this.interval);
         next();
       }

    };
</script>
