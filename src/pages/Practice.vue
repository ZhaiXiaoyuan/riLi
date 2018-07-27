<!--练习-->
<template>
    <div class="cm-full-page cm-page-bg practice">
      <i class="icon logo-icon"></i>
      <div class="content-panel">
        <div class="panel-bd">
          <div class="list-block">
            <div class="block-hd">选择您练习题的类型</div>
            <div class="block-bd">
              <ul class="entry-list">
                <li v-for="(item,index) in typeList" @click="selectType(item)">{{item.label}}</li>
              </ul>
            </div>
          </div>
          <div class="cm-footer">
            <i class="icon footer-icon"></i>
          </div>
        </div>
      </div>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
  .practice{
    .content-panel{
      position: fixed;
      left: 0rem;
      bottom: 0.28rem;
      width: 100%;
      height: 78%;
      padding: 0rem 0.28rem;
      .panel-bd{
        position: relative;
        background: #fff;
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
        box-shadow: 0px 5px 15px rgba(117,4,13,0.19);
      }
    }
    .list-block{
      height: 90%;
      .block-hd{
        font-size: 0.36rem;
        color: #4c4c4c;
        padding: 0.6rem 0rem;
        text-align: center;
      }
      .block-bd{
        height: 82%;
        overflow: auto;
      }
      .entry-list{
        text-align: center;
        li{
          display: inline-block;
          background: url("../images/common/type-btn.png") no-repeat;
          width: 3.16rem;
          height: 1.04rem;
          background-size: 100% 100%;
          text-align: center;
          line-height: 1.04rem;
          font-size: 0.32rem;
          color:#e60012;
          margin: 0.08rem 0.08rem;
          border-radius: 1.02rem;
          &:active{
            background: #e60012;
            color: #fff;
            box-shadow: 1px 1px 15px rgba(241,9,26,0.19);
            height: 0.88rem;
            line-height: 0.88rem;
            border-radius: 0.44rem;
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
              typeList:[],
            }
        },
        computed: {},
        watch: {},
        methods: {
          getBasicConfig:function () {
            let params={
              ...Vue.tools.sessionInfo(),
              type:'CommonQuestionType',
            }
            Vue.api.getBasicConfig(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                this.typeList=data.CommonQuestionType;
                console.log('typeList:',this.typeList);
              }else{

              }
            });
          },
          selectType:function (item) {
            this.$router.push({name:'question',params:{pageType:'practice',pkId:-1,practiceType:item.label}});
          }
        },

        created: function () {

        },
        mounted: function () {
          this.getBasicConfig();
        },

    };
</script>
