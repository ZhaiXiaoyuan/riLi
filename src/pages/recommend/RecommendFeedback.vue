<!--推荐提交反馈-->
<template>
    <div class="cm-feedback-page">
      <i class="icon success-status-icon"></i>
      <p class="title">推荐客户提交成功</p>
      <div class="desc">
        <p>我们会第一时间联系被推荐的客户，</p>
        <p>以确认信息的有效性，感谢您的付出</p>
      </div>
      <router-link :to="{ name: 'recommend', params: {}}" tag="div" class="handle-btn ok-btn" >继续推荐客户</router-link >
      <router-link :to="{ name: 'recommendList', params: {}}" tag="div" class="handle-btn">查看已推荐的客户</router-link>
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

            }
        },
        computed: {},
        watch: {},
        methods: {

        },

        created: function () {
        },
        mounted: function () {
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
