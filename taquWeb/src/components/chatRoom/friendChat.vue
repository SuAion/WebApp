<template>
  <div class="imageListPage">
    <mu-appbar color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>交友聊天
    </mu-appbar>
    <mu-container>
      <div class="demo-text">
        <div class="group_item" v-for="(item,index) in photoUserList" :key="index">
          <div>
            <img :src="item.icon" alt @click="checkUser(item.uid)">
          </div>
          <div @click="chatSomeone(item.uid,item.nickname)">
            <div class="group_content">
              <div class="group_p">
                <p>{{item.nickname}}</p>
                <p>{{item.hometown}}</p>
                <p>{{item.autograph}}</p>

              </div>
              <div style="display: flex;align-items: center">
                <mu-button icon slot="left" large>
                  <mu-icon value="textsms" color="#f56e9c"></mu-icon>
                </mu-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mu-container>
  </div>
</template>
<script>
import { ChatFriend, GetMessage } from "@/api/firends/chatRoomList";
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
      photoUserList: [],
      num: 10,
      refreshing: false,
      loading: false,
      text: "List",
      h: "",
      isfollow: ""
    };
  },
  created() {
    this.getchatList();
  },
  mounted() {
    this.h = window.screen.height;
  },
  methods: {
    //获取分类的详情
    async getchatList() {
      const params = {
        token: sessionStorage.getItem("token"),
        bid: this.active + 1,
        page: this.page
      };
      const { code, data, msg } = await ChatFriend(params);
      if (code == "1") {
        // this.photoUserList.push(data);
        if (this.page != 1) {
          this.photoUserList.push.apply(this.photoUserList, data);
        } else {
          this.photoUserList = data;
        }
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    //点击头像查看 用户的资料
    async checkUser(uid) {
      this.$router.push({ path: "/others", query: { id: uid } });
    },
    //与默认聊天
    async chatSomeone(id, nickname) {
      console.log(id, nickname);
      this.$router.push({ path: "/chating", query: { id, nickname } });
    }
  }
};
</script>

<style scope lang="less">
.imageListPage {
  background: #ededed !important;
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
  padding-left: 2%;
  margin-bottom: 5px;
  background-color: #fff;
  > div:nth-child(1) {
    padding: 10px;
    img {
      width: 119px;
    }
  }
  > div:nth-child(2) {
    flex-grow:1;
    /*margin-left: 5px;*/
    /*display: flex;*/
    .group_content{
      margin-top: 18px;
      display: flex;
      justify-content: space-between;
    }
    /*justify-content: space-between;*/
    .group_p{
      p {
        padding: 0;
        margin: 0;
        line-height: 20px;
      }
      p:nth-child(1) {
        font-weight: 700;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: rgba(0, 0, 0, 1);
      }
      p:nth-child(2) {
        padding: 10px 0 30px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(164, 164, 164, 1);
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      p:nth-child(3) {
        color: rgba(164, 164, 164, 1);
      }
    }
  }
}
</style>
 
  

