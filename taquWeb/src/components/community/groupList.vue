<template>
  <div class="imageListPage">
    <mu-appbar color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      精选系列
    </mu-appbar>
    <mu-container>
      <mu-tabs
        :value.sync="active"
        inverse
        color="secondary"
        text-color="rgba(0, 0, 0, .54)"
      >
        <mu-tab v-for="(item,index) of head" :key="index" @click="change(active)">{{item.name}}</mu-tab>
      </mu-tabs>
      <div class="demo-text">
        <div class="group_item" v-for="(item,index) in list" :key="index">
          <div>
            <img :src="item.img" alt>
          </div>
          <div @click="goCircleDetial(item.cid,item.name)">
            <p>{{item.name}}</p>
            <p>{{item.desc}}</p>
          </div>
          <div style="display: flex;align-items: center;">
            <mu-button v-if="item.care==1" @click="escfollowCircle(item.cid)" flat color="rgb(245, 110, 156)">
              <mu-icon left value="star"></mu-icon>
              已关注
            </mu-button>
            <mu-button v-else-if="item.care==0" @click="followCircle(item.cid)" flat color="rgb(245, 110, 156)">
              <mu-icon left value="star_border"></mu-icon>
              关注
            </mu-button>
          </div>
        </div>
      </div>
    </mu-container>
  </div>
</template>
<script>
  import {
    CircleList, CollectionCircle,
    CollectionCircleDel
  } from "@/api/community/grouplist";
  //引入muse-ui的插件
  import Toast from "muse-ui-toast";

  export default {
    name: "tabbar",
    data() {
      return {
        //搜索内容
        active: 0,

        //下拉刷新内容测试
        head: [],
        list: [],
        num: 10,
        refreshing: false,
        loading: false,
        text: "List",
        h: "",
        isfollow: '',
      };
    },
    created() {
      this.getCircleList();
    },
    mounted() {
      this.h = window.screen.height;
    },
    methods: {
      //获取首页必要资源
      async getCircleList() {
        const params = {
          token: sessionStorage.getItem('token')
        }
        const {code, data, msg} = await CircleList(params);
        if (code == "1") {
          this.head = data;
          this.list = data[this.active].list
        } else {
          Toast.error("暂时没有更多数据");
        }
      },
      //切换分类
      change(value) {
        this.active = value;
        this.getCircleList();
      },
      //取消详情
      goCircleDetial(cid, name) {
        this.$router.push({path: "/group", query: {cid, name}});
      },
      //关注莫个圈子
      async escfollowCircle(cid) {
        const params = {
          token: sessionStorage.getItem("token"),
          cid: cid,
        };
        const {code, data, msg} = await CollectionCircleDel(params);
        if (code == "1") {
          this.getCircleList();
          Toast.message(data);
        } else {
          Toast.message(data);
        }
      },
      //取消关注
      async followCircle(cid) {
        const params = {
          token: sessionStorage.getItem("token"),
          cid: cid,
        };
        const {code, data, msg} = await CollectionCircle(params);
        if (code == "1") {
          this.getCircleList();
          Toast.message(data);
        } else {
          Toast.message(data);
        }
      },
    }
  };
</script>

<style scope lang="less">
  .imageListPage {
    background: #EDEDED !important;
  }

  .demo-loadmore-wrap {
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    .mu-appbar {
      width: 100%;
    }
  }

  .demo-loadmore-content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .group_item {
    display: flex;
    width: 100%;
    padding-left: 5%;
    margin-bottom: 5px;
    background-color: #fff;
    > div:nth-child(1) {
      padding: 10px;
      img {
        width: 80px;
        height: 80px;
      }
    }
    > div:nth-child(2) {
      width: 150px;
      margin-left: 6%;
      display: flex;
      flex-direction: column;
      p {
        padding: 0;
        margin: 0;
        width: 150px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        line-height: 20px;
      }
      p:nth-child(1) {
        padding-top: 20px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: rgba(0, 0, 0, 1)
      }
      p:nth-child(2) {
        padding-top: 20px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(164, 164, 164, 1);
      }

    }

  }
</style>
 

  
  
 

