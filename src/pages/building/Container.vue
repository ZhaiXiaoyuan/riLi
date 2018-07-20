<!--楼盘风采模块容器-->
<template>
    <div class="building-container">
      <router-view></router-view>
      <div class="menu-panel" :class="{'active':expandMenu}">
        <div class="panel-hd">
          <i class="icon expand-icon" @click="expandMenu=!expandMenu"></i>
        </div>
        <div class="panel-bd">
          <ul>
            <router-link :to="{ name: 'survey', params: {}}" tag="li" class="item" :class="{'active':pageName=='survey'}">
              <i class="icon building-normal-icon normal-icon"></i>
              <i class="icon building-active-icon active-icon"></i>
              <p>概况</p>
            </router-link>
            <router-link :to="{ name: 'layout', params: {}}" tag="li" class="item" :class="{'active':pageName=='name'}">
              <i class="icon layout-normal-icon normal-icon"></i>
              <i class="icon layout-active-icon active-icon"></i>
              <p>户型</p>
            </router-link>
            <router-link :to="{ name: 'album', params: {}}" tag="li" class="item" :class="{'active':pageName=='name'}">
              <i class="icon camera-normal-icon normal-icon"></i>
              <i class="icon camera-active-icon active-icon"></i>
              <p>相册</p>
            </router-link>
            <a href="tel:0759-2088888" class="item" >
              <i class="icon phone-normal-icon normal-icon"></i>
              <i class="icon phone-active-icon active-icon"></i>
              <p>电话</p>
            </a>
          </ul>
        </div>
      </div>
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
              expandMenu:true,
              pageName:'',
              defaultAvatar:require('../../images/common/default-avatar.png'),
            }
        },
        computed: {},
        watch: {
          '$route': function(to, from) {
            this.pageName=this.$route.name;
          },
        },
        methods: {

        },
        created: function () {
        },
        mounted: function () {
          this.pageName=this.$route.name;
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
