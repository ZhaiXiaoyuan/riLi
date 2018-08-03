<template>
  <div class="celebrate-modal">
    <div class="mask">
      <i class="icon share-guide-icon"></i>
    </div>
    <div class="modal-content">
      <div class="modal-body">
        <p>初赛模式已通关！</p>
        <p>请继续完成挑战模式吧！</p>
      </div>
      <div class="modal-footer">
        <span class="close-btn"  @click="close()"></span>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less" scoped>
  .celebrate-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    top:0rem;
    left: 0rem;
    text-align: center;
    .mask{
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
    }
    .modal-content{
      display: inline-block;
      position: relative;
      z-index: 10;
      .modal-body{
        padding-top: 2.8rem;
        line-height: 0.6rem;
        background: url("../images/common/celebrate-modal-bg.png") no-repeat;
        width: 6.72rem;
        height: 5.71rem;
        background-size: 100% 100%;
        font-size: 0.36rem;
        color: #333;
      }
      .modal-footer{
        padding-top: 0.16rem;
        .close-btn{
          display: inline-block;
          background: url("../images/common/close-btn.png") no-repeat;
          width: 0.6rem;
          height: 0.6rem;
          background-size: 100% 100%;
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
    props:{

    },
    data: function () {
      return {

      }
    },
    computed: {},
    watch: {

    },
    methods: {
      close:function () {
        this.$el.remove();
        this.$destroy();
      }
    },
    created: function () {

    },
    mounted: function () {

    }
  };
</script>
