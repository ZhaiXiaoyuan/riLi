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
              <div v-html="this.pkRuleData.label"></div>
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
          font-size: 0.32rem;
          color: #333;
          padding-bottom: 0.2rem;
        }
        >div{
          padding: 0.2rem 0rem;
          font-size: 0.26rem;
          color: #666;
        }
      }
    }
    .footer-wrap{
      padding: 0.4rem;
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
