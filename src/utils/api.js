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
    let basicUrl=process.env.NODE_ENV=='development'?'/api':'http://www.grfame.com/dmjywxs';
   // let basicUrl=process.env.NODE_ENV=='development'?'/api':'http://www.mk-dingneng.com/dmjywxs';
    Vue.api={
      //首页数据
      getHomeData:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/info/index',
          params: params
        });
      },
      //礼品列表
      getGiftList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/present/qpro',
          params: params
        });
      },
      //礼品详情
      getGiftDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/present/vpro',
          params: params
        });
      },
      //礼品兑换
      exchangeGift:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/present/expro',
          params: params
        });
      },
      //礼品兑换记录
      getExchangeRecord:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/present/qexd',
          params: params
        });
      },
      //签到
      signIn:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/award/sign',
          params: params
        });
      },
      //获取美文列表
      getArticleList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/qart',
          params: params
        });
      },
      //获取用户积分数
      getScore:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/info/getscore',
          params: params
        });
      },
      //获取单个美文
      getArticleDetail:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/vart',
          params: params
        });
      },
      //首页奖励规则-美文分享+推荐买房规则
      getAwardRule:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/allrule',
          params: params
        });
      },
      //获取积分清单
      getScoreRecordList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/award/qaward',
          params: params
        });
      },
      //获取积分排行榜
      getRankList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/award/board',
          params: params
        });
      },
      //推荐他人买房
      recommendBuyer:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/rbuyer',
          params: params
        });
      },
      //我的推荐买房
      getRecommendList:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/qrbuyer',
          params: params
        });
      },
      //获取短信验证码
      genCode:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/auth/mcode',
          params: params
        });
      },
      //用户个人信息获取
      getUserInfo:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/info/get',
          params: params
        });
      },
      //用户个人信息完善
      saveUserData:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/info/upd',
          params: params
        });
      },
      //用户绑定手机号码
      bindPhone:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/auth/reg',
          params: params
        });
      },
   /*   //获取推荐奖励规则
      getRecommendAwardRule:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/rbrule',
          params: params
        });
      },*/
      //楼盘风采-楼盘概况分页查询
      getBuildingSurvey:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/hs/info/getbs',
          params: params
        });
      },
      //楼盘风采-楼盘相册分页查询
      getBuildingAlbum:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/hs/info/getps',
          params: params
        });
      },
      //楼盘风采-楼盘户型全量查看
      getLayoutInfo:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/hs/info/getms',
          params: params
        });
      },
      //获取微信公众号JsapiConfig
      getWeChatConfig:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/info/wjc',
          params: params
        });
      },
      //分享美文-接收分享美文通知
      getShareArticelAward:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/sart',
          params: params
        });
      },
      //积分奖励-我的积分清单-收支汇总
      qawardsum:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/award/qawardsum',
          params: params
        });
      },
      //积分奖励-我的积分清单-收支汇总
      getInviteAwardRule:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/icrule',
          params: params
        });
      },
      //邀请好友-邀请好友分享信息
      getInviteInfo:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/mk/recus/isinfo',
          params: params
        });
      },
      //获取最新文章数-12小时
      getNewArticleCount:function (params) {
        return Vue.http.ajax({
          method: 'post',
          url: basicUrl+'/cus/info/gnac',
          params: params
        });
      },
    }
  },

}
