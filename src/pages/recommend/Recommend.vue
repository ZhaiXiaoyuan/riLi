<!--推荐买房-->
<template>
    <div class="recommend">
      <div class="input-row">
        <input class="cm-input" type="text" maxlength="32" v-model="name" placeholder="购房者姓名">
      </div>
      <div class="input-row">
        <div class="cm-checkbox" :class="{'active':gender==1}" @click="gender=1;">
          <span class="status">
            <i class="icon selected-icon"></i>
          </span>
          <span class="text">先生</span>
        </div>
        <div class="cm-checkbox" :class="{'active':gender==0}" @click="gender=0;">
          <span class="status">
            <i class="icon selected-icon"></i>
          </span>
          <span class="text">女士</span>
        </div>
      </div>
      <div class="input-row">
        <input class="cm-input" type="tel" maxlength="12" v-model="phone" placeholder="购房者手机号码">
      </div>
      <div class="input-row">
        <input class="cm-input" type="text" maxlength="200" v-model="remark" placeholder="客户其他信息、需求等">
      </div>
      <div class="handle-btn submit-btn" @click="submit()">提交信息</div>
      <router-link :to="{ name: 'recommendList',params:{}}" class="handle-btn">查看我的推荐</router-link>
      <div class="btn-wrap">
        <router-link :to="{ name: 'awardRule',params:{type:'recommendAward'}}"  tag="a" class="link-btn">奖励规则>></router-link>
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
              name:null,
              gender:1,//性别，1:男性，0:女性
              phone:null,
              remark:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          submit:function () {
            if(!this.name){
              this.operationFeedback({type:'warn',text:'请输入购房者姓名'});
              return;
            }
            if(!this.phone){
              this.operationFeedback({type:'warn',text:'请输入购房者手机号码'});
              return;
            }
            if(!regex.phone.test(this.phone)){
              this.operationFeedback({type:'warn',text:regex.phoneAlert});
              return;
            }
            let params={
              ...Vue.tools.sessionInfo(),
              buyerName:this.name,
              buyerGender:this.gender,
              buyerMobilephone:this.phone,
              buyerRequire:this.remark
            }
            let fb=this.operationFeedback({text:'提交中...'});
            Vue.api.recommendBuyer(params).then((resp)=>{
              if(resp.status=='success'){
                fb.setOptions({type:'complete',text:'提交成功',delayForDelete:0});
                this.$router.push({name:'recommendFeedback',params:{}});
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          }
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
