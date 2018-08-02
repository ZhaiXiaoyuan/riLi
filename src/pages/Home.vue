<!--首页-->
<template>
    <div class="home">
      <div class="btn-wrap">
        <div class="cm-btn cm-page-btn" @click="toStart()">开始竞赛</div>
      </div>
      <div class="progress-wrap" :class="{'active':loading}">
        <div class="progress"><div class="line"></div></div>
        <div class="slogan">天天向上，追求卓越</div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .home{
    .btn-wrap{
      position: absolute;
      left: 0rem;
      bottom: 3.2rem;
      width: 100%;
      text-align: center;
    }
    .progress-wrap{
      position: absolute;
      width: 100%;
      left: 0rem;
      bottom: 1.8rem;
      padding: 0rem 0.28rem;
      opacity: 0;
      .progress{
        position: relative;
        background:#000;
        height:0.2rem;
        border-radius:0.1rem;
        border-left:1px solid #111;
        border-top:1px solid #111;
        border-right:1px solid #333;
        border-bottom:1px solid #333;
        .line{
          position:absolute;
          top:0rem;
          left: 0rem;
          height:0.16rem;
          border-radius: 0.08rem;
          width: 0%;
          background:#f0091b;
          box-shadow:0px 0px 10px 1px rgba(230,0,18,0.8);
          transition: width 2s;
        }
      }
      .slogan{
        margin-top: 0.2rem;
        font-size: 0.44rem;
        color: #333;
        text-align: center;
      }
      &.active{
        opacity: 1;
        .progress{
          .line{
            width: 100%;
          }
        }
      }
    }
  }
</style>

<script>
    import Vue from 'vue'

    export default {
        components: {
        },
        data: function () {
            return {
              loading:false,
            }
        },
        computed: {},
        watch: {},
        methods: {
          toStart:function () {
            this.loading=true;
            setTimeout(()=>{
              this.$router.push({name:'login',params:{}});
            },2000)
          },
        },

        created: function () {
        },
        mounted: function () {

        },

    };
</script>
