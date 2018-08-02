/**
 * Created by Designer on 2017/12/21.
 */
import router from '../router'


export default {
  install: function (Vue, options) {


    Vue.http.options.emulateJSON = true;
    Vue.http.interceptors.push((request, next)  =>{

      next((response) => {
        //对于有作登录状态的接口你，未未登录时跳转到登录页
        if(response.status==401){
         /* router.push({name:''});*/
        }
        return response
      });

    });
    /*自定义ajax函数，自带的不好用*/
    Vue.http.ajax = async function (options) {
      if(options.method.toUpperCase() == 'GET'){
        let res = await Vue.http.get(options.url, {params: options.params});
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }else if(options.method.toUpperCase() == 'POST'){
        let res = await Vue.http.post(options.url, options.params);
        if(typeof res.body == 'string'){
          return JSON.parse(res.body);
        }else{
          return res.body;
        }
      }
    }

    /**/
    let basicUrl=process.env.NODE_ENV=='development'?'/api/':'http://dev1.elecplus.net/rlwxs/';
   // let basicUrl=process.env.NODE_ENV=='development'?'/api':'http://www.mk-dingneng.com/dmjywxs';
    Vue.api={
      //登录
      login:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/cus/info/login',
          params: params
        });
      },
      //获取五条模拟题目
      getQuestionList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/simu/man/getfive',
          params: params
        });
      },
      //初赛答题结果提交
      submitAnswer:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/simu/man/commit',
          params: params
        });
      },
      //获取对战五条题目-邀战人
      getInviterQuestionList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/fight/man/getfivef',
          params: params
        });
      },
      //对战结果提交-邀战人
      submitInviterAnswer:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/fight/man/commitf',
          params: params
        });
      },
      //获取对战五条题目-应战人
      getInvitedQuestionList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/fight/man/getfivea',
          params: params
        });
      },
      //对战结果提交-邀战人
      submitInvitedAnswer:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/fight/man/commita',
          params: params
        });
      },
      //初赛个人排行榜
      getPersonalRank:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/rank/info/simup',
          params: params
        });
      },
      //初赛集体排行榜
      getTeamRank:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/rank/info/simuo',
          params: params
        });
      },
      //对战个人胜场数排行榜
      getPkRank:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/rank/info/fightp',
          params: params
        });
      },
      //获取基础配置信息
      getBasicConfig:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/cus/info/cinfo',
          params: params
        });
      },
      //对战结果获取
      getPkResult:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/fight/man/result',
          params: params
        });
      },
      //根据类型获取该类型所有题目
      getPracticeQuestionList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'wx/exam/man/getall',
          params: params
        });
      },
    }
  },

}
