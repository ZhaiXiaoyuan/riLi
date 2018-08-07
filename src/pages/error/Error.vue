<!--404页面-->
<template>
  <div class="cm-full-page error-page">
    <i class="icon logo-icon"></i>
    <div class="content-panel">
      <div class="panel-bd">
        <p class="title">该对战已有人应战</p>
        <div class="btn-list" style="margin-top: 1rem;">
          <div class="cm-btn cm-page-white-solid-btn" @click="$router.push({name:'center',params:{}})">返回</div>
        </div>
      </div>
    </div>
    <div class="footer-wrap">
      <i class="icon footer-icon"></i>
    </div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .error-page{
    text-align: center;
    padding-top: 1rem;
    background: url("../../images/pages/end-bg.jpg") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    .content-panel{
      margin-top: 0.6rem;
      padding: 0rem 0.28rem;
      width: 100%;
      min-height: 70%;
      color: #fff;
      .panel-bd{
        position: relative;
        background: #e60012;
        padding-bottom: 0.6rem;
        width: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 25px rgba(230,0,18,0.4);
      }
      .title{
        padding-top: 0.6rem;
        font-size: 0.36rem;
      }
      .score{
        margin-top: 0.4rem;
        display: inline-block;
        width: 1.8rem;
        height: 1.8rem;
        text-align: center;
        line-height: 1.8rem;
        font-size: 0.48rem;
        color: #e60012;
        background: #fff;
        border-radius: 50%;
      }
      .name{
        margin-top: 0.2rem;
        font-size: 0.3rem;
      }
      .integral{
        margin-top: 0.2rem;
        font-size: 0.3rem;
      }
      .tips{
        padding-top: 0.2rem;
        font-size: 0.3rem;
      }
    }
    .btn-list{
      margin-top: 0.4rem;
      padding: 0rem 0.24rem;
      .cm-btn{
        width: 100%;
        &+.cm-btn{
          margin-top: 0.3rem;
        }
      }
    }
    .footer-wrap{
      padding: 0.4rem 0rem;
      text-align: center;
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

    };
</script>
