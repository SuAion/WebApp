<template>
  <div class="imageListPage">
    <mu-appbar color="#f56e9c">
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
     交友聊天
    </mu-appbar>
    <mu-container>
      <mu-tabs
        :value.sync="active"
        inverse
        color="secondary"
        text-color="rgba(0, 0, 0, .54)"
        full-width
      >
        <mu-tab>青春</mu-tab>
        <mu-tab>发现</mu-tab>
        <mu-tab>同城</mu-tab>
        <mu-tab>萌新</mu-tab>
      </mu-tabs>
      <div class="demo-text" v-if="active === 0">
        <mu-paper :z-depth="1" class="demo-loadmore-wrap">
          <mu-container ref="container" class="demo-loadmore-content">
            <mu-load-more
              @refresh="refresh"
              :refreshing="refreshing"
              :loading="loading"
              @load="load"
            >
            <mu-carousel transition="fade" style="height:150px" :hide-indicators='indicators'  :hide-controls='controls'>
                <mu-carousel-item
                v-for="(item,index) in banner"
                :key="index"
                style="height:150px;padding:10px"
                >
                <img :src="item.img">
                </mu-carousel-item>
            </mu-carousel>
              <mu-grid-list v-for="(item,index) in chatUserList"  :key='index' class="gridlist-demo" :cols="1">
                <div class="item_chatUser">
                    <div class="item_head"><img :src="item.userHead" alt=""></div>
                    <div class="item_content">
                        <p><span>{{item.userName}}</span> <span>{{item.year}}</span></p>
                        <p>{{item.price}}趣豆/条(消息)</p>
                        <p>点击查看资料</p>
                    </div>
                    <div class="item_foot">
                        <p><span>{{item.adress}}</span></p>
                        <p><span class="iconfont icon-xiaoxi" style="color:#E7854B"></span></p>
                    </div>
                </div>
              </mu-grid-list>
            </mu-load-more>
          </mu-container>
        </mu-paper>
      </div>
      <div class="demo-text" v-if="active === 1">
        <p>“我的心从来没有这么坚定过，所以我会为了补偿而死，也可以为了补偿而死……一辈子，急辈子都无所谓，我绝不后退！”</p>
        <p>“如果我后退呢？如果我想要死呢？我不想你再次背对着我逃跑了……”</p>
        <p>“那么就去地狱找到你，我绝对不逃！”</p>
        <p>“白痴，你也哭了？因为那些软弱拖累你的脚步？”</p>
      </div>
      <div class="demo-text" v-if="active === 2">
        <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
        <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
        <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
        <p>“也许吧，未来……给你了。”</p>
      </div>
      <div class="demo-text" v-if="active === 3">
        <p>“不，这泪水……是因为勇气，因为力量，因为信任，……你不会懂的！”</p>
        <p>“我不会帮你，想要什么样的未来……自己去追寻吧！”</p>
        <p>“我不需要你的帮忙！未来我会一手开启，什么样的敌人我也不会惧怕……还有，其实我们可以成为朋友的……”</p>
        <p>“也许吧，未来……给你了。”</p>
      </div>
    </mu-container>
  </div>
</template>
<script>
import { userList } from "@/api/main";
//引入muse-ui的插件
import Toast from "muse-ui-toast";

export default {
  name: "tabbar",
  data() {
    return {
      //搜索内容
      active: 0,
      indicators:true,
      controls:true,
      //轮播
      banner: [
       
      ],
      //下拉刷新内容测试
      chatUserList: [
      ],
      num: 10,
      refreshing: false,
      loading: false,
      text: "List",
      h: ""
    };
  },
  computed: {
    headerStyle() {
      return Math.min(1, Math.max(0, 1 - this.pullDownY / 40));
    }
  },
  mounted() {
    this.h = window.screen.height;
  },
  methods: {
    refresh() {
      this.refreshing = true;
      this.$refs.container.scrollTop = 10;
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.chatUserList.push.apply(this.chatUserList, this.chatUserList);
      }, 2000);
    }
  }
};
</script>

<style scope lang="less">
p{
            margin: 0;
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

.item_chatUser{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 20px 15px;
    .item_head{
        // margin-top: 5%;
        img{
            width:119px;
            height:132px;
        }
    }
    .item_content{
        margin-left: 20px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        
        >p:nth-child(1){
            span:nth-child(1){
                font-size:14px;
                font-family:MicrosoftYaHei;
                font-weight:400;
                color:rgba(0,0,0,1);
            }
             span:nth-child(2){
                // display: inline-block;
                // width:55px;
                // height:21px;
                // border:1px solid rgba(206,206,206,1);
                // border-radius:11px;
            }
        }
        >p:nth-child(2){
            margin-top: 10px;
            flex-grow: 1;
            height:17px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,188,245,1);
            line-height:2px;
        }
         >p:nth-child(3){
            font-weight:400;
            color:#000;
        }
     }
    .item_foot{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

}


</style>
 

  
  
 

