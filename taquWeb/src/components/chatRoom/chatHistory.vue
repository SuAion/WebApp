<template>
  <div class="many_people" id="dialogue_box">
    <mu-appbar style="width: 100%;position: fixed;top: 0;">
      <mu-row>
        <mu-col span="4">
          <p class="title_button">
            <mu-button icon style="margin-top: 5px" @click="$router.back(-1)">
              <mu-icon value="keyboard_arrow_left"></mu-icon>
            </mu-button>
          </p>
        </mu-col>
        <mu-col span="4">
          <p class="title_p">蜜桃社区</p>
        </mu-col>
        <mu-col span="4"></mu-col>
      </mu-row>
    </mu-appbar>
     <mu-container style="margin-top: 60px;">
      <mu-row>
        <mu-list>
          <mu-sub-header></mu-sub-header>
          <mu-list-item avatar v-for="(item,index) in ALLchatArr" :key="index">
            <mu-list-item-action avatar  @click="chatSomeone(item.uid,item.nickname)">
              <mu-avatar>
                <img :src="item.icon">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content @click="chatSomeone(item.uid,item.nickname)">
              <mu-list-item-title>{{item.nickname}}</mu-list-item-title>
            </mu-list-item-content>

            <mu-list-item-action @click="chatSomeone(item.uid,item.nickname)">
              <mu-icon value="chat_bubble"></mu-icon>
            </mu-list-item-action>
            <span style="margin-left:5px;">{{item.message}}</span>
          </mu-list-item>
        </mu-list>
      </mu-row>
     
    </mu-container>
    <!-- <mu-container>
      <mu-row  v-show="chatArr.length!==0" >
        <mu-list>
          <mu-sub-header>未读消息</mu-sub-header>
          <mu-list-item avatar v-for="(item,index) in chatArr" :key="index"   >
            <mu-list-item-action avatar  @click="chatSomeone(item.uid,item.nickname)">
              <mu-avatar>
                <img :src="item.icon">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content @click="chatSomeone(item.uid,item.nickname)">
              <mu-list-item-title>{{item.nickname}}</mu-list-item-title>
            </mu-list-item-content>

            <mu-list-item-action @click="chatSomeone(item.uid,item.nickname)">
              <mu-icon value="chat_bubble"></mu-icon>
            </mu-list-item-action>
            <span style="margin-left:5px;">{{item.message}}</span>
          </mu-list-item>
        </mu-list>
      </mu-row>
    </mu-container> -->
   
  </div>
</template>

<script>
import { PersonMessage,PersonChat } from "@/api/firends/chatRoomList";
import jsonToFormData from "@/common/js/jsonToFormData";
import Toast from "muse-ui-toast";

export default {
  name: "manyPeople",
  data() {
    return {
      chatArr: [],
      ALLchatArr:[]
    };
  },
  created() {
    this.uid = this.$route.query.id;
    // this.getchatList();
    this.getallList();
  },
  updated: function() {
    this.$nextTick(function() {
      var div = document.getElementById("dialogue_box");
      div.scrollTop = div.scrollHeight;
    });
  },
  methods: {
    //获取我和那些人列表
    // async getchatList() {
    //   const params = {
    //     token: sessionStorage.getItem("token")
    //   };
    //   const { code, data, msg } = await PersonMessage(params);
    //   if (code == "1") {
    //     this.chatArr = data;
    //   } else {
    //     Toast.message("暂时没有和你心仪的贴主的聊天记录哦");
    //   }
    // },
    //获取我和那些人列表
    async getallList() {
      const params = {
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await PersonChat(params);
      if (code == "1") {
        this.ALLchatArr = data;
      } else {
        Toast.message("暂时没有和你心仪的贴主的聊天记录哦");
      }
    },

    //与默认聊天
    async chatSomeone(id,nickname) {
      console.log(id,nickname)
      this.$router.push({ path: "/chating", query: { id, nickname} });
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
