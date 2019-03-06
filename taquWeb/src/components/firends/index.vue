<template>
  <div class="friend">
    <!-- <header>
      <i></i>
      <span>交友</span>
      <span class="iconfont icon-flirting"></span>
    </header>-->
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>交友
    </mu-appbar>
    <div class="row"  @click="$router.push({path: '/friendChat'})">
      <mu-button
        style="margin: 10px ; "
        textColor="background:rgba(255,255,255,1);"
        small
        round
      >交友聊天</mu-button>
      <img src="../../../static/friend_index/001.png" alt>
    </div>
    <div class="row" @click="$router.push({path: '/chatRoomList'})">
      <mu-button
        style="margin: 10px ; "
        textColor="background:rgba(255,255,255,1);"
        small
        round
      >搞笑聊天</mu-button>
      <img src="../../../static/friend_index/002.png" alt>
    </div>
    <div class="row" @click="$router.push({path: '/chatRoomList'})">
      <mu-button
        style="margin: 10px ; "
        textColor="background:rgba(255,255,255,1);"
        small
        round
      >情感吐露</mu-button>
      <img src="../../../static/friend_index/003.png" alt>
    </div>
    <!-- <div class="row2"  @click="$router.push({path: '/orderPage'})">
      <div class="row2_item">
        <div>
          <p>观日路主干道</p>
          <p>全部人都在围观</p>
        </div>
        <img src="../../../static/friend_index/004.png" alt>
      </div>
      <div class="row2_item"  @click="$router.push({path: '/orderPage'})">
        <div>
          <p>附近的人</p>
          <p>全部人都在围观</p>
        </div>
        <img src="../../../static/friend_index/005.png" alt>
      </div>
    </div> -->
    <!-- 热门聊天室 -->
    <p class="headTitle">
      <span>热门聊天室</span>
      <!-- <span>查看全部></span> -->
    </p>
    <div
      class="roomList"
      v-for="(item,index) in chatUserlist"
      :key="index"
      @click="getIntoRomm(item.rid)"
    >
      <div class="room_left">
        <img :src="item.img" alt>
      </div>
      <!--<div class="room_middle">-->
      <!--<p>-->
      <!--<span>音乐</span>-->
      <!--<span>在吗</span>-->
      <!--</p>-->
      <!--<p>37°的余温</p>-->
      <!--</div>-->
      <div class="room_right">
        <!--<p>辽宁</p>-->
        <p>{{item.name}}</p>
      </div>
    </div>
    <!-- <mu-grid-list class="gridlist-demo" :cols="3">
      <mu-sub-header>美女系列</mu-sub-header>
      <mu-grid-tile v-for="(tile, index) in list" :key="index">
        <img :src="tile.image">
      </mu-grid-tile>
    </mu-grid-list>-->
    <div style="width:100%;height:60px;"></div>
  </div>
</template>

<script>
import { HomeChatRoom } from "@/api/firends/index";

export default {
  name: "tabbar",
  data() {
    return {
      num: 10,
      refreshing: false,
      loading: false,
      text: "List",
      list: [],
      chatUserlist: []
    };
  },
  created() {
    this.chatRoom();
  },
  methods: {
    //获取聊天室房间
    async chatRoom() {
      const params = {
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await HomeChatRoom(params);
      if (code == "1") {
        this.chatUserlist = data;
      } else {
        this.$toast.message(data);
      }
    },
    //点击进图聊天室
    getIntoRomm(id) {
      this.$router.push({ path: "/manyPeople", query: { id } });
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000);
    }
  }
};
</script>

<style lang='less' scoped>
.gridlist-demo {
  margin: 0 !important;
}
.friend {
  header {
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
    // padding: 0 10px;
    span:nth-of-type(1) {
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
    }
  }
  .row:nth-of-type(1) {
    width: 93%;
    margin: 0 auto;
    height: 100px;
    margin-bottom: 10px;
    background: linear-gradient(
      90deg,
      rgba(1, 225, 228, 1),
      rgba(92, 193, 251, 1)
    );
    border-radius: 5px;
    position: relative;
    img {
      width: 65px;
      height: 56px;
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
  }
  .row:nth-of-type(2) {
    width: 93%;
    margin: 0 auto;
    height: 100px;
    margin-bottom: 10px;
    position: relative;
    background: linear-gradient(
      90deg,
      rgba(225, 68, 112, 1),
      rgba(251, 137, 92, 1)
    );
    border-radius: 5px;
    img {
      width: 48px;
      height: 48px;
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
  }
  .row:nth-of-type(3) {
    width: 93%;
    margin: 0 auto;
    height: 100px;
    margin-bottom: 10px;
    position: relative;
    background: linear-gradient(
      90deg,
      rgba(93, 130, 236, 1),
      rgba(176, 125, 254, 1)
    );
    border-radius: 5px;
    img {
      width: 46px;
      height: 49px;
      position: absolute;
      bottom: 10px;
      right: 20px;
    }
  }
  .row2 {
    display: flex;

    .row2_item {
      width: 100%;
      background: rgba(216, 244, 255, 1);
      border-radius: 5px;
      height: 87px;
      margin: 10px;
      position: relative;
      padding-left: 10px;
      p:nth-of-type(1) {
        font-size: 14px;
        font-weight: 600;
      }
      p:nth-of-type(2) {
        font-size: 12px;
        color: rgba(173, 173, 173, 1);
      }
    }
    img {
      width: 34px;
      height: 32px;
      position: absolute;
      right: 10px;
      top: 30%;
    }
  }

  .headTitle {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    span:nth-child(1){
      font-size: 16px;
      margin-top: 10px;
    }
     span:nth-child(2){
       font-size: 10px;
    }
  }

  .roomList {
    padding: 10px;
    height: 90px;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: space-between;
    .room_left {
      padding-top: 10px;
      img {
        margin: 0 10px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    /*.room_middle {*/
    /*flex-grow: 1;*/
    /*> p:nth-child(1) {*/
    /*span:nth-child(1) {*/
    /*height: 13px;*/
    /*font-size: 12px;*/
    /*font-family: MicrosoftYaHei;*/
    /*font-weight: 400;*/
    /*color: rgba(255, 107, 107, 1);*/
    /*line-height: 2px;*/
    /*}*/
    /*span:nth-child(2) {*/
    /*height: 16px;*/
    /*font-size: 16px;*/
    /*font-family: MicrosoftYaHei;*/
    /*font-weight: 400;*/
    /*color: rgba(0, 0, 0, 1);*/
    /*line-height: 2px;*/
    /*}*/
    /*}*/
    /*> p:nth-child(2) {*/
    /*height: 16px;*/
    /*font-size: 15px;*/
    /*font-family: MicrosoftYaHei;*/
    /*font-weight: 400;*/
    /*color: rgba(160, 160, 160, 1);*/
    /*line-height: 2px;*/
    /*}*/
    /*}*/
    .room_right {
      display: flex;
      align-items: center;
      color: rgba(160, 160, 160, 1);
      /*p:nth-child(1) {*/
      /*height: 15px;*/
      /*font-size: 14px;*/
      /*font-family: MicrosoftYaHei;*/
      /*font-weight: 400;*/
      /*color: rgba(160, 160, 160, 1);*/
      /*}*/
      /*p:nth-child(2) {*/
      /*height: 12px;*/
      /*font-size: 14px;*/
      /*font-family: MicrosoftYaHei;*/
      /*font-weight: 400;*/
      /*color: rgba(160, 160, 160, 1);*/
      /*}*/
    }
  }
}
</style>
