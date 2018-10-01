<!--登录-->
<template>
    <div class="login">
      <i class="icon logo-black-icon"></i>
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
            <div class="tips-text-wrap" style="display:block;width: 100%;height: 100%;padding: 0rem 0.4rem;width: 100%;" v-if="item.type=='html'">
              <div style="display: inline-block" v-html="item.html" v-for="n in 20"></div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination" v-if="swiperList.length>1"></div>

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
  .tips-view-win{
    position: relative;
    display: inline-block;
    width: 100%;
    height: 0.4rem;
    overflow: hidden;
  }
  @keyframes gundong{
    0%{ left:0; }
    100%{ left:-2000px; }
  }
  .tips-text-wrap{
    display: flex;
    height: 100%;
    position:absolute;
    align-items: center;
    animation:gundong 70s linear infinite;
    word-break: keep-all;
    white-space: nowrap;
  }
  /*.tips-text-wrap:hover{
      animation-play-state:paused;
    }*/
  .tips-text-wrap span{
    padding-right: 0.2rem;
    border:1px solid #fff;
    transition:all 0.5s;
  }
  .tips-text-wrap span:hover{

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
            //活动时间判断
            let deadline=new Date('2018/10/1 00:00:00');
            if(new Date().getTime()>=deadline){
              this.operationFeedback({type:'warn',text:'活动已经截止'});
              return;
            }
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
              html:'<div style="text-align: center;padding: 0.2rem 0.4rem 0rem 0.4rem;font-size: 0.28rem;color: #666;line-height: 0.44rem;"><p>员工登录时请输入8位数员工编号；电机工厂员工请输入4位数员工编号；日立楼宇、杭工司、杭营司员工请直接输入字母和数字，中间不加任何符号。</p></div>'
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
