<template>
  <div class="speak_content" >
      <mu-appbar color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
    </mu-button>热门聊天
     <mu-badge :content="NewMessage" circle color="secondary" style="right: 10px;"  slot="right" class="demo-icon-badge"  @click='$router.push({ path: "/chatHistory" })'>
          <mu-icon value="textsms"></mu-icon>
      </mu-badge>
    </mu-appbar>
    <mu-load-more :loading="loading" @load="load">
      <mu-grid-list class="gridlist-demo" :cols="2">
        <div v-for="(tile,index) in photoUserList" :key="index" class="itemStyle">
          <div class="item_top">
            <img :src="tile.icon" @click="chatSomeone(tile.uid,tile.nickname)">
          </div>
          <div class="item_bottom" @click="checkUser(tile.uid)" >
            <img :src="tile.icon" alt>
            <span>{{tile.nickname}}</span>
          </div>
        </div>
      </mu-grid-list>
    </mu-load-more>
  </div>
</template>

<script>
import { ChatFriend, GetMessage} from "@/api/firends/chatRoomList";
//引入muse-ui的插件
import Toast from "muse-ui-toast";
let Heartbeat;
export default {
  name: "group",
  data() {
    return {
      active: 0,
      indicators: true,
      controls: true,
      kindHead: [],
      photoUserList: [],
      banner: [],
      chatUserList: [],
      page: 1,
      refreshing: false,
      loading: false,
      text: "List",
      h: "",
       NewMessage:'0',
    };
  },
  created() {
     this.heart()
    this.getchatList();
    
  },
  computed: {
    headerStyle() {
      return Math.min(1, Math.max(0, 1 - this.pullDownY / 40));
    }
  },
  methods: {
     //心跳包
    heart() {
      Heartbeat = setInterval(() => {
          this.getNewMessage()
      }, 1000);
    },
    // 检测是否有新消息
    async getNewMessage() {
      const params = {
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await GetMessage(params);
      if (code == "1") {
        this.NewMessage=data+''
      }else{
      }
    },
    //点击回复刷新
    load() {
      this.loading = true;
      setTimeout(() => {
          this.page++;
          this.getchatList();
          this.loading = false;
      }, 500);
    },
 
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
    //切换分类
    change(value) {
      this.active = value;
      this.page = 1;
      this.photoUserList = [];
      this.getchatList();
    },
    //点击图片查看 图片组的详情
    async chatSomeone(id,nickname) {
      console.log(id,nickname)
      this.$router.push({ path: "/chating", query: { id, nickname} });
    },
    //点击头像查看 用户的资料
    async checkUser(id) {
      this.$router.push({ path: "/others", query: { id: id } });
    }
  }
};
</script>

<style scoped lang="less">
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
  padding: 5px 10px;
}

/*----------------------------------------*/
.item_chatUser {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 20px 15px;
  .item_head {
    // margin-top: 5%;
    img {
      width: 119px;
      height: 132px;
    }
  }
  .item_content {
    margin-left: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    > p:nth-child(1) {
      span:nth-child(1) {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      span:nth-child(2) {
        // display: inline-block;
        // width:55px;
        // height:21px;
        // border:1px solid rgba(206,206,206,1);
        // border-radius:11px;
      }
    }
    > p:nth-child(2) {
      margin-top: 10px;
      flex-grow: 1;
      height: 17px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(255, 188, 245, 1);
      line-height: 2px;
    }
    > p:nth-child(3) {
      font-weight: 400;
      color: #000;
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.itemStyle {
  display: flex;
  width: 32 %;
  padding: 10px;
  margin: 2px;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.13);
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 2px;
  .item_top {
    img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
  }
  .item_bottom {
    display: flex;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    span {
      padding-left: 5px;
      flex-grow: 1;
      font-size: 12px;
    }
    .mu-icon-button {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
}
</style>
