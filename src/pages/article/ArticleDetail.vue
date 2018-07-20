<!--美文详情-->
<template>
    <div class="article-detail">
      <div class="article-panel" v-if="article">
        <p class="title">{{article.title}}</p>
        <p class="time">{{article.deploytime.split('.')[0]|formatDate('yyyy年MM月dd日')}}</p>
        <div class="content-container" v-html="article.content"></div>
      </div>
      <div class="handle-btn"  @click="checkUserInfo(()=>{shareGuide()})">分享这篇好文给朋友</div>
      <router-link :to="{ name: 'home'}" class="home-btn"><i class="icon"></i></router-link>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  img{
    margin: 0.08rem 0rem;
    width: 100%;
    height: auto;
  }
  p{
    line-height: 0.4rem;
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              article:null,
              test:22,
            }
        },
        computed: {},
        watch: {

        },
        methods: {
          getArticleDetail:function () {
            let that=this;
            let params={
              ...Vue.tools.sessionInfo(),
              aid:this.$route.params.id
            }
            params.number=null;
            Vue.api.getArticleDetail(params).then((resp)=>{
              if(resp.status=='success'){
                this.article=JSON.parse(resp.message);
                document.title = that.article.title;
                let userInfo=sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):null;
                /*微信分享配置*/
                Vue.tools.shareConfig({
                  title: that.article.title,
                  desc:that.article.remark,
                  link: window.location.href,
                  imgUrl: that.article.titlepicUrl,
                  callback:()=>{
                    if(userInfo&&userInfo.mobilephone){
                      Vue.api.getShareArticelAward({...Vue.tools.sessionInfo(),aid:that.article.id}).then((resp)=>{
                        if(resp.status=='success'){
                          Vue.operationFeedback({type:'complete',text:'分享成功，购房币+'+resp.message});
                        }
                      });
                    }else{
                      Vue.alert({
                        html:'由于您未完善资料，此次分享不会获得积分奖励！',
                        yes:'立即完善资料',
                        ok:function () {
                          Vue.checkUserInfo(()=>{that.$router.push({ name: 'completeData', params: {}})},true)
                        }
                      });
                    }
                  }
                });
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
         /**/
          this.getArticleDetail();
          /**/

        },

    };
</script>
