<template>
  <div class="community">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <!-- <input type="text" v-model="value2" placeholder="请输入要搜索的圈子"> -->
      社区
   
    </mu-appbar>

    <mu-load-more>
      <mu-row class="headTitle">
        <span>好玩的圈子</span>
        <span @click="$router.push('/grouplist')">查看全部></span>
      </mu-row>
      <mu-grid-list class="gridlist-inline-demo" :cols="4">
        <div
          v-for="(tile, index) in circleBlock"
          :key="index"
          class="funnyCircle"
          @click="goGroupDetails(tile.cid,tile.name,tile.img)"
        >
          <div>
            <img :src="tile.img">
          </div>
          <p>{{tile.name}}</p>
        </div>
      </mu-grid-list>

      <mu-row class="headTitle">
        <span>关注有趣的人</span>
        <span>></span>
      </mu-row>
      <mu-grid-list class="gridlist-inline-demo" :cols="4">
        <div class="focus" v-for="(tile, index) in columnList" :key="index">
          <div>
            <img :src="tile.icon" @click="checkUser(tile.uid)">
          </div>
          <p>{{tile.nickname}}</p>
          <mu-button
            v-if="tile.care==1"
            @click="PersonCollectionDel(tile.uid,index)"
            style="float:right;font-size: 10px;"
            small
            color="secondary"
          >
            <mu-icon left flat value="person"></mu-icon>
            已关注
          </mu-button>
          <mu-button
            v-else-if="tile.care==0"
            @click=" PersonCollection(tile.uid,index)"
            style="float:right;font-size:10px;"
            small
            color="secondary"
          >
            <mu-icon left flat value="person_add"></mu-icon>
            关注
          </mu-button>
        </div>
      </mu-grid-list>

      <!-- <mu-row class="headTitle">
        <span>精选专栏</span>
        <span>查看全部></span>
      </mu-row> -->
      <mu-container>
        <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)">
          <mu-tab @click="change(active)">推荐</mu-tab>
          <!-- <mu-tab  @click="change(active)">视频</mu-tab> -->
          <mu-tab @click="change(active)">关注</mu-tab>
        </mu-tabs>
        <div class="demo-text">
          <mu-paper :z-depth="1" class="demo-loadmore-wrap">
            <mu-container ref="container" class="demo-loadmore-content">
              <mu-load-more
                :loading="loading"
                @load="load"
              >
                <mu-grid-list class="gridlist-demo" :cols="1">
                  <div class="invitation" v-for="(tile, index) in list" :key="index" @click="checkDetails(tile.qid)">
                    <mu-row class="invitation_head">
                      <mu-avatar>
                        <img :src="tile.icon"  @click="checkUser(tile.uid)">
                      </mu-avatar>
                      <div style="margin: 2px 0 0 5px">
                        <p>{{tile.nickname}}</p>
                        <p style="font-size: 12px;color: #818181; margin-bottom: 10px">
                          2018-9-6</p>
                      </div>
                    </mu-row>

                    <h3>{{tile.title}}</h3>
                    <p>{{tile.content}}</p>
                    <!-- 13156 -->
                    <div v-if="tile.img">
                        <img :src="tile.img[0]" alt="" style="width: 200px" v-if="tile.img.length==1">
                        <div class="wrapper" v-if="tile.img.length>1"
                          :style="tile.img.length<4?'grid-template-rows: 102px;':tile.img.length<7?'grid-template-rows: 102px 102px;':'grid-template-rows: 102px 102px 102px;'">
                          <img alt="" v-for="(imgs,index) in tile.img" :src="imgs" preview="1"  style="z-index:2"  :key="index">
                        </div>
                    </div>
                    <!-- 图片区 -->
                    <!-- <img :src="tile.img"> -->

                    <div class="invitation_foot">
                      <div>
                        <!-- <span class="iconfont icon-dianzan"></span> -->
                      <span>浏览次数</span>
                        {{tile.click}}次
                      </div>
                      <div>
                        <span class="iconfont icon-pinglun"></span>
                        {{tile.commentCount}}
                      </div>
                      <div>
                        <span class="iconfont icon-zhuanfa-mian"></span>
                        {{0}} 
                      </div>
                    </div>
                  </div>
                </mu-grid-list>
              </mu-load-more>
            </mu-container>
          </mu-paper>
        </div>
      </mu-container>
    </mu-load-more>
  </div>
</template>

<script>
import {
  FunCircleList,
  FunPersonList,
  CirclePush,
  CircleCare,
  PersonCollection,
  PersonCollectionDel
} from "@/api/community/index";
//引入muse-ui的插件
import Toast from "muse-ui-toast";

export default {
  name: "tabbar",
  data() {
    return {
      //搜索内容
      active: 0,
      //搜索内容
      value2: "",
      //轮播
      banner: [
      ],
      circleBlock: [
      
      ],
      columnList: [
       
      ],
      list: [],
      h: "",
      refreshing: false,
      loading: false,
      text: "List",
      size: 60,
      num: 1,
      isfollow: false
    };
  },
  computed: {
    headerStyle() {
      return Math.min(1, Math.max(0, 1 - this.pullDownY / 40));
    }
  },
  created() {
    this.FunCircle();
    this.CareFunPerson();
    this.CircleKind();
  },
  methods: {
    //加载更多
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.loading = false;
        this.num += 1;
        this.CircleKind();
      }, 500);
    },
    //获取首页必要资源
    async FunCircle() {
      const params = {
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await FunCircleList(params);
      if (code == "1") {
        this.circleBlock = data;
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    async CareFunPerson() {
      const params = {
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await FunPersonList(params);
      if (code == "1") {
        this.columnList = data;
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    async CircleKind() {
      const params = {
        token: sessionStorage.getItem("token"),
        type: 1
      };
      const { code, data, msg } = await CirclePush(params);
      if (code == "1") {
        if (this.num != 1) {
          this.list.push.apply(this.list, data);
        } else {
          this.list = data;
        }
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    async CircleCare() {
      const params = {
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await CircleCare(params);
      if (code == "1") {
        if (this.num != 1) {
          this.list.push.apply(this.list, data);
        } else {
          this.list = data;
        }
      } else {
        Toast.error("暂时没有更多数据");
      }
    },
    //切换分类
    change(value) {
      console.log(value);
      this.active = value;
      this.num = 1;
      this.list = [];
      this.CircleKind();
      if (value == "0") {
        this.CircleKind();
      } else if (value == "1") {
        this.CircleCare();
      }
    },
    async goGroupDetails(cid,name,img) {
      console.log(cid,name)
      sessionStorage.setItem('bgimg',img)
      this.$router.push({ path: "/group", query: { cid, name } });
    },
    //取消关注
    async PersonCollection(uid, index) {
      console.log(index, "12");
      const params = {
        token: sessionStorage.getItem("token"),
        guid: uid
      };
      const { code, data, msg } = await PersonCollection(params);
      if (code == "1") {
        this.isfollow = true;
         this.CareFunPerson();
        Toast.message(data);
      } else {
        this.isfollow = true;
        Toast.message(data);
      }
      console.log(this.arr);
    },
    //关注某人
    async PersonCollectionDel(uid, index) {
      console.log(index, "1");
      const params = {
        token: sessionStorage.getItem("token"),
        guid: uid
      };
      const { code, data, msg } = await PersonCollectionDel(params);
      if (code == "1") {
        this.isfollow = false;
         this.CareFunPerson();
        Toast.message(data);
      } else {
        Toast.message(data);
      }
    },
      //点击头像查看 用户的资料
    async checkUser(uid) {
      this.$router.push({ path: '/others', query: { id:uid }});
    },
    //查看帖子详情
    async  checkDetails(qid){
      this.$router.push({ path: '/circleDetails', query: { qid:qid}});
    }
  }
};
</script>

<style scoped lang="less">
.demo-loadmore-wrap {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  .mu-appbar {
    width: 100%;
  }
  input {
    height: 30px;
    outline: none;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
    font-size: 12px;
    width: 100%;
  }
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.circleStyle {
  padding: 0 10px;
  .mu-paper {
    width: 50px;
    height: 50px;
  }
}
.gridlist-inline-demo {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  .mu-grid-tile-wrapper {
    width: 110px !important;
    height: 100px !important;
    padding: 10px !important;
  }
}
.gridlist-inline-demo::-webkit-scrollbar {
  display: none;
}
.headTitle {
  display: flex;
  justify-content: space-between !important;
  padding: 0 10px;
  margin: 10px 0;
  span:nth-child(1) {
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
  }
  span:nth-child(2) {
    font-size: 12px;
    color: #bfbfbf;
  }
}
.invitation_head {
  span {
    padding-left: 10px;
    margin-top: 10px;
  }
}

.invitation {
  margin: 10px;
  width: 100%;
  .invitation_head {
    span {
      padding-left: 10px;
    }
  }
  h3 {
    margin: 5px !important;
  }
  p {
    /*width: 96% !important;*/
  }
  .invitation_foot {
    display: flex;
    > div:nth-child(1) {
      flex-grow: 1;
    }
    > div:nth-child(2) {
      margin-right: 10px;
    }
    > div:nth-child(3) {
      margin-right: 20px;
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

.focus {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  img {
    width: 85px;
    height: 85px;
    border-radius: 50%;
  }
  p {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(186, 186, 186, 1);
    margin: 5px !important;
  }
  button {
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
  }
}

//有趣的圈子
.funnyCircle {
  div {
    width: 117px;
    height: 125px;
    margin: 0 18px;
    border: 2px solid rgba(221, 221, 221, 1);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      width: 98px;
      height: 105px;
      border-radius: 5px;
    }
  }
  p {
    text-align: center;
    margin: 0 !important;
  }
}
.wrapper {
  display: grid;
  grid-template-columns: 102px 102px 102px;
  margin: 5px 0 0;
}

.wrapper img {
  margin: 0 0 2px;
  width: 100px;
  height: 100px;
}

</style>
 

  
  
  
  
  

