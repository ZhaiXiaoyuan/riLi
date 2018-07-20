<!--户型-->
<template>
    <div class="layout">
      <div class="pic-list-panel">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item,index) in itemList" :key="item.id">
            <div class="item-wrap">
              <div class="img-wrap" :style="{background: 'url('+item.imgUrl+') no-repeat center',backgroundSize: 'cover'}"></div>
              <div class="info-panel">
                <div class="panel-hd">
                  <p class="title">{{item.name}}</p>
                  <ul class="label-list">
                    <li>
                      <p class="label">户型格局</p>
                      <div>{{item.style}}</div>
                    </li>
                    <li>
                      <p class="label">建筑面积</p>
                      <div>{{item.areas}}</div>
                    </li>
                    <li>
                      <p class="label">参考均价</p>
                      <div>{{item.aveprice}}</div>
                    </li>
                    <li>
                      <p class="label">参考总价</p>
                      <div>{{item.allprice}}</div>
                    </li>
                  </ul>
                </div>
                <div class="panel-bd" v-html="item.remark">

                </div>
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <router-link :to="{ name: 'home'}" class="home-btn"><i class="icon"></i></router-link>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
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
              index:0,
              swiperOption: {
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 0,
                mousewheel: true,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
                on:{
                  transitionEnd: function(){
                    /*console.log('index:', this.swiper.activeIndex);*/
                    this.shareConfig();

                  }.bind(this),
                },

              },
              itemList:[]
            }
        },
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
      },
        watch: {},
        methods: {
          getLayoutInfo:function () {
            let params={
              ...Vue.tools.sessionInfo(),
            }
            Vue.api.getLayoutInfo(params).then((resp)=>{
              if(resp.status=='success'){
                this.itemList=JSON.parse(resp.message);
                this.shareConfig();
              }
            })
          },
          shareConfig:function () {
            let item=this.itemList[this.swiper.activeIndex];
            /*微信分享配置*/
            if(item){
              Vue.tools.shareConfig({
                title:item.name,
                desc:item.remark,
                link:window.location.href.split('#')[0]+'#/building/layout/'+this.swiper.activeIndex,
                imgUrl: item.imgUrl,
              });
            }
          }
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.getLayoutInfo();

          /**/
          this.index=this.$route.params.index;
          if(this.index){
            this.swiper.slideTo(this.index, 1000, false)
          }
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
