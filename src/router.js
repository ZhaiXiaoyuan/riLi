import Vue from 'vue'
import Router from 'vue-router'
import MtaH5 from 'mta-h5-analysis';
/*import Home from './pages/Home.vue'
import GiftList from './pages/scoreMall/GiftList.vue'
import GiftDetail from './pages/scoreMall/GiftDetail.vue'
import ExchangeRecord from './pages/scoreMall/ExchangeRecord'
import MyScore from './pages/scoreMall/MyScore'
import Rank from './pages/scoreMall/Rank'
import ArticleList from './pages/article/ArticleList'
import ArticleDetail from './pages/article/ArticleDetail'
import AwardRule from './pages/common/AwardRule'
import Recommend from './pages/recommend/Recommend'
import RecommendFeedback from './pages/recommend/RecommendFeedback'
import RecommendList from './pages/recommend/RecommendList'
import CompleteData from './pages/account/CompleteData'
import EditData from './pages/account/EditData'
import BuildingContainer from './pages/building/Container'
import Survey from './pages/building/Survey'
import Layout from './pages/building/Layout'
import Album from './pages/building/Album'
import UserCenter from './pages/Account/UserCenter'
import Consultant from './pages/customerService/Consultant'
import ExchangeFeedback from './pages/scoreMall/ExchangeFeedback'*/

Vue.use(Router)


const routes=[ {
  path: '/',
  alias: '/home',
  name: 'home',
  component: resolve=>require(['./pages/Home'],resolve),
  meta:{
    title:'首页',
  }
},{
  path: '/login',
  name:'login',
  component: resolve => require(['./pages/Login'], resolve),
  meta:{
    title:'登录',
  }
},{
  path: '/center',
  name:'center',
  component: resolve => require(['./pages/Center'], resolve),
  meta:{
    title:'个人中心',
  }
},{
  path: '/question/:pageType?',
  name:'question',
  component: resolve => require(['./pages/Question'], resolve),
  meta:{
    title:'答题',
  }
},{
  path: '/end',
  name:'end',
  component: resolve => require(['./pages/End'], resolve),
  meta:{
    title:'答题结束',
  }
},{
  path: '/result',
  name:'result',
  component: resolve => require(['./pages/Result'], resolve),
  meta:{
    title:'答题结束',
  }
},]


const router= new Router({
  routes:routes,
/*  mode: 'history',*/
  /* scrollBehavior: function (to, from, savedPosition) {
   return savedPosition || { x: 0, y: 0 }
   }*/
})

//注册全局导航守卫
/*router.beforeEach((to, from,next) => {
  let url=window.location.href;
 /!* if(url.indexOf('?')==-1&&url.indexOf('&1=')>-1){
    window.location.replace(window.location.href.replace('&1=',''));
  }*!/
 //当从微信跳转回前端时会在地址上拼接额外的参数，导致了地址格式错乱，故对此进行替换处理
/!*  let linkAnalysis=url.match(/\/\?from(\S*)#\//);
  let wrongUrlData=linkAnalysis?linkAnalysis[0]:null;
  if(wrongUrlData&&wrongUrlData!=''){
    window.location.replace(url.replace(wrongUrlData,'/#/'))
  }
  if(to.query.sopenid){
    localStorage.setItem('sopenid',to.query.sopenid);
  }
  if(to.query.openid){
    Vue.cookie.set('number',to.query.openid,{ expires: '12h' });
  }*!/

 /!* let userInfo=sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):null;
  if(!userInfo){
    Vue.api.getUserInfo({...Vue.sessionInfo()}).then((resp)=>{
      if(resp.status=='success'){
        let userInfo=JSON.parse(resp.message);
        sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
        if(userInfo.status==20){
          next();
        }else{
          router.push({name:'forbidden'});
        }
      }
    })
  }else {
    if(userInfo.status==20){
      next();
    }else{
      router.push({name:'forbidden'});
    }
  }*!/

/!*  Vue.api.getUserInfo({...Vue.sessionInfo()}).then((resp)=>{
    if(resp.status=='success'){
      let userInfo=JSON.parse(resp.message);
      sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
      if(userInfo.status==20){
        MtaH5.pgv();
        next();
      }else{
        router.push({name:'forbidden'});
      }
    }else{

    }
  })*!/

})*/
router.afterEach((to, from) => {
  //修改页面title
  document.title = to.meta.title;
})
//
export default router
