<template>
  <mu-load-more :loading="loading" @load="load">
    <div v-for="(item,index) in dataList" :key="index" @click="$router.push({path: '/dynamicDetails', query: {did:item.did}})">
      <mu-row class="speak_list">
        <mu-col span="2" style="margin-right:10px;">
          <mu-avatar size="60">
            <img src="../../assets/image/HeadPortrait.jpg" alt="">
          </mu-avatar>
        </mu-col>
        <mu-col span="">
          <p style="font-size: 14px; font-weight: 700;margin-top: 20px">{{item.nickname}}</p>
          <p style="font-size: 12px;color: #818181; margin-bottom: 10px">{{item.create_time}}</p>
          <p style="font-size: 12px; font-weight: 600">{{item.content}}</p>
          <div v-if="item.img">
            <img :src="item.img[0]" alt="" style="width: 200px" :preview="index" v-if="item.img.length==1">
            <div class="wrapper" v-if="item.img.length>1"
                 :style="item.img.length<4?'grid-template-rows: 82px;':item.img.length<7?'grid-template-rows: 82px 82px;':'grid-template-rows: 82px 82px 82px;'">
              <img alt="" v-for="(imgs,index) in item.img" :key="index" :src="imgs">
            </div>
          </div>
        </mu-col>
      </mu-row>

      <div class="speak_bottom">
        <div style="line-height: 25px">
          浏览<span>{{item.click}}</span>次
        </div>
        <div>
          <!-- <img src="../../assets/image/Fabulous.jpg" alt="" style="width: 20px;height: 20px"> -->
          <span data-v-4bded74c="" class="iconfont icon-pinglun"></span>
          <span>{{item.commentCount}}</span>
        </div>
      </div>

      <mu-divider></mu-divider>
    </div>
  </mu-load-more>
</template>

<script>
  import {PersonDynamic} from "@/api/othersHomepage";
  import {token} from '@/common/js/token';
  import {transStamp2} from '@/common/js/timeStamp'

  export default {
    name: "dynamic",
    props:['oId'],
    data() {
      return {
        dataList:[],
        loading: false,
        page:1,
      };
    },
    created() {
      console.log(this.oId,'dynamic')
      this._getDynamicList();
    },
    methods: {
      //获取动态列表
      async _getDynamicList() {
        const params = {
          token:sessionStorage.getItem('token'),
          page: this.page,
          uid:this.oId
        };
        const {code, data, msg} = await PersonDynamic(params);
        if (code == '1') {
          for (let item of data) {
            item.create_time = transStamp2(item.create_time * 1000)
          }
          this.dataList = this.dataList.concat(data);
        } else {
          this.$toast.message(data);
        }
      },
      //下拉刷新
      load() {
        this.loading = true;
        setTimeout(() => {
          this.page++
          this._getDynamicList();
          this.loading = false;
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  p {
    margin: 0;
  }

  .speak_list {
    padding: 10px;
  }

  .wrapper {
    display: grid;
    grid-template-columns: 82px 82px 82px;
    grid-template-rows: 82px 82px 82px;
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
    padding: 5px 10px;
  }
</style>
