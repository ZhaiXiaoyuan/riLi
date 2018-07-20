<!--首页-->
<template>
    <div class="home">
      <div class="banner-panel">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in bannerList" :key="item.id">
            <a style="display:block;width: 100%;height: 100%" v-bind:href="item.url" :style="{background: 'url('+item.imageUrl+') no-repeat center',backgroundSize: 'cover'}"></a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>

        </swiper>
      </div>
      <div class="panel">
        <div class="panel-bd">
          <div class="entrance-list">
            <router-link :to="{ name: 'survey', params: {}}" class="item">
              <i class="icon building-icon"></i>
              <p class="text">楼盘风采</p>
            </router-link>
            <router-link :to="{ name: 'consultant', params: {}}" class="item">
              <i class="icon consultant-icon"></i>
              <p class="text">置业顾问</p>
            </router-link>
            <a class="item" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5MjQ0NTI1NA==&scene=110#wechat_redirect">
              <i class="icon wechat-icon"></i>
              <p class="text">关注公众号</p>
            </a>
          </div>
        </div>
      </div>
      <div class="panel">
        <router-link :to="{ name: 'awardRule', params: {type:'shareAward'}}" class="panel-hd arrows-right">
          <span class="title">
            <i class="icon earn-font-icon"></i>
            积分
          </span>
          <span class="link">奖励规则</span>
        </router-link >
        <div class="panel-bd">
          <div class="entrance-list">
            <div  class="item item-sm" v-if="!isFull" @click="checkUserInfo(()=>{$router.push({ name: 'completeData', params: {}})},true)">
              <span class="icon-wrap"><i class="icon book-icon"></i></span>
              <p class="text">完善资料</p>
            </div>
            <div class="item item-sm" :class="{'cm-disabled':!canSign}" v-if="isFull"  @click="checkUserInfo(()=>{signIn()})">
              <span class="icon-wrap"><i class="icon sign-icon"></i></span>
              <p class="text">{{canSign?'每天签到':'已签到'}}</p>
            </div>
            <div class="cm-btn item item-sm"  @click="checkUserInfo(()=>{inviteModal()})">
              <span class="icon-wrap"> <i class="icon add-member-icon"></i></span>
              <p class="text">邀请好友</p>
            </div>
            <div class="item item-sm" @click="checkUserInfo(()=>{$router.push({ name: 'recommend', params: {}})})">
              <span class="icon-wrap"><i class="icon praise-icon"></i></span>
              <p class="text">推荐买房</p>
            </div>
            <router-link :to="{ name: 'articleList', params: {}}"  class="item item-sm">
              <span class="icon-wrap"> <i class="icon share-icon"></i></span>
              <span class="count" v-if="newArticleCount">{{newArticleCount}}</span>
              <p class="text">分享美文</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="panel">
        <router-link :to="{ name: 'giftList', params: {}}"  class="panel-hd arrows-right">
          <span class="title">
            <i class="icon use-font-icon"></i>
            积分
          </span>
          <span class="link">更多</span>
        </router-link>
        <div class="panel-bd">
          <div class="entry-list">
            <router-link :to="{ name: 'giftList', params: {}}"  class="entry ticket-entry">
              <p class="name">购房券</p>
              <img :src="housePurchaseTicketImg" alt="">
              <i class="icon label-icon"></i>
            </router-link>
            <router-link :to="{ name: 'giftList', params: {}}"  class="entry ticket-entry">
              <p class="name">物业券</p>
              <img :src="propertyTicketImg" alt="">
              <i class="icon label-icon"></i>
            </router-link>
          </div>
          <div class="gift-entry-list">
            <div v-for="(item,index) in giftList" class="entry gift-entry">
              <router-link :to="{ name: 'giftDetail', params: {id:item.id}}">
                <p class="name tips-view-win" v-if="item.name.length<=4">
                  {{item.name}}
                </p>
                <p class="name tips-view-win" v-if="item.name.length>4">
                  <span class="tips-text-wrap">
                    <span v-for="n in 100">{{item.name}}</span>
                  </span>
                </p>
                <p class="cost">{{item.score}}积分</p>
                <img :src="item.image">
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <nav-bar></nav-bar>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
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
              swiperOption: {
                autoplay:true,
                pagination: {
                  el: '.swiper-pagination'
                }
              },
              bannerList:[],
              housePurchaseTicketImg:require('../images/home/hall-example.jpg'),
              propertyTicketImg:require('../images/home/service-example.jpg'),
              isFull:false,//true:已完善资料，false:未完善资料
              canSign:false,//true:可签到，false:已签到
              giftList:[],
              newArticleCount:0,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getGiftList:function () {
            let pager={
              pageSize:4,
              pageNumber:1
            }
            let params={
              ...Vue.tools.sessionInfo(),
              ...pager
            }
            Vue.api.getGiftList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.giftList=data.result;
              }
            })
          },
          signIn:function () {
            Vue.signInModal({
              callback:()=>{
                this.canSign=false;
              }
            });
          },
          getNewArticleCount:function () {
            let params={
              ...Vue.tools.sessionInfo(),
            }
            Vue.api.getNewArticleCount(params).then((resp)=>{
              if(resp.status=='success'){
                this.newArticleCount=JSON.parse(resp.message);
              }
            })
          }
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.getGiftList();
          /**/
          this.getNewArticleCount();
        },
      beforeRouteEnter (to, from, next) {
        Vue.api.getHomeData({...Vue.tools.sessionInfo()}).then((resp)=>{
          if(resp.status=='success'){
            var data=JSON.parse(resp.message);
            next(vm =>{
              vm.bannerList=data.adves;
              vm.isFull=data.isFull?true:false;
              vm.canSign=data.canSign?true:false;
            });
          }else{
            next(vm =>{});
          }
        })
      },

    };
</script>
