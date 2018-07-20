<!--礼品详情-->
<template>
    <div class="gift-detail">
      <img :src="gift.imageUrl" class="gift-img" alt="">
      <div class="survey-panel">
        <p class="name">{{gift.name}}</p>
        <p class="count">
          <span>消耗积分：{{gift.score}}</span>
          <span>总数：{{gift.amount}}</span>
          <span>剩余：{{gift.leftamount}}</span>
        </p>
      </div>
      <div class="detail-panel">
        <div class="panel-hd">
          <span class="title">兑换详情</span>
        </div>
        <div class="panel-bd">
          <ul class="info-list">
            <li>
              <span class="icon"></span>
              <div class="text-wrap">
                <p>兑换时间</p>
                <p>{{gift.exStartdate}}至{{gift.exEnddate}}</p>
              </div>
            </li>
            <li>
              <span class="icon"></span>
              <div class="text-wrap">
                <p>领取时间</p>
                <p>{{gift.rcvStartdate}}至{{gift.rcvEnddate}}</p>
              </div>
            </li>
            <li>
              <span class="icon"></span>
              <div class="text-wrap">
                <p>领取地址</p>
                <p class="cm-text">{{gift.rcvAddress}}</p>
              </div>
            </li>
            <li>
              <span class="icon"></span>
              <div class="text-wrap">
                <p>详细说明</p>
                <p class="cm-text">{{gift.remark}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="btn-list">
        <div class="cm-btn btn" @click="checkUserInfo(()=>{$router.push({ name: 'exchangeRecord', params: { }})})">兑换记录</div>
        <div class="cm-btn btn" @click="checkUserInfo(()=>{exchangeGift()})" :class="{'cm-disabled':gift.status!=20||gift.amount==gift.examount}">
          <span v-if="gift.amount>gift.examount">{{gift.status==20?'立即兑换':gift.statusLabel}}</span>
          <span v-if="gift.amount==gift.examount">已兑换完</span>
        </div>
      </div>
      <router-link :to="{ name: 'home'}" class="home-btn"><i class="icon"></i></router-link>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              gift:{},
            }
        },
        computed: {},
        watch: {},
        methods: {
          getGiftDetail:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              pid:this.$route.params.id
            }
            Vue.api.getGiftDetail(params).then((resp)=>{
              if(resp.status=='success'){
                this.gift=JSON.parse(resp.message);
                /*微信分享配置*/
                Vue.tools.shareConfig({
                  title: this.gift.name,
                  desc:this.gift.remark,
                  link: window.location.href,
                  imgUrl: this.gift.imageUrl,
                });
              }
            })
          },
          exchangeGift:function () {
            this.confirm({
              title:'',
              html:'将消耗'+this.gift.score+'积分，是否兑换',
              ok:()=>{
                let params={
                  ...Vue.tools.sessionInfo(),
                  pid:this.$route.params.id
                }
                let fb=this.operationFeedback({text:'兑换中...'});
                Vue.api.exchangeGift(params).then((resp)=>{
                  if(resp.status=='success'){
                    let data=JSON.parse(resp.message);
                    data.remark=this.gift.rcvRemark;
                    localStorage.setItem(data.id,JSON.stringify(data));
                    this.$router.push({name:'exchangeFeedback',params:{id:data.id}});
                    fb.setOptions({type:'complete',text:'兑换成功',delayForDelete:0});
                  }else{
                    fb.setOptions({type:'warn',text:resp.message,delayForDelete:0});
                    this.confirm({
                      title:'',
                      html:resp.message,
                      yes:'赚购房币',
                      no:'确定',
                      ok:()=>{
                        this.$router.push({name:'articleList'});
                      }
                    })
                  }
                });
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          /*获取礼品详情*/
          this.getGiftDetail();
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
