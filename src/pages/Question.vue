<!--答题-->
<template>
    <div class="cm-full-page cm-page-bg question">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="timer">10</div>
          <div class="question-item">
            <div class="item-hd">
              01.日立电梯成立的年份是？
            </div>
            <div class="item-bd">
              <div class="answer-item right">
                <span class="index">A.</span>
                <span class="text">1995</span>
              </div>
              <div class="answer-item wrong">
                <span class="index">A.</span>
                <span class="text">1995</span>
              </div>
              <div class="answer-item">
                <span class="index">A.</span>
                <span class="text">1995</span>
              </div>
              <div class="answer-item">
                <span class="index">A.</span>
                <span class="text">1995</span>
              </div>
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
  .question{
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
      }
    }
    .timer{
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0rem;
      right: 0rem;
      top:-1rem;
      margin: auto;
      background: url("../images/common/time-bg.png") no-repeat;
      width: 2.01rem;
      height: 2.01rem;
      background-size: 100% 100%;
      font-size: 0.52rem;
      color: #fff;
    }
    .question-item{
      position: relative;
      top:1.6rem;
      padding: 0rem 0.44rem;
      .item-hd{
        font-size: 0.36rem;
        color: #4c4c4c;
      }
      .item-bd{
        padding-top: 0.8rem;
      }
    }
    .answer-item{
      display: flex;
      align-items: center;
      padding: 0rem 0.4rem;
      background: url("../images/common/question-normal.png") no-repeat;
      /*width: 6.2rem;*/
      width: 100%;
      height: 1.04rem;
      background-size: 100% 100%;
      font-size: 0.32rem;
      color: #4c4c4c;
      .index{
        padding-right: 0.08rem;
      }
      &+.answer-item{
        margin-top: 0.3rem;
      }
      &.right{
        background: url("../images/common/question-right.png") no-repeat;
        background-size: 100% 100%;
        color: #25cb4b;
      }
      &.wrong{
        background: url("../images/common/question-wrong.png") no-repeat;
        background-size: 100% 100%;
        color: #e60012;
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
              pateType:'',//页面类型，single:单独答题,pk:'对战'
            }
        },
        computed: {},
        watch: {},
        methods: {
          getQuestionList:function () {
            Vue.api.getQuestionList({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('data:',data);
              }else{

              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          this.pageType=this.$route.params.pageType;
          console.log('this.pageType:',this.pageType);
          if(this.pageType=='single'){
            this.getQuestionList();
          }
        },

    };
</script>
