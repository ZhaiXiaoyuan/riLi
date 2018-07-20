<!--导航栏-->
<template>
    <div class="nav-bar" v-if="pageName!='login'">
        <ul>
          <router-link   to="/home" class="ripple" tag="li" :class="{'active':pageName=='home'}">
            <i class="icon normal-icon home-normal-icon"></i>
            <i class="icon active-icon home-active-icon"></i>
            <span>首页</span>
          </router-link>
          <li class="ripple"  :class="{'active':pageName=='rank'}" @click="checkUserInfo(()=>{$router.push({ name: 'rank', params: {}})})">
            <i class="icon normal-icon cup-ml-normal-icon"></i>
            <i class="icon active-icon cup-ml-active-icon"></i>
            <span>金榜题名</span>
          </li>
          <router-link  to="/userCenter"  class="ripple" tag="li"  :class="{'active':pageName=='userCenter'}">
            <i class="icon normal-icon user-normal-icon"></i>
            <i class="icon active-icon user-active-icon"></i>
            <span>我</span>
          </router-link>
        </ul>
    </div>
</template>

<style lang="less" rel="stylesheet/less" scoped>
    .nav-bar{
      position: fixed;
      left: 0rem;
      bottom: 0rem;
      z-index: 1;
      width: 100%;
      height: 1rem;
      border-top: 1px solid #e5e5e5;
      background: #fff;
    }
    ul{
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      li{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        font-size: 0.24rem;
        color: #777;
        height: 100%;
        .icon{
          margin-bottom: 0.02rem;
        }
        .normal-icon{
          display: inline-block;
        }
        .active-icon{
          display: none;
        }
        &.active{
          color: #00DFA0;
          .normal-icon{
            display: none;
          }
          .active-icon{
            display: inline-block;
          }
        }
      }
    }
</style>

<script>
    import Vue from 'vue'


    export default {
        props: {

        },
        data:function () {
          return {
              pageName:'',
              loverName:''
          }
        },
        watch:{
          '$route': function(to, from) {
            this.pageName=this.$route.name;
          },
        },
        methods:{
          link:function (value) {

          }
        },
        created: function () {
        },
        mounted:function () {
          /**/
          this.pageName=this.$route.name;
          /*修改父dom的样式*/
          this.$el.parentNode.style.paddingBottom='1.2rem';
        },
    }


</script>
