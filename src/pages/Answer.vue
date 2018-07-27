<!--答案-->
<template>
    <div class="cm-full-page cm-page-bg answer-page">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <p class="title">答题结果</p>
          <div class="question-item" v-for="(item,index) in questionList">
            <div class="item-hd">
              {{index+1}}.&nbsp;{{item.content}}
            </div>
            <div class="item-bd">
              <p :class="{'wrong':item.userAnswer!=item.answer}">你的答案：{{item['item'+item.userAnswer.toLowerCase()]}}</p>
              <p class="right">正确答案：{{item['item'+item.answer.toLowerCase()]}}</p>
            </div>
          </div>
          <div class="btn-list">
            <div class="cm-btn cm-page-btn" @click="$router.go(-1)">返回</div>
          </div>
          <div style="text-align: center;padding: 0.4rem 0rem 0.2rem 0rem;">
            <i class="icon footer-icon"></i>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .answer-page{
    padding: 2rem 0rem 0.28rem 0rem;
    overflow: auto;
    .content-panel{
      width: 100%;
      padding: 0rem 0.28rem;
      .panel-bd{
        position: relative;
        background: #fff;
        width: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 15px rgba(117,4,13,0.19);
        .title{
          font-size: 0.36rem;
          color: #4c4c4c;
          text-align: center;
          padding: 0.4rem 0rem;
        }
      }
    }
    .question-item{
      position: relative;
      padding: 0rem 0.44rem;
      .item-hd{
        font-size: 0.36rem;
        color: #4c4c4c;
      }
      .item-bd{
        padding: 0.1rem 0.2rem 0.2rem 0.2rem;
        border-bottom: 1px solid #e5e5e5;
        p{
          font-size: 0.28rem;
          color: #666;
          &.right{
            color: #25cb4b;
          }
          &.wrong{
            color: #e60012;
          }
          &+p{
            padding-top: 0.1rem;
          }
        }
      }
      &+.question-item{
        margin-top: 0.3rem;
      }
    }
    .btn-list{
      margin-top: 0.6rem;
      text-align: center;
      padding: 0rem 0.28rem;
      .cm-btn{
        width: 100%;
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
              pkId:null,
              questionList:[],
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {

        },
        mounted: function () {
          this.account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          this.pkId=this.$route.params.pkId;
          let pkQuestion=JSON.parse(localStorage.getItem('pkQuestion'));
          this.questionList=pkQuestion.find((item)=>{
            return item.accountCode==this.account.code&&item.pkId==this.pkId;
          }).questionList;
          console.log('this.questionList:',this.questionList);
        },

    };
</script>
