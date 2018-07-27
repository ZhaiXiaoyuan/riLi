<!--规则-->
<template>
    <div class="cm-full-page cm-page-bg rule">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="list-block">
            <div class="block-hd">竞赛规则</div>
            <div class="block-bd">
              <div v-html="this.ruleData.value"></div>
            </div>
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
  .rule{
    .content-panel{
      position: fixed;
      left: 0rem;
      bottom: 0.28rem;
      width: 100%;
      height: 78%;
      padding: 0rem 0.28rem;
      .panel-bd{
        position: relative;
        background: #fff;
        width: 100%;
        height: 100%;
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
        >div{
          padding: 0.2rem 0rem;
          font-size: 0.26rem;
          color: #666;
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
              ruleData:{},
            }
        },
        computed: {},
        watch: {},
        methods: {
          getBasicConfig:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              type:'CommonSimuRuleInfo,CommonFightRuleInfo',
            }
            Vue.api.getBasicConfig(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.ruleData=data.CommonSimuRuleInfo[0];
                console.log('ruleData:',this.ruleData);
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
