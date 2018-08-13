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
          <input type="text" v-model="number" placeholder="请输入工号">
        </div>
      </div>
      <div class="btn-wrap">
        <div class="cm-btn cm-page-btn" @click="login()">开始竞赛</div>
      </div>
      <div class="swiper-panel">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in swiperList" :key="item.id">
            <a style="display:block;width: 100%;height: 100%" v-if="item.type=='imgLink'" v-bind:href="item.url" :style="{background: 'url('+item.imageUrl+') no-repeat center',backgroundSize: 'cover'}"></a>
            <div style="display:block;width: 100%;height: 100%" v-if="item.type=='html'" v-html="item.html"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>

        </swiper>
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
      margin-top: 0.6rem;
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
  .swiper-panel{
    margin-top: 0.2rem;
    height: 2rem;
  }
  .swiper-pagination{
    .swiper-pagination-bullet{
      margin: 0rem 0.09rem;
      width: 0.12rem;
      height: 0.12rem;
      background: rgba(255,255,255,0.7);
      &.swiper-pagination-bullet-active{
       background: #e60012;
      }
    }
  }
</style>

<script>
    import Vue from 'vue'
    import  { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        components: {
          swiper,
          swiperSlide
        },
        data: function () {
            return {
              number:'',
              username:'',
              swiperOption: {
                autoplay:true,
                pagination: {
                  el: '.swiper-pagination'
                }
              },
              swiperList:[],
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
                Vue.cookie.set('username',this.username);

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
          //读取缓存的账号密码
          let username=Vue.cookie.get('username');
          let number=Vue.cookie.get('number');
          if(number){
            this.number=number;
          }
          if(username){
            this.username=username;
          }

          //初始化轮播数据
          this.swiperList=[
            {
              type:'html',
              html:'<div style="text-align: center;padding-top: 0.2rem;font-size: 0.28rem;color: #666;"><p>员工登录时请使用8位工号</p><p style="padding-top: 0.1rem;">（如姓名：张三，工号：00035412）</p></div>'
            },
            /*{
              type:'imgLink',
              url:'',
              imageUrl:'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=df9b909746ed2e73f8e9812eb700a16d/08f790529822720ee5129de977cb0a46f31fabc1.jpg',
            }*/
            ];

        },

    };
</script>
