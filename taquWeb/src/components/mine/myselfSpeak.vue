<template>
  <div class="speak_content">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-row>
        <mu-col span="4">
          <p class="title_button">
            <mu-button icon style="margin-top: 5px" @click="ReturnPage">
              <mu-icon value="keyboard_arrow_left"></mu-icon>
            </mu-button>
          </p>
        </mu-col>
        <mu-col span="4">
          <p class="title_p">
            我的动态
          </p>
        </mu-col>
        <mu-col span="4">

        </mu-col>
      </mu-row>
    </mu-appbar>
    <mu-container style="padding: 0">
      <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" full-width
               @change="tabChange">
        <mu-tab value="0">我的动态</mu-tab>
        <mu-tab value="1">我的回复</mu-tab>
      </mu-tabs>
    </mu-container>
    <mu-load-more :loading="loading" @load="load">
      <div v-for="(item,index) in dataList" :key="index" @click="$router.push({path: '/dynamicDetails', query: {did:item.did}})">
        <mu-row class="speak_list">
          <mu-col span="2" style="margin-right:10px">
            <mu-avatar size="60">
              <img :src="active=='0'?item.icon:item.dicon" alt="">
            </mu-avatar>
          </mu-col>
          <mu-col span="9">
            <p style="font-size: 16px; font-weight: 700;margin-top: 10px">
              {{active=='0'?item.nickname:item.dnickname}}</p>
            <p style="font-size: 12px;color: #818181; margin-bottom: 10px">
              {{active=='0'?item.create_time:item.dtimes}}</p>
            <p style="font-size: 15px; font-weight: 400;white-space: pre-line;">{{item.content}}</p>
            <div v-if="item.img">
              <img :src="item.img[0]" alt="" style="width: 200px" v-if="item.img.length==1">
              <div class="wrapper" v-if="item.img.length>1"
                 :style="item.img.length<4?'grid-template-rows: 82px;':item.img.length<7?'grid-template-rows: 82px 82px;':'grid-template-rows: 82px 82px 82px;'">
                <img alt="" v-for="(imgs,index) in item.img" :src="imgs" :key="index">
              </div>
            </div>
          </mu-col>
        </mu-row>

        <mu-row style="padding: 0 10px;margin-bottom: 10px" v-if="active=='1'">
          <mu-col span="9" offset="2">
            <div class="replyMessage" v-if="item.rnickname">
              我 回复 <span style="color: #5A82AD" @click="replyPeople(item.ruid)">{{item.rnickname}}</span>：{{item.comment}}
            </div>
            <div class="replyMessage" v-else>
              我：{{item.comment}}
            </div>
          </mu-col>
        </mu-row>

        <div v-if="active=='0'">
          <mu-col span="9" offset="2" style="padding: 5px 0">
            <div class="replyMessage" v-for="(comment,index) in item.comment" :key="index">
              <span style="color: #5A82AD" @click="replyPeople(comment.uid)">{{comment.nickname}}</span>
              ：{{comment.comment}}
            </div>
          </mu-col>
          <div class="speak_bottom">
            <div style="line-height: 25px">
              浏览<span>{{item.click}}</span>次
            </div>
            <div>
              <img src="../../assets/image/Fabulous.jpg" alt="" style="width: 20px;height: 20px">
              <span>{{item.zan}}</span>
            </div>
          </div>
        </div>
        <mu-divider></mu-divider>
      </div>
    </mu-load-more>


    
  </div>
</template>

<script>
  import {dynamicList, userComment} from "@/api/dynamic";
  import {token} from '@/common/js/token'
  import {transStamp2} from '@/common/js/timeStamp'

  export default {
    name: "myselfSpeak",
    data() {
      return {
        active: '0',
        dataList: [],
        loading: false,
        list1: [],
        list2: [],
        page: 1,
        page2: 1,
      };
    },
    created() {
      this.active = this.$route.query.type;
      this._getReplyList();
      this._getDynamicList();
    },
    methods: {
      //获取动态列表
      async _getDynamicList() {
        const params = {
         token:sessionStorage.getItem('token'),
          page: this.page,
          cpage:{
            page:1,
            limit:2,
          },
          rpage:{},
        };
        const {code, data, msg} = await dynamicList(params);
        if (code == '1') {
          for (let item of data) {
            item.create_time = transStamp2(item.create_time * 1000)
          }
          this.list1 = this.list1.concat(data);
          if (this.active == '0') {
            this.dataList = this.list1
          }
        } else {
          this.$toast.message(data);
        }
      },
      //获取回复列表信息
      async _getReplyList() {
        const params = {
          token:sessionStorage.getItem('token'),
          page: this.page2,
        };
        const {code, data, msg} = await userComment(params);
        if (code == '1') {
          for (let item of data) {
            item.dtimes = transStamp2(item.dtimes * 1000)
            item.ctimes = transStamp2(item.ctimes * 1000)
          }
          this.list2 = this.list2.concat(data)
          if (this.active == '1') {
            this.dataList = this.list2
          }
        } else {
          this.$toast.message(data);
        }
      },
      //改变头时
      tabChange(val) {
        this.active = val
        console.log(this.active)
        if (this.active == '0') {
          this.dataList = this.list1
        } else {
          this.dataList = this.list2
        }
      },
      //点击回复人
      replyPeople(id) {
        this.$router.push({path: '/others', query: {id}})
      },
      ReturnPage() {
        this.$router.back(-1)
      },
      //下拉刷新
      load() {
        this.loading = true;
        setTimeout(() => {
          if (this.active == '0') {
            this.page++
            this._getDynamicList()
          } else {
            this.page2++
            arr = [{
              name: "小喵2",
              tiem: '2019-1-1 9:20',
              title: "撒娇的快乐静安寺打了卡就是了空间撒娇的快乐静安寺打了卡就是了空间撒娇的快乐静安寺打了卡就是了空间",
              imgArr: ['/static/img/speak01.4534255.jpg'],
              browse: '50',
              fabulous: '60',
              reply: '12',
              replySpeack: '阿斯达所大所阿斯达所大所是是是45'
            },
              {
                name: "小喵3",
                tiem: '2018-12-2 9:20',
                title: "撒娇的快乐静安寺打了卡就是了空间撒娇的快乐静安寺打了卡就是了空间撒娇的快乐静安寺打了卡就是了空间",
                imgArr: [
                  '/static/img/speak01.4534255.jpg',
                  '/static/img/speak02.2126804.jpg',
                  '/static/img/speak03.7f78122.jpg',
                  '/static/img/speak04.d8ea44e.jpg',
                  '/static/img/speak05.c1ae570.jpg',
                  '/static/img/speak01.4534255.jpg',
                  '/static/img/speak02.2126804.jpg',
                  '/static/img/speak04.d8ea44e.jpg',
                  '/static/img/speak05.c1ae570.jpg'],
                browse: '100',
                fabulous: '400',
                reply: '12',
                replySpeack: '阿斯达所大所阿斯达所大所是是是78'
              }]
          }
          // this.dataList = this.dataList.concat(arr);
          this.loading = false;
        }, 1000)
      },
        //查看帖子详情
      async  checkDetails(did){
        this.$router.push({ path: '/dynamicDetails', query: { did:did,}});
      }
    }

  }
</script>

<style scoped>
  p {
    margin: 0;
  }

  .speak_contentP {

  }

  .title_p {
    text-align: center;
  }

  .speak_list {
    padding: 10px;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 82px 82px 82px;
    margin: 5px 0 0;
  }

  .wrapper img {
    margin: 0 0 2px;
    width: 80px;
    height: 80px;
  }

  .speak_bottom {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    color: #787878;
  }

  .speak_bottom img {
    width: 24px;
    height: 24px;
    vertical-align: text-bottom;
  }

  .replyMessage {
    background: #f1f0f0;
    padding: 0px 10px;
  }
</style>
