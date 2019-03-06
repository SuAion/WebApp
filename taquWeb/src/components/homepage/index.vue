<template>
  <div class="homepage">
    <div class="TOP">
      <mu-appbar style="width: 100%;" color="#f56e9c">
        <!-- <mu-button icon slot="left">
          <mu-icon value="textsms"></mu-icon>
        </mu-button> -->
       <mu-badge :content="NewMessage" circle color="secondary"  slot="left" class="demo-icon-badge"  @click='$router.push({ path: "/chatHistory" })'>
          <mu-icon value="textsms"></mu-icon>
      </mu-badge>

       <div class="APPtitle">
         <div>
            <img src="../../assets/title_Img.png" alt="">
            <span>蜜糖社区</span>
         </div>
       </div>
        <mu-menu slot="right">
          <mu-button icon flat>
            <mu-icon value="create"></mu-icon>
          </mu-button>
          <mu-list slot="content">
            <mu-list-item button   @click='$router.push({ path: "/dynamicIndex" })'>
              <mu-list-item-content>
                <mu-list-item-title>
                  发表动态
                  </mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-list-item button @click='$router.push({ path: "/dynamicAlbumList" })' >
              <mu-list-item-content>
                <mu-list-item-title>发布照片</mu-list-item-title>
              </mu-list-item-content>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-appbar>
      <div>
        <mu-carousel transition="fade" hide-controls >
          <mu-carousel-item
            v-for="(item,index) in banner"
            :key="index"
          >
            <img :src="item.img">
          </mu-carousel-item>
        </mu-carousel>
      </div>
    </div>

    <mu-row fluid="true" class="circleList">
      <mu-col span="3" v-for="(item,index) in circleBlock" :key="index">
        <div class="circleStyle" @click="goGroupDetails(item.cid,item.name,item.img)">
          <mu-paper class="demo-paper" circle :z-depth="5">
            <img :src="item.img">
          </mu-paper>
          <span style="padding:0px;">{{item.name}}</span>
        </div>
      </mu-col>
    </mu-row>
    <mu-row class="headTitle" style="border-top: 10px solid #eee;">
      <span>聊天专栏</span>
      <router-link to="/groupList">
        <span>查看全部></span>
      </router-link>
    </mu-row>
    <mu-grid-list class="gridlist-inline-demo" :cols="4">
      <div v-for="(tile, index) in columnList" :key="index" style="margin:0 10px;">
        <img :src="tile.img" style="width:214px;height:110px;border-radius:5px;">
        <span style="margin-left: 30%;">{{tile.name}}</span>
      </div>
    </mu-grid-list>
    <mu-row class="headTitle">
      <span>精选专栏</span>
      <router-link to="/imgList">
        <span>查看全部></span>
      </router-link>
    </mu-row>
    <mu-col span="12" v-for="(item,index) in typeList" :key="index">
      <mu-sub-header>{{item.title}}</mu-sub-header>
      <mu-grid-list class="gridlist-demo" :cols="3">
        <div v-for="(tile,index) in item.st" :key="index" class="itemStyle">
          <div class="item_top">
            <img :src="tile.img" @click="checkUserPhotoGroup(tile.id)">
          </div>
          <div class="item_bottom" @click="checkUser(tile.uid)">
            <img :src="tile.icon">
            <span>{{tile.nickname}}</span>
          </div>
        </div>
      </mu-grid-list>
    </mu-col>
    <div style="height:60px;width:100%;"></div>
  </div>
</template>

<script>
import {
  HomeAutoImg,
  HomeCircleList,
  HomeMajorList,
  ChoiceList,
  GetMessage
} from "@/api/homepage/index";
//引入muse-ui的插件
import Toast from "muse-ui-toast";
let Heartbeat;
export default {
  name: "tabbar",
  data() {
    return {
      //搜索内容
      value2: "",
      //轮播
      banner: [
      
      ],
      circleBlock: [
      
      ],
      columnList: [
      ],
      typeList: [],
      h: "",
      refreshing: false,
      loading: false,
      text: "List",
      size: 56,
      //快捷下拉跳转菜单
      open: false,
      trigger: null,
      NewMessage:'0',
    };
  },
  mounted() {},
  computed: {
    headerStyle() {
      return Math.min(1, Math.max(0, 1 - this.pullDownY / 40));
    }
  },
  created() {
    this.getBanner();
    this.getCircle();
    this.getFeature();
    this.getChoiceList();
    console.log(sessionStorage.getItem('token'))
    if(sessionStorage.getItem('token')){
      this.heart()
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
    //获取首页必要资源
    async getBanner() {
      const { code, data, msg } = await HomeAutoImg();
      if (code == "1") {
        this.banner = data;
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    async getCircle() {
      const { code, data, msg } = await HomeCircleList();
      if (code == "1") {
        this.circleBlock = data;
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    async getFeature() {
      const { code, data, msg } = await HomeMajorList();
      if (code == "1") {
        this.columnList = data;
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    async getChoiceList() {
      const { code, data, msg } = await ChoiceList();
      if (code == "1") {
        this.typeList = data;
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    //点击图片查看 图片组的详情
    async checkUserPhotoGroup(id) {
      this.$router.push({ path: "/imgPriew", query: { id } });
    },
    //点击头像查看 用户的资料
    async checkUser(uid) {
      this.$router.push({ path: "/others", query: { id: uid } });
    },
    async goGroupDetails(cid, name,img) {
      console.log(img)
      sessionStorage.setItem('bgimg',img)
      this.$router.push({ path: "/group", query: { cid, name } });
    }
  }
};
</script>

<style scoped lang="less">
.APPtitle {
  display: flex;
  justify-content: center;
  div{
    margin: 0 auto;  
    img{
      position: relative;
      top: 7px;
    }
  }
}
input::-webkit-input-placeholder{
    // line-height: 1;
}

.circleStyle {
  width: 100%;
  padding-left: 10%;
  .mu-paper {
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }
  span {
    font-size: 12px;
    height: 16px;
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10%;
  }
}
.gridlist-inline-demo {
  margin: 0 !important;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  .mu-grid-tile-wrapper {
    width: 214px !important;
    height: 110px !important;
  }
}
.gridlist-inline-demo::-webkit-scrollbar {
  display: none;
}
.headTitle {
  display: flex;
  justify-content: space-between !important;
  padding: 10px;
  font-size: 16px;
  margin: 10px 0;
  span:nth-child(1) {
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  a {
    span {
      font-size: 12px;
      color: #bfbfbf;
    }
  }
}
.demo-paper {
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.mu-sub-header {
  padding: 0;
  color: #000;
}

.itemStyle {
  display: flex;
  width: 32%;
  padding: 10px;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.13);
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 2px;
  .item_top {
    img {
      width: 100%;
      height: 100px;
      border-radius: 5px;
    }
  }
  .item_bottom {
    display: flex;
    img {
      width: 20px;
      height: 20px;
      background: rgba(0, 0, 0, 1);
      border-radius: 50%;
    }
    span {
      padding-left: 10px;
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
.TOP{
  width:100%;
  background:linear-gradient(180deg,rgba(252,234,29,1),rgba(255,170,59,1));
  border-radius:10px 10px 30px 30px;
  height: 200px;
  .mu-carousel{
    height: 160px;
    width: 95%;
    margin: 0 auto;
    position: relative;
    top: 20px;
    border-radius:10px;
  }
}
.circleList{
  margin-top: 50px;
}
</style>
 

  
  
  
  
  

