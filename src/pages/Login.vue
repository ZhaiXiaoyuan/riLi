<!--登录-->
<template>
    <div class="login">
      <i class="icon logo-icon"></i>
      <div style="margin-top: 0.4rem">
        <i class="icon app-title-icon"></i>
      </div>
      <div class="form-panel">
        <div class="input-box">
          <div class="filed"><i class="icon account-icon"></i></div>
          <input type="text" v-model="username" placeholder="请输入姓名">
        </div>
        <div class="input-box">
          <div class="filed"><i class="icon pwd-icon"></i></div>
          <input type="password" v-model="number" placeholder="请输入工号">
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn cm-page-btn" @click="login()">开始竞赛</div>
      </div>
      <div class="cm-footer">
        <i class="icon footer-icon"></i>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  #app{
    width: 100%;
    height: 100%;
  }
  .login{
    position: relative;
    text-align: center;
    padding-top: 1.2rem;
    padding-bottom: 1.4rem;
    background: url("../images/common/excessive-page-bg.jpg") no-repeat;
    width: 100%;
    min-height: 100%;
    .form-panel{
      margin-top: 0.8rem;
    }
    .input-box{
      display: flex;
      align-items: center;
      text-align: left;
      background: url("../images/common/input-box-bg.png") no-repeat;
      width: 6.06rem;
      height: 1.04rem;
      background-size: 100% 100%;
      margin: 0rem auto;
      .filed{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.24rem;
        margin-left: 0.12rem;
      }
      input{
        width: 4.3rem;
        height: 0.8rem;
        border: none;
        outline: none;
        background: none;
        font-size: 0.32rem;
        padding: 0rem 0.2rem;
        -webkit-box-shadow: 0 0 0px 1000px white inset !important;
      }
      &.input-box{
        margin-top: 0.4rem;
      }
    }
    .btn-wrap{
      margin-top: 0.6rem;
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
              number:'',
              username:'',
            }
        },
        computed: {},
        watch: {},
        methods: {
          login:function () {
            if(!this.username){
              this.operationFeedback({type:'warn',text:'请输入姓名'});
              return;
            }
            if(!this.number){
              this.operationFeedback({type:'warn',text:'请输入工号'});
              return;
            }
            Vue.cookie.set('number',this.number);
            let params={
              ...Vue.tools.sessionInfo(),
              username:this.username,
              number:this.number,
            }
            let fb=this.operationFeedback({text:'登录中...'});
            Vue.api.login(params).then((resp)=>{
              if(resp.status=='success'){
                fb.setOptions({type:'complete',text:'登录成功'});
                Vue.cookie.set('account',resp.message);

                let toPkId=sessionStorage.getItem('toPkId');
                if(toPkId&&toPkId!='undefined'){
                  sessionStorage.setItem('toPkId','');
                  this.$router.push({name:'question',params:{pageType:'pk',pkId:toPkId}});
                }else{
                  this.$router.push({name:'center',params:{}});
                }
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {

        },

    };
</script>
