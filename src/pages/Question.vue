<!--答题-->
<template>
    <div class="cm-full-page cm-page-bg question" :class="{'practice-type':pageType=='practice','pk':pageType=='pk'}">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="timer" v-if="pageType!='practice'">{{this.expiretime-this.timeCounter}}</div>
          <div class="type-info" v-if="pageType=='practice'">
            <div class="title">
              <span class="cm-btn switch-btn last-btn" v-if="curIndex>0" @click="lastPractice()">上一题</span>
              当前题库：{{$route.params.practiceType}}
              <span class="cm-btn switch-btn next-btn" v-if="curIndex<questionList.length-1" @click="nextPractice()">下一题</span>
            </div>
            <div class="link">上次答题序号：<span v-if="(historyIndex+1)">{{historyIndex+1}}题</span><div class="link-box"><input type="number" v-model="indexKeyword" placeholder="序号" maxlength="5"><span @click="search()">Go</span></div></div>
          </div>
          <div class="question-item">
            <div class="item-hd">
              <span class="serial">{{curIndex+1}}.</span>{{curItem.content}}
            </div>
            <div class="item-bd">
              <div class="answer-item" @click="selectAnswer('A')" :class="{'right':(selectedAnswer=='A'||showAnswer)&&curItem.answer=='A','wrong':selectedAnswer=='A'&&curItem.answer!='A'}">
                <span class="index">A.</span>
                <span class="text">{{curItem.itema}}</span>
                <i class="icon wrong-icon"></i>
                <i class="icon right-icon"></i>
              </div>
              <div class="answer-item" @click="selectAnswer('B')"  :class="{'right':(selectedAnswer=='B'||showAnswer)&&curItem.answer=='B','wrong':selectedAnswer=='B'&&curItem.answer!='B'}">
                <span class="index">B.</span>
                <span class="text">{{curItem.itemb}}</span>
                <i class="icon wrong-icon"></i>
                <i class="icon right-icon"></i>
              </div>
              <div class="answer-item" @click="selectAnswer('C')"  :class="{'right':(selectedAnswer=='C'||showAnswer)&&curItem.answer=='C','wrong':selectedAnswer=='C'&&curItem.answer!='C'}">
                <span class="index">C.</span>
                <span class="text">{{curItem.itemc}}</span>
                <i class="icon wrong-icon"></i>
                <i class="icon right-icon"></i>
              </div>
              <div class="answer-item" @click="selectAnswer('D')"  :class="{'right':(selectedAnswer=='D'||showAnswer)&&curItem.answer=='D','wrong':selectedAnswer=='D'&&curItem.answer!='D'}">
                <span class="index">D.</span>
                <span class="text">{{curItem.itemd}}</span>
                <i class="icon wrong-icon"></i>
                <i class="icon right-icon"></i>
              </div>
            </div>
          </div>
          <div class="footer-wrap">
            <i class="icon footer-icon"></i>
          </div>
        </div>
      </div>

      <div class="wrong-modal" v-if="wrongModalFlag&&curItem.answer">
        <div class="mask"></div>
        <div class="modal-content">
          <div class="modal-header">
            <p class="title">回答错误</p>
            <span class="cm-btn close-btn" @click="wrongModalFlag=false"><i class="icon close-icon"></i></span>
          </div>
          <div class="modal-body">
            <div class="index"><span>{{curItem.answer}}</span></div>
            <div class="answer-text">正确答案：{{curItem['item'+curItem.answer.toLowerCase()]}}</div>
            <div class="desc" v-if="curItem.ansexp">
              <span class="field">解析：</span>
              <span class="value">{{curItem.ansexp}}</span>
            </div>
            <div class="btn-wrap">
              <div class="cm-btn cm-page-btn" @click="nextPractice()">下一题</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .question{
    padding-top: 2.4rem;
    padding-bottom: 0.2rem;
    .content-panel{
     /* position: fixed;
      left: 0rem;
      bottom: 0.28rem;*/
      width: 100%;
     /* height: 80%;*/
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
    .type-info{
      padding: 0.4rem;
      border-bottom: 1px solid #e5e5e5;
      text-align: center;
      .title{
        position: relative;
        font-size: 0.36rem;
        color: #4c4c4c;
      }
      .switch-btn{
        position: absolute;
        top:0rem;
        display: inline-block;
        border: 1px solid #ef0719;
        color: #ef0719;
        padding: 0.08rem 0.1rem;
        font-size: 0.24rem;
        border-radius: 0.1rem;
      }
      .last-btn{
        left: 0rem;
      }
      .next-btn{
        right: 0rem;
      }
      .link{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.2rem;
        font-size: 0.28rem;
        color: #4c4c4c;
        .link-box{
          display: inline-block;
          overflow: hidden;
          input{
            float: left;
            display: inline-block;
            font-size: 0.26rem;
            border:1px solid #ef0719;
            border-right: none;
            height: 0.6rem;
            width: 1.2rem;
            line-height: 0.6rem;
            padding: 0rem 0.2rem;
            border-top-left-radius: 0.1rem;
            border-bottom-left-radius: 0.1rem;
            margin-left: 0.3rem;
            outline: none;
            color: #333;
          }
          span{
            float: left;
            display: inline-block;
            font-size: 0.26rem;
            color: #fff;
            border:1px solid #ef0719;
            background: #ef0719;
            height: 0.6rem;
            width: 0.8rem;
            line-height: 0.6rem;
            padding: 0rem 0.2rem;
            border-top-right-radius: 0.1rem;
            border-bottom-right-radius: 0.1rem;
            margin-left: -0.08rem;
          }
        }
      }
    }
    .question-item{
      position: relative;
      padding: 1.2rem 0.44rem 0rem 0.44rem;
      min-height: 80%;
      overflow: auto;
      .item-hd{
        font-size: 0.36rem;
        color: #4c4c4c;
        .serial{
          font-size: 0.42rem;
          padding-right: 0.08rem;
        }
      }
      .item-bd{
        padding: 0.3rem 0rem;
      /*  height: 6.2rem;
        overflow: auto;*/
      }
    }
    .answer-item{
      display: flex;
      align-items: center;
      padding: 0.16rem 0.4rem;
      width: 100%;
      min-height: 0.90rem;
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
      .text{
        width: 4.4rem;
        word-break: break-all;
        font-size: 0.3rem;
      }
      .icon{
        position: relative;
        left: 0.2rem;
        display: none;
        margin-left: auto;
      }
      .wrong-icon{
        background: url("../images/common/wrong-icon.png") no-repeat;
        width: 0.6rem;
        height: 0.6rem;
        background-size: 100% 100%;
      }
      .right-icon{
        background: url("../images/common/right-icon.png") no-repeat;
        width: 0.6rem;
        height: 0.6rem;
        background-size: 100% 100%;
      }
      &.right{
        color: #fff;
        background: #25cb4b;
        border: 1px solid rgba(37,203,75,0.18);
        box-shadow: 0px 2px 5px rgba(37,203,75,0.3);
        .right-icon{
          display: inline-block;
        }
      }
      &.wrong{
        color: #fff;
        background: #e60012;
        border: 1px solid  rgba(230,0,18,0.3);
        box-shadow: 0px 2px 5px  rgba(230,0,18,0.3);
        .wrong-icon{
          display: inline-block;
        }
      }
      &:active{
        transform: scale(0.98);
      }
    }
    .footer-wrap{
      margin-top: 1rem;
      padding: 0.2rem 0rem;
      width: 100%;
      text-align: center;
    }
    &.practice-type{
      padding-top: 2rem;
      .question-item{
        padding-top: 0.3rem;
      }
    }
    &.pk{
      .answer-item{
        &.right{
          color: #fff;
          background: #f3c50b;
          box-shadow: 0px 2px 5px rgba(243, 197, 11,0.2);
          border: 1px solid #f3c50b;
          .right-icon{
            display: none;
          }
        }
        &.wrong{
          color: #fff;
          background: #f3c50b;
          box-shadow: 0px 2px 5px  rgba(243, 197, 11,0.2);
          border: 1px solid #f3c50b;
          .wrong-icon{
            display: none;
          }
        }
      }
    }
  }
  .wrong-modal{
    display: flex;
    position: fixed;
    z-index: 200;
    width: 100%;
    height: 100%;
    top:0rem;
    left: 0rem;
    align-items: center;
    justify-content: center;
    .mask{
      position: absolute;
      z-index: 201;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      top:0rem;
      left: 0rem;
    }
    .modal-content{
      position: relative;
      z-index: 202;
      width: 90%;
      margin: auto;
      background: #fff;
      border-radius: 0.1rem;
      overflow: hidden;
    }
    .modal-header{
      position: relative;
      padding: 0.4rem;
      background: #e60012;
      .title{
        color: #fff;
        font-size: 0.36rem;
        text-align: center;
      }
      .close-btn{
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        position: absolute;
        right: 0.3rem;
        top:0.2rem;
        .icon{
          width: 100%;
          height: 100%;
        }
      }
    }
    .modal-body{
      padding: 0.4rem 0.1rem 0.3rem 0.1rem;
      text-align: center;
      .index{
        text-align: center;
        >span{
          display: inline-block;
          width: 0.7rem;
          height: 0.7rem;
          text-align: center;
          line-height: 0.7rem;
          font-size: 0.48rem;
          color: #e60012;
          border: 1px solid #e60012;
          border-radius: 50%;
        }
      }
      .answer-text{
        font-size: 0.3rem;
        color: #333;
        padding: 0.4rem 0rem;
      }
      .desc{
        display: flex;
        font-size: 0.28rem;
        color: #666;
        padding: 0rem 0.4rem 0.4rem 0.4rem;
        .field{
          flex: 1;
        }
        .value{
          flex: 5;
          text-align: left;
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
              pageType:'',//页面类型，single:单独答题,pk:'对战',practice:'练习'
              index:0,
              curIndex:0,
              curItem:{},
              questionList:[],
              expiretime:0,
              timeCounter:0,
              selectedAnswer:null,
              interval:null,
              showAnswer:false,
              fightid:null,
              pkId:null,
              timeCount:0,

              indexKeyword:null,
              wrongModalFlag:false,

              historyIndex:0,
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

                if(data.pkStatus=='0'){
                  if(data.who!='当前是邀战人'){
                    this.getInvitedQuestionList();
                  }else{
                    this.$router.push({name:'end',params:{pageType:'pk',pkId:this.pkId}});
                  }
                }else if(data.pkStatus=='10'){
                  this.$router.push({name:'end',params:{pageType:'pk',pkId:this.pkId}});
                }else if(data.pkStatus=='20'){
                  this.$router.push({name:'result',params:{pkId:this.pkId}});
                }else{

                }

              }else{

              }
            });
          },
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
          getPracticeQuestionList:function () {
            Vue.api.getPracticeQuestionList({...Vue.tools.sessionInfo(),type:this.$route.params.practiceType}).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.questionList=data;
             /*   this.questionList=data.splice(0,3);*/
                console.log('this.questionList:',this.questionList);
                this.readPracticeQuestion(this.index);
              }else{

              }
            });
          },
          readQuestion:function (index) {
            clearInterval(this.interval);
            if(index<this.questionList.length){
              this.selectedAnswer=null;
              this.showAnswer=false;
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
              if(this.pageType=='single'){
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
                      this.$router.push({name:'end',params:{pageType:'pk',pkId:this.fightid}});
                    }else{

                    }
                  });
                }else{
                  Vue.api.submitInvitedAnswer(params).then((resp)=>{
                    if(resp.status=='success'){
                      this.$router.push({name:'result',params:{pkId:this.pkId}});
                    }else{

                    }
                  });
                }
              }
            }
          },
          readPracticeQuestion:function (index) {
            this.index=index;
            if(index<this.questionList.length){
              this.selectedAnswer=null;
              this.showAnswer=false;
              this.timeCounter=0;
              this.curIndex=index;
              this.curItem=this.questionList[index];
              //
              localStorage.setItem('practiceHistory_'+this.$route.params.practiceType,this.index);

            }else{
              this.alert({
                title:'温馨提示',
                html:'已做完该题库',
                yes:'返回',
                ok:()=>{
                  this.$router.go(-1);
                }
              });
            }
          },
          search:function () {
            if(!regex.pInt.test(this.indexKeyword)){
              this.operationFeedback({type:'warn',text:regex.pIntAlert});
              return;
            }
            let index=this.indexKeyword-1;
            if(index<this.questionList.length){
              this.readPracticeQuestion(index);
            }else{
              this.operationFeedback({type:'warn',text:'输入的序号超出题库范围'});
            }
          },
          selectAnswer:function (index) {
            this.selectedAnswer=index;
            this.curItem.userAnswer=index;
            if(this.pageType=='practice'){
              if(this.selectedAnswer==this.curItem.answer){
                setTimeout(()=>{
                  this.index++;
                  this.readPracticeQuestion(this.index);
                },1000)
              }else{
                this.wrongModalFlag=true;
              }
            }else{
              if(this.pageType=='single'){
                this.showAnswer=true;
              }
              setTimeout(()=>{
                this.index++;
                this.readQuestion(this.index);
              },1000)
            }
          },
          lastPractice:function () {
            this.selectedAnswer=null;
            let index=this.curIndex-1;
            this.readPracticeQuestion(index);
            this.wrongModalFlag=false;
          },
          nextPractice:function () {
            this.selectedAnswer=null;
            let index=this.curIndex+1;
            this.readPracticeQuestion(index);
            this.wrongModalFlag=false;
          },
          initTimer:function () {
            this.interval=setInterval(()=>{
              if(this.expiretime-this.timeCounter==0){
                clearInterval(this.interval);
                this.index++;
                if(this.pageType=='single'){
                  this.showAnswer=true;
                  setTimeout(()=>{
                    this.readQuestion(this.index);
                  },2000);
                }else{
                  this.readQuestion(this.index);
                }
              }else{
                this.timeCounter++;
              }
            },1000)
          }
        },

        created: function () {
        },
        mounted: function () {
          this.account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          this.pageType=this.$route.params.pageType;
          this.pkId=this.$route.params.pkId;
          console.log('this.pkId:',typeof this.pkId);
          if(this.pkId&&this.pkId!=-1){
            this.pkId=this.pkId.split('?')[0];
          }
          if(this.pageType=='single'){
            this.getQuestionList();
          }else if(this.pageType=='pk'&&!this.pkId){
            this.getInviterQuestionList();
          }else if(this.pageType=='pk'&&this.pkId){
            this.getPkResult();
          }else if(this.pageType=='practice'){
            this.getPracticeQuestionList();
            this.historyIndex=localStorage.getItem('practiceHistory_'+this.$route.params.practiceType,this.index);
            if(this.historyIndex!=''){
              this.historyIndex=parseInt(this.historyIndex);
            }
          }

          //隐藏微信分享选项
          wx.hideMenuItems({
            menuList: ["menuItem:share:appMessage","menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook"] // 要显示的菜单项，所有menu项见附录3
          });

        },
      beforeRouteLeave (to, from, next) {
        clearInterval(this.interval);
        next();
      },

    };
</script>
