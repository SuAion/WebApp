<template>
  <div class="dynamicDetails">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>照片详情
      <mu-button flat slot="right" color="primary" @click="opencheckSpeedDialog()">
          查看更多
      </mu-button>
    </mu-appbar>

    <mu-container ref="container" class="demo-loadmore-content other_content">
      <mu-load-more  :loading="loading" @load="load" >
        <!-- <div v-for="(tile, index) in Block" :key="index" class="imgStyle">
            <img :src="tile.img" preview="1">
        </div>-->
        <div
          v-for="(item,index) in Block "
          ref="waterImg"
          :style="{width: waterfallW + 'px', height: item.imgH + 'px', left: item.left + 'px', top: item.top + 'px'}"
          :key="index"
        >
          <img alt :src="item.img" preview="1">
          <!--<img src="../../assets/image/dynamicImg.png" alt="">-->
          <!-- <div style="margin-top: 48px" v-if="index+1==Block.length"></div> -->
        </div>
      </mu-load-more>
    </mu-container>
    <!-- 对话框 -->
    <mu-dialog
      title="提示"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="checkSpeedAlert"
    >是否查看当前图册更多照片
      <mu-button slot="actions" flat color="primary" @click="opencheckSpeedDialog">同意</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closecheckSpeedDialog">拒绝</mu-button>
    </mu-dialog>

    <mu-dialog
      title="提示"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="goumaiAlert"
    >是否购买当前图册
      <mu-button slot="actions" flat color="primary" @click="opengoumaiDialog">同意</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closegoumaiDialog">拒绝</mu-button>
    </mu-dialog>

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
  BoutiqueBuy,
  AtlasCharge,
  AtlasDetail
} from "@/api/homepage/imagePriew";
//引入muse-ui的插件
import Toast from "muse-ui-toast";

export default {
  name: "follow",
  data() {
    return {
      active: "0",
      loading: false,
      cid: "",
      refreshing: false,
      isfollow: false,
      Block: [
       
      ],
      id: "",
      page: 0,
      //对话框
      checkSpeedAlert: false,
      goumaiAlert: false,
      chongzhiAlert: false,
      //pubuliu
      waterfallW: "",
      screenWidth: document.body.clientWidth // 屏幕宽度
    };
  },
  created() {
    this.id = this.$route.query.id;
    // 初始获取免费的接口
    this.getFreeList(this.id);
    //pubu
    this.waterfallW = (this.screenWidth - 30) / 2;
  },
  methods: {
    //对话框
    opencheckSpeedDialog() {
      //  this.comfirmAction()
      this.getSpeedList();
    },
    closecheckSpeedDialog() {
      this.checkSpeedAlert = false;
    },
    //购买对话框
    opengoumaiDialog() {
      this.comfirmAction();
    },
    closegoumaiDialog() {
      this.goumaiAlert = false;
    },
    //购买对话框
    openchongzhiDialog() {
      this.$router.push({ path: "/walletIndex", query: {} });
    },
    closechongzhiDialog() {
      this.chongzhiAlert = false;
    },

    //瀑布
    waterFall() {
      const gap = 8;
      let leftH = 0;
      let rightH = 0;
      this.Block.push({ src: "456" });
      setTimeout(() => {
        const imgArr = this.$refs.waterImg;
        for (let i = 0; i < imgArr.length; i++) {
          imgArr[i].style.position = "absolute";
          const domHeight = imgArr[i].clientHeight;
          let top;
          let left;
          let itemH;
          if (leftH > rightH) {
            left = gap * 2 + this.waterfallW;
            top = rightH + gap;
            itemH = domHeight;
            rightH += gap + domHeight;
          } else {
            left = gap;
            top = leftH + gap;
            itemH = domHeight;
            leftH += gap + domHeight;
          }
          this.Block[i].top = top;
          this.Block[i].left = left;
          this.Block[i].itemH = itemH;
          this.Block[i].itemW = this.waterfallW;
        }
      }, 100);
      setTimeout(() => {
        this.Block.pop();
      }, 100);
    },

    //下拉刷新
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        // this.checkSpeedAlert= true;
        this.getSpeedList();
        this.page++;
      }, 2000);
    },

    //购买借口
    async comfirmAction() {
      this.checkSpeedAlert = false;
      const params = {
        token: sessionStorage.getItem("token"),
        id: 1
      };
      const { data, code, msg } = await BoutiqueBuy(params);
      if (code == "1") {
        this.getSpeedList();
      } else {
        Toast.error(data);
        this.chongzhiAlert = true;
      }
    },

    //获取免费
    async getFreeList() {
      const params = {
        token: sessionStorage.getItem("token"),
        id: 1
      };
      const { data, code, msg } = await AtlasDetail(params);
      if (code == "1") {
        this.$previewRefresh()
        this.Block = data;
        this.waterFall();
      } else if (code == "-1") {
        Toast.error("暂时没有更多数据");
      }
    },

    //获取收费图册
    async getSpeedList() {
      this.checkSpeedAlert = false;
      const params = {
        token: sessionStorage.getItem("token"),
        id: 1,
        page: this.page
      };
      const { data, code, msg } = await AtlasCharge(params);
      if (code == "1") {
        this.Block = this.Block.concat(data);
        this.$previewRefresh()
        this.waterFall();
      } else if (code == "-2") {
        Toast.error(data);
        this.goumaiAlert=true;
      } else if (code == "-1") {
        Toast.error(data);
        this.page--;
      }
    },
    //取消关注
    async PersonCollection(did) {
      const params = {
        token: sessionStorage.getItem("token"),
        guid: did
      };
      const { code, data, msg } = await PersonCollection(params);
      if (code == "1") {
        this.isfollow = true;
        Toast.message(data);
      } else {
        this.isfollow = true;
        Toast.message(data);
      }
    },
    //关注某人
    async PersonCollectionDel(did) {
      const params = {
        token: sessionStorage.getItem("token"),
        guid: did
      };
      const { code, data, msg } = await PersonCollectionDel(params);
      if (code == "1") {
        this.isfollow = false;
        Toast.message(data);
      } else {
        Toast.message(data);
      }
    },
    //时间转换
    changeTime(time) {
      var unixTimestamp = new Date(time * 1000);
      let commonTime = unixTimestamp.toLocaleString();
      return commonTime;
    }
  }
};
</script>

<style  lang="less">
// .imgStyle {
//   padding: 10px 0;
//   img {
//     width: 100%;
//     height: 100%;
//     margin-bottom: 10px;
//   }
// }
.other_content {
  background: white;
  position: absolute;
  top: 65px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 5px 8px 0;
  >div {
    /*width: 50%;*/
    /*height: 50%;*/
    position: initial;
    img {
      width: 100%;
      /*height: 100%;*/
    }
  }
}
  .mu-circle-gap-patch {
      // position: relative !important;
    }
 .mu-infinite-scroll {
    position: fixed !important;
    bottom: 0;
  }
  
</style>
