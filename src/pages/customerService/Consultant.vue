<!--置业顾问-->
<template>
   <div class="consultant">
     <div class="staff-info-panel">
       <img class="avatar" :src="defaultAvatar">
       <p class="phone">
         0759-2088888
         <a href="tel:0759-2088888">拨打</a>
       </p>
     </div>
     <div class="site-panel">
       <div class="item">
         <span class="field">服务时间</span>
         <div class="value">周一至周日9：00-21：00</div>
       </div>
       <div class="item">
         <span class="field">营销中心地址</span>
         <div class="value">
           <p>广东省湛江市东盟大道8号</p>
           <p>东盟城营销中心</p>
         </div>
       </div>
     </div>
     <div class="example-panel">
       <img :src="exampleImg">
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
              defaultAvatar:require('../../images/common/man-default-avatar.png'),
              exampleImg:require('../../images/customerService/example-01.jpg'),
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
