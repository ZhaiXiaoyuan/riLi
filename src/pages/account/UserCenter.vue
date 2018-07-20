<!--用户中心-->
<template>
    <div class="user-center">
      <div class="survey-panel">
        <div class="avatar">
          <img :src="userInfo&&userInfo.touxiang?userInfo.touxiang:defaultAvatar">
        </div>
        <div class="text-row">
          <p class="name">{{userInfo&&userInfo.username?userInfo.username:'微信姓名'}}</p>
          <p class="phone" v-if="userInfo&&userInfo.mobilephone">电话 {{userInfo.mobilephone}}</p>
          <div class="handle-btn" v-if="userInfo&&!userInfo.mobilephone" @click="checkUserInfo(()=>{$router.push({ name: 'completeData', params: {}})},true)">
            <i class="icon edit-icon"></i>
            完善资料
          </div>
          <router-link :to="{ name: 'editData', params: {}}" class="handle-btn"  v-if="userInfo&&userInfo.mobilephone">
            <i class="icon edit-icon"></i>
            修改资料
          </router-link>
        </div>
      </div>
      <div class="menu-panel">
        <ul class="menu-list">
          <li  class="item arrows-right" @click="checkUserInfo(()=>{$router.push({ name: 'myScore', params: {}})})">
             <span class="icon-wrap">
               <i class="icon score-grey-icon"></i>
             </span>
             <span class="field">我的积分</span>
          </li>
          <li class="item arrows-right" :class="{'cm-disabled':!canSign}" @click="checkUserInfo(()=>{signIn()})">
             <span class="icon-wrap">
               <i class="icon calendar-grey-icon"></i>
             </span>
            <span class="field">{{canSign?'每天签到':'已签到'}}</span>
          </li>
          <li  class="item arrows-right" @click="checkUserInfo(()=>{$router.push({ name: 'recommend', params: {}})})">
             <span class="icon-wrap">
               <i class="icon praise-grey-icon"></i>
             </span>
            <span class="field">推荐买房</span>
          </li>
          <li  class="item arrows-right" @click="checkUserInfo(()=>{$router.push({ name: 'exchangeRecord', params: {}})})">
             <span class="icon-wrap">
               <i class="icon present-grey-icon"></i>
             </span>
            <span class="field">我的兑换</span>
          </li>
          <router-link :to="{ name: 'giftList', params: {}}" tag="li"  class="item arrows-right">
             <span class="icon-wrap">
               <i class="icon shopping-grey-icon"></i>
             </span>
            <span class="field">兑换商城</span>
          </router-link>
          <li  class="item arrows-right" @click="checkUserInfo(()=>{$router.push({ name: 'rank', params: {}})})">
             <span class="icon-wrap">
               <i class="icon cup-grey-icon"></i>
             </span>
            <span class="field">金榜题名</span>
          </li >
        </ul>
      </div>
      <nav-bar></nav-bar>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              userInfo:null,
              name:null,
              phone:null,
              code:null,
              defaultAvatar:require('../../images/common/default-avatar.png'),
              isFull:false,
              canSign:false,//true:可签到，false:已签到
            }
        },
        computed: {},
        watch: {},
        methods: {
          getHomeData:function () {
            Vue.api.getHomeData({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                var data=JSON.parse(resp.message);
                this.isFull=data.isFull?true:false;
                this.canSign=data.canSign?true:false
              }
            })
          },
          signIn:function () {
            Vue.signInModal({
              callback:()=>{
                this.canSign=false;
              }
            });
          }

        },
        created: function () {

        },
        mounted: function () {
          /**/
          this.userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
          this.name=this.userInfo.username;
        },
      beforeRouteEnter (to, from, next) {
        Vue.api.getHomeData({...Vue.tools.sessionInfo()}).then((resp)=>{
          if(resp.status=='success'){
            var data=JSON.parse(resp.message);
            next(vm =>{
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
