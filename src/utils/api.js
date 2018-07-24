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
    let basicUrl=false&&process.env.NODE_ENV=='development'?'/api':'http://rlwxs.ngrok.xiaomiqiu.cn/rlwxs/';
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
    }
  },

}
