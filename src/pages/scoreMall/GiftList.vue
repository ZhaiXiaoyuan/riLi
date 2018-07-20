<!--礼品兑换列表-->
<template>
    <div class="gift-list">
      <div class="survey-panel">
        <div class="score-wrap">
          <i class="icon diamond-icon"></i>
          <span class="score">可用积分：<em>{{score}}</em></span>
        </div>
        <div  class=" cm-btn btn" @click="checkUserInfo(()=>{$router.push({ name: 'exchangeRecord', params: { }})})">兑换记录</div>
      </div>
      <div class="list-panel">
        <ul class="entry-list">
          <router-link :to="{ name: 'giftDetail', params: { id: item.id }}" v-for="(item,index) in giftList" tag="li" :key="item.id" :class="{'cm-disabled':item.status!=20||item.amount==item.examount}">
           <div class="entry-content">
             <div class="cover">
               <img :src="item.imageUrl" alt="">
               <div class="status" v-if="item.status!=20&&item.amount>item.examount">{{item.statusLabel}}</div>
               <div class="status" v-if="item.amount==item.examount">已兑换完</div>
             </div>
             <div class="text-wrap">
               <p class="name">{{item.name}}</p>
               <p class="score">兑换积分<em>{{item.score}}</em></p>
               <p class="count"><span>总数<em>{{item.amount}}</em></span><span>已兑换<em>{{item.examount}}</em></span></p>
             </div>
           </div>
          </router-link>
        </ul>
      </div>
      <scroll-load :page="pager" @scrolling="getGiftList()"></scroll-load>
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
              pager:{
                pageNum: 1,
                pageSize: 20,
                isLoading:false,
                isFinished:false
              },
              giftList:[],
              score:0,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getGiftList:function (isInit) {
            if(isInit){
              this.pager.pageNum = 1;
              this.giftList = [];
            }
            let pager={
              'pager.pageNumber':this.pager.pageNum,
              'pager.pageSize':this.pager.pageSize
            }
            let params={
              ...Vue.tools.sessionInfo(),
              ...pager
            }
            Vue.api.getGiftList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;
                this.giftList=this.giftList.concat(data.result);
                console.log('this.giftList:',this.giftList);
              }
            })
          },
          getScore:function () {
            Vue.api.getScore({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.score=resp.message;
              }
            });
          }
        },

        created: function () {
        },
        mounted: function () {
          /*获取可用积分*/
          this.getScore();
          /**/
          this.getGiftList();

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
