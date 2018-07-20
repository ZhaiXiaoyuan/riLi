<!--推荐提交反馈-->
<template>
    <div class="cm-feedback-page">
      <i class="icon success-status-icon"></i>
      <p class="title">兑换成功</p>
      <div class="desc">
        <p>兑换码 {{entry.excode}}</p>
        <p style="margin-top: 0.2rem;">领取时间：{{entry.rcvStartdate}}至{{entry.rcvEnddate}}</p>
        <p>{{entry.remark}}</p>
      </div>
      <router-link :to="{ name: 'giftList', params: {}}" tag="div" class="handle-btn ok-btn" >继续兑换</router-link >
      <router-link :to="{ name: 'exchangeRecord', params: {}}" class="handle-btn">我的兑换</router-link>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  p{
    line-height: 0.44rem;
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              entry:{}
            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {
          this.entry=JSON.parse(localStorage.getItem(this.$route.params.id));
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
