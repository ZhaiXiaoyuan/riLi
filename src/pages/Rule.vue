<!--规则-->
<template>
    <div class="cm-full-page cm-page-bg rule">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="list-block">
            <div class="block-hd">竞赛规则</div>
            <div class="block-bd">
              <div v-html="this.ruleData.label"></div>
            <!--  <div v-html="this.pkRuleData.label" v-if="this.pkRuleData"></div>-->
             <!-- <div>
                <p class="title">初赛模式：</p>
                <p>即单独答题模式，员工每天可玩5次，系统每次出5题，每题10秒，玩满5次后不可再玩，需待第二天再玩。</p>
                <p>1.初赛采取积分制，每答对一题得10分，回答错误不得分。</p>
                <p>2.初赛决出个人奖和集体奖，其中个人奖为积分排名前十的员工，集体奖为集体平均分最高的前十个单位（如某单位有200人参与答题，共得分20000分，则该单位平均分为20000分/200人=100分），为保证活动的公平公正，该十家单位按区域划分如下：前2名总部队伍+前2名广州地区分支机构队伍（广州工厂、广州司、日立楼宇、电机工厂、扶梯工厂）+前6名外地分支机构队伍</p>
                <p class="title">挑战模式：</p>
                <p>即员工与员工对战，由玩家自行寻找挑战对象（可发给特定的微信好友，也可发布在朋友圈）系统每次出5题，每题10秒，每轮答题正确率较高者获得一场胜率，另一玩家无胜率。每天可对战5次，发出挑战满5次后不可再玩，需待第二天再玩。（应战不受次数限制）</p>
                <p>注：为公平起见，挑战模式无法即时知道自己的得分，须待两名员工应战后才能得知得分和胜负。</p>
                <p class="title">奖项设置：</p>
                <table class="award-desc" style="width: 100%;text-align: center;border: 1px solid #e5e5e5;">
                  <tr>
                    <td colspan="2">奖项</td>
                    <td>数量</td>
                    <td>奖励</td>
                  </tr>
                  <tr>
                    <td rowspan="4">个人奖</td>
                    <td>积分王（积分排名第1名）</td>
                    <td>1名</td>
                    <td>1000元</td>
                  </tr>
                  <tr>
                    <td>积分达人（积分排名第2-10名）</td>
                    <td>9名</td>
                    <td>500元</td>
                  </tr>
                  <tr>
                    <td>挑战王（员工挑战胜率第1名）</td>
                    <td>1名</td>
                    <td>600元</td>
                  </tr>
                  <tr>
                    <td>挑战达人（挑战胜率第2-5名）</td>
                    <td>4名</td>
                    <td>300元</td>
                  </tr>
                  <tr>
                    <td rowspan="2">集体奖</td>
                    <td>平均分前十名的单位（按区域）</td>
                    <td>10家</td>
                    <td>晋升决赛</td>
                  </tr>
                  <tr>
                    <td>参与率前十名的单位</td>
                    <td>10家</td>
                    <td>颁发奖状</td>
                  </tr>
                </table>
                <p>如有疑问，请联系：人力资源总部 谢彦瑜 电话：020-39908630</p>
              </div>-->
            </div>
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
  .rule{
    padding-top: 2rem;
    .content-panel{
      width: 100%;
      padding: 0rem 0.28rem;
      .panel-bd{
        position: relative;
        background: #fff;
        width: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 15px rgba(117,4,13,0.19);
      }
    }
    .list-block{
      height: 90%;
      padding: 0rem 0.28rem;
      .block-hd{
        font-size: 0.36rem;
        color: #4c4c4c;
        padding: 0.5rem 0rem;
        text-align: center;
        border-bottom:1px solid #e5e5e5;
      }
      .block-bd{
        height: 82%;
        overflow: auto;
        .title{
          padding-top: 0.3rem;
          font-size: 0.32rem;
          color: #333;
          padding-bottom: 0.2rem;
        }
        >div{
          padding: 0.2rem 0rem;
          font-size: 0.26rem;
          color: #666;
          line-height: 0.44rem;
        }
      }
    }
    .footer-wrap{
      margin-top: 0.4rem;
      padding: 0.4rem;
      text-align: center;
    }
  }
  .award-desc{
    font-size: 0.24rem;
    td{
      padding: 0.08rem 0.04rem;
      border-top: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
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
              ruleData:{},
              pkRuleData:{},
            }
        },
        computed: {},
        watch: {},
        methods: {
          getBasicConfig:function () {
            //
            Vue.api.getBasicConfig({
              ...Vue.tools.sessionInfo(),
              type:'CommonSimuRuleInfo',
            }).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.ruleData=data.CommonSimuRuleInfo[0];
                console.log('ruleData:',this.ruleData);
              }else{

              }
            });
            //
            Vue.api.getBasicConfig({
              ...Vue.tools.sessionInfo(),
              type:'CommonFightRuleInfo',
            }).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.pkRuleData=data.CommonFightRuleInfo[0];
                console.log('pkRuleData:',this.pkRuleData);
              }else{

              }
            });
          },
        },

        created: function () {
        },
        mounted: function () {
          this.getBasicConfig();
        },

    };
</script>
