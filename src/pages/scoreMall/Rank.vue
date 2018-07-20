<!--金榜题名-->
<template>
    <div class="rank">
      <div class="survey-panel">
        <div class="panel-hd">
          <span class="title">我的成绩</span>
        </div>
        <div class="panel-bd">
          <ul>
            <li>
              <p>{{survey&&survey.asum}}</p>
              <p>积分总数</p>
            </li>
            <li>
              <p>{{survey&&survey.ssum}}</p>
              <p>分享积分</p>
            </li>
            <li>
              <p>{{survey&&survey.rsum}}</p>
              <p>有效推荐</p>
            </li>
            <li>
              <p>{{survey&&survey.isum}}</p>
              <p>邀请好友</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="list-panel">
        <div class="panel-hd">
          <ul class="cm-tab-list">
            <li :class="{'active':listType=='All'}" @click="setListType('All')">
              <span>总积分榜</span>
            </li>
            <li :class="{'active':listType=='Share'}" @click="setListType('Share')">
              <span>分享榜</span>
            </li>
            <li :class="{'active':listType=='Recom'}" @click="setListType('Recom')">
              <span>推荐榜</span>
            </li>
            <li :class="{'active':listType=='Invite'}" @click="setListType('Invite')">
              <span>邀请榜</span>
            </li>
          </ul>
        </div>
        <div class="panel-bd">
          <div class="entry-list" v-if="listType=='All'">
            <div class="list-hd">
              <div class="row">
                <div class="index">排名</div>
                <div>手机号</div>
                <div>赚取积分总数</div>
              </div>
            </div>
            <ul class="list-bd">
              <li class="row" v-for="(entry,index) in entryList">
                <div class="index">
                  <i class="icon first-icon" v-if="entry.no==1"></i>
                  <i class="icon second-icon" v-if="entry.no==2"></i>
                  <i class="icon third-icon" v-if="entry.no==3"></i>
                  <span v-if="entry.no>3">{{entry.no}}</span>
                </div>
                <div>{{entry.mobilephone|phoneTextFormat}}</div>
                <div>
                  {{entry.score}}
                </div>
              </li>
            </ul>
          </div>
          <div class="entry-list" v-if="listType=='Share'">
            <div class="list-hd">
              <div class="row">
                <div class="index">排名</div>
                <div>手机号</div>
                <div class="count">分享次数</div>
                <div>赚取积分总数</div>
              </div>
            </div>
            <ul class="list-bd">
              <li class="row" v-for="(entry,index) in entryList">
                <div class="index">
                  <i class="icon first-icon" v-if="entry.no==1"></i>
                  <i class="icon second-icon" v-if="entry.no==2"></i>
                  <i class="icon third-icon" v-if="entry.no==3"></i>
                  <span v-if="entry.no>3">{{entry.no}}</span>
                </div>
                <div>{{entry.mobilephone|phoneTextFormat}}</div>
                <div class="count">{{entry.count}}</div>
                <div>
                  {{entry.score}}
                </div>
              </li>
            </ul>
          </div>
          <div class="entry-list" v-if="listType=='Recom'">
            <div class="list-hd">
              <div class="row">
                <div class="index">排名</div>
                <div>手机号</div>
                <div class="count">有效推荐</div>
                <div>赚取积分总数</div>
              </div>
            </div>
            <ul class="list-bd">
              <li class="row" v-for="(entry,index) in entryList">
                <div class="index">
                  <i class="icon first-icon" v-if="entry.no==1"></i>
                  <i class="icon second-icon" v-if="entry.no==2"></i>
                  <i class="icon third-icon" v-if="entry.no==3"></i>
                  <span v-if="entry.no>3">{{entry.no}}</span>
                </div>
                <div>{{entry.mobilephone|phoneTextFormat}}</div>
                <div class="count">{{entry.count}}</div>
                <div>
                  {{entry.score}}
                </div>
              </li>
            </ul>
          </div>
          <div class="entry-list" v-if="listType=='Invite'">
            <div class="list-hd">
              <div class="row">
                <div class="index">排名</div>
                <div>手机号</div>
                <div class="count">邀请次数</div>
                <div>赚取积分总数</div>
              </div>
            </div>
            <ul class="list-bd">
              <li class="row" v-for="(entry,index) in entryList">
                <div class="index">
                  <i class="icon first-icon" v-if="entry.no==1"></i>
                  <i class="icon second-icon" v-if="entry.no==2"></i>
                  <i class="icon third-icon" v-if="entry.no==3"></i>
                  <span v-if="entry.no>3">{{entry.no}}</span>
                </div>
                <div>{{entry.mobilephone|phoneTextFormat}}</div>
                <div class="count">{{entry.count}}</div>
                <div>
                  {{entry.score}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <nav-bar></nav-bar>
    </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">

</style>

<script>
    import Vue from 'vue'

    export default {
        components: {

        },
        data: function () {
            return {
              pager:{
                pageNum: 1,
                pageSize: 20,
                isLoading:false,
                isFinished:false,
                maxPage:0,
              },
              entryList:[],
              listType:'All',//全部=All | 分享=Share | 邀请=Invite | 荐客=Recom
              survey:null,
            }
        },
        computed: {},
        watch: {},
        methods: {
          getList:function (isInit) {
            if(isInit){
          /*    this.pager.pageNum = 1;*/
              this.entryList = [];
            }
            let pager={
           'pager.pageNumber':this.pager.pageNum,
           'pager.pageSize':this.pager.pageSize
            }
            let params={
              ...Vue.tools.sessionInfo(),
            /*  ...pager,*/
              type:this.listType
            }
            //该接口不分页
            Vue.api.getRankList(params).then((resp)=>{
              if(resp.status=='success'){
                let data=JSON.parse(resp.message);
                if(isInit){
                  this.survey={
                    asum:data.asum,
                    ssum:data.ssum,
                    rsum:data.rsum,
                    isum:data.isum,
                  }
                }
              /*  let pager=data.pager;
                this.pager.pageNum=pager.pageNumber+1;
                this.pager.maxPage=pager.totalPageCount;
                this.pager.isLoading=false;
                this.pager.isFinished=false;*/
                this.entryList=this.entryList.concat(data.list);
                if(this.entryList.length==0){
                  this.pager.maxPage=0;
                  this.pager.isLoading=false;
                  this.pager.isFinished=true;
                }else{
                  this.pager.maxPage=1;
                }
                console.log('test:',this.pager.maxPage);
              }
            })
          },
          getScore:function () {
            Vue.api.getScore({...Vue.tools.sessionInfo()}).then((resp)=>{
              if(resp.status=='success'){
                this.score=resp.message;
              }
            });
          },
          setListType:function (value) {
            this.listType=value;
            this.getList(true);
          }
        },

        created: function () {
        },
        mounted: function () {
          /**/
          this.getList(true);

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
