<!--答题-->
<template>
    <div class="cm-full-page cm-page-bg question">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="timer">{{this.expiretime-this.timeCounter}}</div>
          <div class="question-item">
            <div class="item-hd">
              {{curIndex<10?'0'+(curIndex+1):curIndex+1}}.{{curItem.content}}
            </div>
            <div class="item-bd">
              <div class="answer-item" @click="selectAnswer('A')" :class="{'right':selectedAnswer=='A'&&curItem.answer=='A','wrong':selectedAnswer=='A'&&curItem.answer!='A'}">
                <span class="index">A.</span>
                <span class="text">{{curItem.itema}}</span>
              </div>
              <div class="answer-item" @click="selectAnswer('B')"  :class="{'right':selectedAnswer=='B'&&curItem.answer=='B','wrong':selectedAnswer=='B'&&curItem.answer!='B'}">
                <span class="index">B.</span>
                <span class="text">{{curItem.itemb}}</span>
              </div>
              <div class="answer-item" @click="selectAnswer('C')"  :class="{'right':selectedAnswer=='C'&&curItem.answer=='C','wrong':selectedAnswer=='C'&&curItem.answer!='C'}">
                <span class="index">C.</span>
                <span class="text">{{curItem.itemc}}</span>
              </div>
              <div class="answer-item" @click="selectAnswer('D')"  :class="{'right':selectedAnswer=='D'&&curItem.answer=='D','wrong':selectedAnswer=='D'&&curItem.answer!='D'}">
                <span class="index">D.</span>
                <span class="text">{{curItem.itemd}}</span>
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
        box-shadow: 0px 5px 15px rgba(117,4,13,0.19);
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
      height: 0.90rem;
      background-size: 100% 100%;
      font-size: 0.32rem;
      color: #4c4c4c;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.2);
      border-radius: 0.45rem;
      border: 1px solid #e5e5e5;
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
        border: none;
        border-top: 1px solid rgba(37,203,75,0.18);
        box-shadow: none;
      }
      &.wrong{
        background: url("../images/common/question-wrong.png") no-repeat;
        background-size: 100% 100%;
        color: #e60012;
        border: none;
        border-top: 1px solid rgba(230,0,18,0.18);
        box-shadow: none;
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
              pateType:'',//页面类型，single:单独答题,pk:'对战',
              index:0,
              curIndex:0,
              curItem:{},
              questionList:[],
              expiretime:0,
              timeCounter:0,
              selectedAnswer:null,
              interval:null,

              fightid:null,
              pkId:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getQuestionList:function () {
            Vue.api.getQuestionList({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.questionList=data.questions;
                this.expiretime=data.expiretime;
                this.simuinfoid=data.simuinfoid;
                //
                this.readQuestion(this.index);
              }else{

              }
            });
          },
          getInviterQuestionList:function(){
            Vue.api.getInviterQuestionList({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('data:',data);
                this.questionList=data.questions;
                this.expiretime=data.expiretime;
                this.fightid=data.fightid;
                //
                this.readQuestion(this.index);
              }else{

              }
            });
          },
          getInvitedQuestionList:function(){
            Vue.api.getInvitedQuestionList({...Vue.tools.sessionInfo(),fightinfoid:this.pkId}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                console.log('data:',data);
                this.questionList=data.questions;
                this.expiretime=data.expiretime;
                this.fightid=data.fightid;
                //
                this.readQuestion(this.index);
              }else{

              }
            });
          },
          readQuestion:function (index) {
            clearInterval(this.interval);
            if(index<this.questionList.length){
              this.selectedAnswer=null;
              this.timeCounter=0;
              this.curIndex=index;
              this.curItem=this.questionList[index];
              if(this.expiretime){
                this.initTimer();
              }
            }else{
              let answerArr=[];
              this.questionList.forEach((item,i)=>{
                answerArr.push(item.userAnswer?item.userAnswer:'-1');
              })
              let params={
                ...Vue.tools.sessionInfo(),
                answers:answerArr.join(',')
              }
              if(this.pageType=='personal'){
                params.simuinfoid=this.simuinfoid;
                Vue.api.submitAnswer(params).then((resp)=>{
                  if(resp.status=='success'){
                    let data=JSON.parse(resp.message);
                    Vue.cookie.set('scoreData',resp.message);
                    this.$router.push({name:'end',params:{pageType:'single'}});
                  }else{

                  }
                });
              }else if(this.pageType=='pk'){
                params.fightinfoid=this.fightid;
                if(!this.pkId){
                  Vue.api.submitInviterAnswer(params).then((resp)=>{
                    if(resp.status=='success'){
                     /* this.$router.push({name:'end',params:{pageType:'pk'}});*/
                    }else{

                    }
                  });
                }else{
                  Vue.api.submitInvitedAnswer(params).then((resp)=>{
                    if(resp.status=='success'){
                      /* this.$router.push({name:'end',params:{pageType:'pk'}});*/
                    }else{

                    }
                  });
                }
              }
            }
          },
          selectAnswer:function (index) {
            this.selectedAnswer=index;
            this.curItem.userAnswer=index;
            if(this.selectedAnswer==this.curItem.answer){

            }else{

            }
            setTimeout(()=>{
              this.index++;
              this.readQuestion(this.index);
            },1000)
          },
          initTimer:function () {
            this.interval=setInterval(()=>{
              if(this.expiretime-this.timeCounter==0){
                clearInterval(this.interval);
                this.index++;
                this.readQuestion(this.index);
              }else{
                this.timeCounter++;
              }
            },1000)
          }
        },

        created: function () {
        },
        mounted: function () {
          this.pageType=this.$route.params.pageType;
          this.pkId=this.$route.params.pkId;
          if(this.pageType=='single'){
            this.getQuestionList();
          }else if(this.pageType=='pk'&&!this.pkId){
            this.getInviterQuestionList();
          }else{
            this.getInvitedQuestionList();
          }
        },

    };
</script>
