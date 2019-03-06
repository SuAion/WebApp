<template>
  <div class="many_people" id="dialogue_box" style="background: #f7deec96;">
    <mu-appbar style="width: 100%;position: fixed;top: 0;" color="#f56e9c">
      <mu-row>
        <mu-col span="4">
          <p class="title_button">
            <mu-button icon style="margin-top: 5px" @click="$router.back(-1)">
              <mu-icon value="keyboard_arrow_left"></mu-icon>
            </mu-button>
          </p>
        </mu-col>
        <mu-col span="4">
          <p class="title_p">{{nickname}}</p>
        </mu-col>
        <mu-col span="4"></mu-col>
      </mu-row>
    </mu-appbar>
    <mu-container ref="container" class="demo-loadmore-content">
      <mu-load-more @refresh="refresh" :refreshing="refreshing">
        <div class="chatContent">
          <div v-for="item in chatArr">
            <p
              v-if="item.userAccess"
              style="color: white; background: #00000042;text-align: center;border-radius: 5px;margin-bottom: 10px !important;"
            >{{item.userAccess}}</p>

            <div class="chatContent_box" v-if="item.isSelf==false">
              <mu-avatar size="48" style="margin: 4px 8px 0 0">
                <img :src="item.icon">
              </mu-avatar>
              <div class="userText">
                <p>{{item.nickname}}</p>
                <span>{{item.content}}</span>
              </div>
            </div>

            <div
              class="chatContent_box"
              style="justify-content:flex-end"
              v-else-if="item.isSelf==true"
            >
              <div class="userText" style="text-align: right;">
                <p>{{item.nickname}}</p>
                <span>{{item.content}}</span>
              </div>
              <mu-avatar size="48" style="margin: 4px 0 0 8px">
                <img :src="item.icon">
              </mu-avatar>
            </div>
          </div>
        </div>
      </mu-load-more>
    </mu-container>

    <div class="chatBox">
      <input type="text" placeholder="说点什么...." v-model="news">
      <mu-button flat color="primary" @click="sendNews">→</mu-button>
    </div>
        <mu-dialog
      title="提示"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="chongzhiAlert"
    >余额不足,是否前去充值
      <mu-button slot="actions" flat color="primary" @click="openchongzhiDialog">同意</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closechongzhiDialog">拒绝</mu-button>
    </mu-dialog>
  </div>
  
</template>

<script>
import {
  OneChat,
  GetMessage,
  ChatPerson,
  userinfo,
  GetHistoryMessage
} from "@/api/firends/chatRoomList";
import jsonToFormData from "@/common/js/jsonToFormData";
import Toast from "muse-ui-toast";
// import Loading from 'muse-ui-loading';
let Heartbeat;
export default {
  name: "manyPeople",
  data() {
    return {
      websock: null,
      openSimple: false,
      news: "",
      userAccess: "",
      chatArr: [],
      uid: "",
      nickname: "",
      user: {},
      //个人信息
      userNickname: "",
      refreshing: false,
      loading: false,
      page: 1,
      chongzhiAlert:false,
    };
  },
  created() {
    this.uid = this.$route.query.id;
    this.nickname = this.$route.query.nickname;
    this.getuser();
    this.heart();
    this.getHistory();
    this.getUnread();
  },
  destroyed() {
    clearInterval(Heartbeat);
  },
  updated: function() {
    this.$nextTick(function() {
      var div = document.getElementById("dialogue_box");
      div.scrollTop = div.scrollHeight;
    });
  },
  methods: {
    refresh() {
      //   this.refreshing = true;
       window.scrollTo(0,0);
      this.loading = true;
      setTimeout(() => {
         window.scrollTo(0,0);
        this.page++;
        this.getHistory();
      }, 2000);
    },
    //心跳包
    heart() {
      Heartbeat = setInterval(() => {
        this.getUnread();
      }, 1000);
    },
  
    //请求个人信息
    async getuser() {
      const params = {
        token: sessionStorage.getItem("token"),
        uid: this.uid
      };
      const { code, data, msg } = await userinfo(params);
      if (code == "1") {
        this.user = {
          nickname: data.nickname,
          icon: data.icon,
          isSelf: true,
          content: ""
        };
        // this.userNickname=data.nickname
      } else {
        // Toast.message(msg);
      }
    },

    //获取之前所有的消息 带翻页的那种
    async getHistory() {
      const params = {
        token: sessionStorage.getItem("token"),
        uid: this.uid,
        page: this.page,
        limit: 10
      };
      const { code, data, msg } = await GetHistoryMessage(params);
      if (code == "1") {
        for (let item of data) {
          //分辨左右
          if (item.nickname == this.user.nickname) {
            item.isSelf = true;
          } else {
            item.isSelf = false;
          }
          //时间排序
        }
        if (this.page == "1") {
          this.chatArr = data.sort(this.compare("create_time"));
           window.scrollTo(0,0);
        } else {
          this.chatArr.push.apply(this.chatArr, data);
          this.chatArr = this.chatArr.sort(this.compare("create_time"));
           window.scrollTo(0,0);
        }
        // this.chatArr.push.apply(this.chatArr, data);
        // this.chatArr = this.chatArr.sort(this.compare("create_time"));
        //  window.scrollTo(0,0);
        console.log(this.chatArr);
      } else if (code == "-1") {
        this.page--;
        // Toast.message(data);
      }
      this.chatArr.push({})


    },

    //排序
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },

    //请求未读消息
    async getUnread() {
      const params = {
        token: sessionStorage.getItem("token"),
        uid: this.uid
      };
      const { code, data, msg } = await ChatPerson(params);
      if (code == "1") {
        for (let item of data) {
          //分辨左右
          if (item.nickname == this.user.nickname) {
            item.isSelf = true;
          } else {
            item.isSelf = false;
          }
          //时间排序
        }
        
        this.chatArr.push.apply(this.chatArr, data);
        this.chatArr = this.chatArr.sort(this.compare("create_time"));
         window.scrollTo(0,0);
        
      } else {
        // Toast.message(msg);
      }
    },

    //点击发送
    async sendNews() {
      this.user.content = this.news;
      //   console.log(this.user);
      //   this.chatArr.push(this.user);
      //   this.chatArr = [...this.chatArr];
      const params = {
        token: sessionStorage.getItem("token"),
        uid: this.uid,
        content: this.news
      };
      const { code, data, msg } = await OneChat(jsonToFormData(params));
      if (code == "1") {
        this.getHistory();
      }else if(code =='-2'){
          this.chongzhiAlert = true
      }
    },
      //购买对话框
    openchongzhiDialog() {
      this.$router.push({ path: "/walletIndex", query: {} });
    },
    closechongzhiDialog() {
      this.chongzhiAlert = false;
    },
    
  }
};
</script>

<style scoped lang="less">
.title_p {
  text-align: center;
}

.many_people {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff;
  .chatContent {
    padding: 8px 16px;
    margin-top: 61px;
    margin-bottom: 56px;
    .chatContent_box {
      display: flex;
      margin-bottom: 10px;
      .userText {
        p {
          font-size: 12px;
          margin-bottom: 6px !important;
        }
        span {
          background: white;
          padding: 5px;
          border-radius: 6px;
        }
      }
    }
  }
  .chatBox {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    input {
      width: 80%;
      padding-left: 10px;
      border: 1px solid #d6d6d6;
      border-radius: 10px;
      outline: none;
      background: #f7f7f7;
      color: #909090;
      height: 36px;
    }
  }
}
</style>
