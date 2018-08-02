/**
 * Created by Administrator on 2016/9/27 0027.
 */
/*一般的工具方法*/
import Vue from 'vue'
import router from '../router'
import App from '../App.vue'
import md5 from 'js-md5'

export default {
    install: function (Vue, options) {
        //常用正则
        window.regex={
          illegal :new RegExp("((?=[\x21-\x7e]+)[^A-Za-z0-9])"),
          illegalAlert:'请勿输入非法字符',
          pNum:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,//正数
          pNumAlert:'请输入大于0的数值，限制2位小数',
          pInt:/^[1-9]*[1-9][0-9]*$/,//正整数
          pIntAlert:'请输入大于0的整数',
          nNum:/^(0|[1-9][0-9]*)$/,//自然数
          nNumAlert:'请输入大于等于0的整数',
          chn:/^[\u4e00-\u9fa5]{0,}$/,
          chnAlert:'请输入纯中文字符串',

          float:/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/,
          floatAlert:'数值格式有误，请输入小数点前不多于8位、小数点后不多于2位的数值！',

          percent:/^((100(\.00|\.0)?)|((\d|[1-9]\d)(\.\d{1,2})?))$/,
          percentAlert:'百分数格式错误，请输入0~100间数值，可保留两位小数！',

          contact:/^(0\d{2,3}-?\d{7,8})|(1\d{10})$/,
          contactAlert:'请输入正确格式的手机号码或电话号码！',

          phone:/^1\d{10}$/,
          phoneAlert:'请输入正确格式的手机号！',

          mail:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          mailAlert:'请输入正确格式的邮箱！',

          idCard:/^[a-zA-Z0-9]{1,20}$/,
          idCardAlert:'身份证号码格式错误！',

          shortCode:/^(?![0-9]+$)[0-9A-Za-z]{7,20}$/,
          shortCodeAlert:'域名格式有误，请输入7到20位字母或数字，不可为纯数字！'
        }
        //
      Vue.tools = {
        /*生成请求时间戳*/
        genTimestamp:function () {
          return Math.ceil(new Date().getTime()/1000)
        },
        /**
         *
         * @param date
         * @param fmt
         * @returns {*}
         */
        formatDate:function(date,fmt){
          if(typeof date !=Date){
            date=new Date(date);
          }
          var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        },
        /**
         *获取地址了参数
         * @param url 链接
         * @returns {Object}
         */
        getRequest:function (url) {
          url=url?url:location.href;
          var theRequest = new Object();
          if(url.indexOf("?") != -1)//url中存在问号，也就说有参数。
          {
            var str = url.split('?')[1];
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++)
            {
              theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
            }

          }
          return theRequest;
        },
        /*将json对象转成地址栏参数*/
        toQueryString:function (obj) {
          var ret = [];
          function toQueryPair(key, value) {
            if (typeof value == 'undefined'){
              return key;
            }
            return key + '=' + encodeURIComponent(value === null ? '' : String(value));
          }
          for(var key in obj){
            key = encodeURIComponent(key);
            var values = obj[key];
            if(values && values.constructor == Array){//数组
              var queryValues = [];
              for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
              }
              ret = ret.concat(queryValues);
            }else{ //字符串
              ret.push(toQueryPair(key, values));
            }
          }
          return ret.join('&');
        },
        editUrl:function (url,params) {
          var pRequest=this.getRequest(url);
          return url.split('?')[0]+'?'+this.toQueryString(Object.assign({},pRequest,params))
        },
        toAuth:function (type,redirect) {
          if(redirect.indexOf('?')>-1){
            redirect+='&1='+type;
          }else{
            redirect+='?1='+type;
          }
          let link=window.location.origin+'/dmjywxs/cus/auth/wxred?1='+type+'&redirect='+encodeURIComponent(redirect.replace(window.location.origin,''));
    /*      console.log('test:',link);*/
          window.location.href=link;
        },
        sessionInfo:function () {
          let timestamp=this.genTimestamp();
          let number=Vue.cookie.get('number');
          if(!number||number==''){
            if(window.location.hash.indexOf('/end/pk/')>-1){
              sessionStorage.setItem('toPkId',window.location.hash.split('/pk/')[1]);
            }
            router.push({name:'login',params:{}});
          }

          return{
            timestamp:timestamp,
            number:number,
            signature:md5.hex('timestamp='+timestamp+'&number='+number+'&token='),
          }
        },
        /*获取事件当前元素*/
        getCurEle:function (e) {
          var targetEle=null;
          if(e.currentTarget){
            targetEle=e.currentTarget;
          }else if(event.srcElement){
            targetEle=e.srcElement;
          }
          return targetEle;
        },
        /*阻止事件冒泡*/
        stopPropagation:function(e){
          if(e){
            if(e.cancelBubble){
              e.cancelBubble = true;
            }
            else if(e.stopPropagation){
              e.stopPropagation();
            }
          }
        },
        wxConfig:function (options) {
          var params=Object.assign({
              ...this.sessionInfo(),
            url:window.location.href,
          },options.params);
          Vue.api.getWeChatConfig(params).then((resp)=>{
            if(resp.status=='success'){
              var configData=JSON.parse(resp.message);
              wx.config({
                debug:options.debug?true:false,
                beta:options.beta?true:false,
                appId: configData.appId,
                timestamp: configData.timestamp,
                nonceStr: configData.nonceStr,
                signature: configData.signature,
                jsApiList: options.jsApiList
              });
              wx.ready(function () {
                if(options.callback){
                  options.callback&&options.callback(true);
                }
              });
              wx.error(function(res){
                alert(JSON.parse(res));
              });
            }else{
              options.callback&&options.callback(false);
            }
          });
        },
        shareConfig:function (options) {
          if(options.link.indexOf('?')>-1){
            options.link+='&1='+1;
          }else{
            options.link+='?1='+1;
          }
          var shareInfo={
            title: options.title,
            desc:options.desc,
            link: window.location.origin+'/dmjywxs/cus/auth/wxred?1='+1+'&redirect='+encodeURIComponent(options.link.replace(window.location.origin,'')),
            imgUrl: options.imgUrl,
            trigger: function (res) {
              // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
              /*   alert('click shared');*/
            },
            success: function (res) {
              /*  alert('shared success+'+JSON.stringify(shareData));*/
              //some thing you should do
              options.callback&&options.callback();
            },
            cancel: function (res) {
              /*  alert('shared cancle');*/
            },
            fail: function (res) {
              /* alert(JSON.stringify(res));*/
            }
          };
          wx.onMenuShareTimeline(shareInfo);  //分享微信朋友圈
          wx.onMenuShareAppMessage(shareInfo);    //分享给朋友
          wx.onMenuShareQQ(shareInfo);    //分享到QQ
          wx.onMenuShareWeibo(shareInfo); //分享到腾讯微博

          wx.error(function (res) {
            alert(res.errMsg);
          });
        },
        genDeadline:function () {
          return new Date(this.formatDate(new Date(),'yyyy/MM/dd')+' 23:59:59').getTime()
        },
        checkRaceCount:function (options) {
          let account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          let countFieldName=account.code+'_raceCount';
          let deadlineFieldName=account.code+'_deadline';

          let deadline=localStorage.getItem(deadlineFieldName);
          let raceCount=5;
          if(deadline){
            raceCount=parseInt(localStorage.getItem(countFieldName));
          }else{
            localStorage.setItem(deadlineFieldName,Vue.tools.genDeadline());
            localStorage.setItem(countFieldName,5);
          }

          let curTime=new Date().getTime();
          if(curTime<deadline){
            if(raceCount){
              options.ok&&options.ok(raceCount);
            }else{
              options.fail&&options.fail();
            }
          }else{
            localStorage.setItem(deadlineFieldName,Vue.tools.genDeadline());
            localStorage.setItem(countFieldName,5);
          }
          return raceCount;
        },
        toPreliminary:function () {
          let account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          let countFieldName=account.code+'_raceCount';

          this.checkRaceCount({
            ok:(data)=>{
              this.raceCount=data;
              this.raceCount--;
              localStorage.setItem(countFieldName,this.raceCount);
              this.$router.push({name:'question',params:{pageType:'single'}});
            },
            fail:()=>{
              this.operationFeedback({type:'warn',text:'您今天剩余的初赛答题次数为0次'});
            }
          });
        },

        checkPkCount:function (options) {
          let account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          let countFieldName=account.code+'_pkCount';
          let deadlineFieldName=account.code+'_pkDeadline';

          let pkDeadline=localStorage.getItem(deadlineFieldName);
          let pkCount=5;
          if(pkDeadline){
            pkCount=parseInt(localStorage.getItem(countFieldName));
          }else{
            localStorage.setItem(deadlineFieldName,Vue.tools.genDeadline());
            localStorage.setItem(countFieldName,5);
          }

          let curTime=new Date().getTime();
          if(curTime<pkDeadline){
            console.log('pkCount:',pkCount);
            if(pkCount){
              options.ok&&options.ok(pkCount);
            }else{
              options.fail&&options.fail(pkCount);
            }
          }else{
            localStorage.setItem(deadlineFieldName,Vue.tools.genDeadline());
            localStorage.setItem(countFieldName,5);
          }
          return pkCount;
        },
        toPk:function () {
          let account=Vue.cookie.get('account')?JSON.parse(Vue.cookie.get('account')):{};
          let countFieldName=account.code+'_pkCount';

          this.checkPkCount({
            ok:(data)=>{
              this.pkCount=data;
              this.pkCount--;
              localStorage.setItem(countFieldName,this.pkCount);
              this.$router.push({name:'question',params:{pageType:'pk'}});
            },
            fail:()=>{
              this.operationFeedback({type:'warn',text:'您今天剩余的对战答题次数为0次'});
            }
          });
        }

      }

      Object.assign(Vue, Vue.tools);
      Object.assign(Vue.prototype, Vue.tools);
    },
}
