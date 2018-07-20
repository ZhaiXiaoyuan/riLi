<!--完善信息-->
<template>
    <div class="user-data">
      <div class="avatar">
        <img :src="userInfo&&userInfo.touxiang?userInfo.touxiang:defaultAvatar" alt="">
      </div>
      <div class="input-row">
        <input type="text" class="cm-input" v-model="name" maxlength="50" placeholder="请输入姓名">
      </div>
      <div class="input-row">
        <input type="tel" class="cm-input" v-model="phone" maxlength="12" placeholder="请输入手机号">
      </div>
      <div class="input-row">
        <input type="text" class="cm-input" v-model="code" maxlength="10" placeholder="请输入验证码">
        <gen-code :phone="phone"></gen-code>
      </div>

      <div class="handle-btn submit-btn" :class="{'cm-disabled':!name||!phone||!code}" @click="save()">保&nbsp;&nbsp;存</div>
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
              userInfo:null,
              name:null,
              phone:null,
              code:null,
              defaultAvatar:require('../../images/common/default-avatar.png'),
            }
        },
        computed: {},
        watch: {},
        methods: {
          getUserInfo:function (options) {
            Vue.api.getUserInfo({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.userInfo=JSON.parse(resp.message);
                if(this.userInfo.username){
                  this.name=this.userInfo.username;
                }
                sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo));
                options&&options.ok&&options.ok();
              }else{

              }
            })
          },
          save:function () {
            let that=this;
            if(this.name.length<2){
              this.operationFeedback({type:'warn',text:'姓名不得少于2个字符'});
              return;
            }
            if(!regex.phone.test(this.phone)){
              this.operationFeedback({type:'warn',text:regex.phoneAlert});
              return;
            }
            let sopenid=localStorage.getItem('sopenid');
            let fb=this.operationFeedback({text:'保存中...'});
            Vue.api.bindPhone({...Vue.tools.sessionInfo(),username:this.name,mobilephone:this.phone,mcode:this.code,sopenid:sopenid?sopenid:null}).then((resp)=>{
              if(resp.status=='success'){
                fb.setOptions({type:'complete',text:'保存成功'});
                this.getUserInfo({
                  ok:function () {
                    that.$router.push({name:'userCenter',params:{}});
                  }
                });
              }else{
                fb.setOptions({type:'warn',text:resp.message});
              }
            });
          }
        },
        created: function () {
        },
        mounted: function () {
          /**/
          this.getUserInfo();
          /**/
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
