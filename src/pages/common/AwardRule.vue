<!--奖励规则-->
<template>
   <div class="award-rule">
    <!-- <textarea  cols="30" rows="10">{{ruleContent}}</textarea>
     <textarea  cols="30" rows="10">{{ruleContent}}</textarea>-->
     <div class="block">
     <!--  <div class="block-hd">美文分享奖励规则</div>-->
       <div class="block-bd">
          <pre>{{ruleContent.Share_Article_Rule}}</pre>
       </div>
     </div>
     <div class="block">
       <!--<div class="block-hd">推荐买房奖励规则</div>-->
       <div class="block-bd">
         <pre>{{ruleContent.Recom_Success_Score}}</pre>
       </div>
     </div>
   </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .award-rule{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0.5rem 0.6rem;
  }
  textarea{
    width: 100%;
    height: 100%;
    line-height: 0.48rem;
    font-size: 0.3rem;
    resize: none;
    border: none;
    pointer-events: none;
  }
  .block{
    .block-hd{
      padding: 0.1rem 0rem;
      font-size: 0.32rem;
      color: #333;
    }
    &+.block{
      margin-top: 0.4rem;
    }
  }
  pre{
    font-size: 0.28rem;
    color: #666;
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB', 'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
    white-space: pre-wrap; /*css-3*/
    white-space: -moz-pre-wrap; /*Mozilla,since1999*/
    white-space: -pre-wrap; /*Opera4-6*/
    white-space: -o-pre-wrap; /*Opera7*/
    word-wrap: break-word; /*InternetExplorer5.5+*/
    line-height: 0.44rem;
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              ruleContent:{},
              type:null,
              shareAwardRule:null,
              recommendAwardRule:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getAwardRule:function () {
            Vue.api.getAwardRule({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.ruleContent=JSON.parse(resp.message);
              }
            })
          },
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.type=this.$route.params.type;
          this.getAwardRule();
        /*
          if(this.type=='shareAward'){
            /!*获取美文分享规则*!/
            this.getAwardRule();
          }else if(this.type=='recommendAward'){
            //获取推荐奖励规则
            this.getRecommendAwardRule();
          }*/
        },
        route: {
           /* data: function(transition) {
                return Vue.utils.getCustomer().then(function (data) {
                    {
                        return {}
                    }
                });


            },
            waitForData: true,*/
        }

    };
</script>
