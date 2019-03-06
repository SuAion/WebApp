<template>
  <div class="speak_content">
    <!--<header :style="{backgroundImage:'url(' + bgimg + ')',backgroundSize: '100% 200%'}">-->
      <!--<div>-->
        <!--<mu-button icon slot="left" @click="$router.back(-1)">-->
          <!--<mu-icon value="keyboard_arrow_left" color="#fff" size=30></mu-icon>-->
        <!--</mu-button>-->
        <!--<span>{{circleName}}</span>-->
      <!--</div>-->
      <!--<mu-button v-if="isfollow" @click="escfollowCircle(cid)" flat color="rgb(245, 110, 156)" style="float:right">-->
        <!--<mu-icon left value="star"></mu-icon>-->
        <!--已关注-->
      <!--</mu-button>-->
      <!--<mu-button v-else @click="followCircle(cid)" flat color="rgb(245, 110, 156)" style="float:right">-->
        <!--<mu-icon left value="star_border"></mu-icon>-->
        <!--关注-->
      <!--</mu-button>-->
    <!--</header>-->

    <header>
      <div>
        <mu-button icon slot="left" @click="$router.back(-1)">
          <mu-icon value="keyboard_arrow_left" color="#fff" size=30></mu-icon>
        </mu-button>
        <span>{{circleName}}</span>
      </div>
      <mu-button v-if="isfollow" @click="escfollowCircle(cid)" flat color="rgb(245, 110, 156)" style="float:right">
        <mu-icon left value="star"></mu-icon>
        已关注
      </mu-button>
      <mu-button v-else @click="followCircle(cid)" flat color="rgb(245, 110, 156)" style="float:right">
        <mu-icon left value="star_border"></mu-icon>
        关注
      </mu-button>
      <div class="blur" :style="{backgroundImage:'url(' + bgimg + ')',backgroundSize: '100% 100%'}"></div>
      <!--<img :src="bgimg" alt="" >-->
    </header>


    <!-- 发布 -->
    <div class="addPost">
      <img src="../../../static/fabu.png" alt="" @click="goPublishPost(cid)">
    </div>

    <mu-container style="padding: 0">
      <mu-tabs :value.sync="active2" inverse color="rgba(0, 0, 0, 1)" indicator-color="">
        <mu-tab>全部</mu-tab>
        <mu-tab>新鲜</mu-tab>
        <!-- <mu-tab>精华</mu-tab> -->
        <!-- <mu-tab>图片</mu-tab> -->
      </mu-tabs>
    </mu-container>
    <mu-load-more :loading="loading" @load="load">
      <div class="itemDetails" v-for="(tile,index) in details" :key="index" @click="checkDetails(tile.qid)">
        <div class="Detail_head">
          <div>
            <img :src="tile.icon" alt>
          </div>
          <div>
            <p>{{tile.nickname}}</p>
            <!-- <p>
                    <span>{{tile.kind}}</span>
            </p>-->
          </div>
        </div>
        <div class="Detail_content">
          <p @click="checkDetails(tile.qid)">
            <span>{{tile.title}}</span>
          </p>
          <p @click="checkDetails(tile.qid)">{{tile.content}}</p>
          <div v-if="tile.img">
            <img :src="tile.img" alt="" style="width: 100%" v-if=" typeof tile.img=='string'">
            <div class="imgGroup" v-else
                 :style="tile.img.length<4?'grid-template-rows: 102px;':tile.img.length<7?'grid-template-rows: 105px 105px;':'grid-template-rows: 105px 105px 104px;'">
              <img alt="" v-for="(imgs,index) in tile.img" :src="imgs" :key="index">
            </div>
          </div>
        </div>
        <div class="Detail-foot">
          <div>
            <span>浏览</span>
            {{tile.click}}
          </div>
          <div>
            <!-- <span class="iconfont icon-dianzan"></span>
            {{tile.goodNum}}-->
          </div>
          <div>
            <span class="iconfont icon-pinglun"></span>
            {{tile.comment_count}}
          </div>
        </div>
      </div>
    </mu-load-more>
  </div>
</template>

<script>
  import Toast from "muse-ui-toast";
  import {
    CircleDetail,
    CollectionCircle,
    CollectionCircleDel
  } from "@/api/community/group";
  import {transStamp2} from "@/common/js/timeStamp";

  export default {
    name: "group",
    data() {
      return {
        active2: 0,
        details: [],
        loading: false,
        page: 1,
        cid: '',
        circleName: '',
        isfollow: '',
        bgimg: '',
      };
    },
    created() {
      this.cid = this.$route.query.cid
      this.circleName = this.$route.query.name
      this.bgimg = sessionStorage.getItem('bgimg')
      console.log(this.bgimg)
      this._getDynamicList();
    },
    methods: {
      //去发布帖子
      goPublishPost(cid) {
        this.$router.push({path: '/pulishPost', query: {cid: cid}});
      },
      //获取帖子列表
      async _getDynamicList() {
        const params = {
          token: sessionStorage.getItem("token"),
          cid: this.cid,
          page: this.page,
        };
        const {code, data, msg} = await CircleDetail(params);
        if (code == "1") {
          this.details = data.list;
          if (data.care == 1) {
            this.isfollow = true
          } else if (data.care == 0) {
            this.isfollow = false
          }

          this.$previewRefresh()
        } else {
          if (this.page == 1) {
            this.page--;
          }
          this.$toast.message(data);
        }
      },

      //点击回复刷新
      load() {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          this._getDynamicList();
          this.loading = false;
        }, 500);
      },
      //关注莫个圈子
      async escfollowCircle(cid) {
        const params = {
          token: sessionStorage.getItem("token"),
          cid: this.cid,
        };
        const {code, data, msg} = await CollectionCircleDel(params);
        if (code == "1") {
          this.isfollow = false;
          Toast.message(data);
        } else {
          Toast.message(data);
        }
      },
      //取消关注
      async followCircle(cid) {
        const params = {
          token: sessionStorage.getItem("token"),
          cid: this.cid,
        };
        const {code, data, msg} = await CollectionCircle(params);
        if (code == "1") {
          this.isfollow = true;
          Toast.message(data);
        } else {
          Toast.message(data);
        }
      },
      //查看帖子详情
      async checkDetails(qid) {
        this.$router.push({path: '/circleDetails', query: {qid: qid,}});
      }
    }
  };
</script>

<style scoped lang="less">
  .blur{
    z-index: -100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    width: 100%;
    -webkit-filter: blur(10px); /* Chrome, Opera */
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);

    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
  }
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
  .itemDetails {
    padding: 10px;
    .Detail_head {
      display: flex;
      > div:nth-child(1) {
        padding-right: 10px;
        img {
          width: 57px;
          height: 57px;
          border-radius: 50%;
        }
      }
      > div:nth-child(2) {
        display: flex;
        flex-direction: column;
        padding-top: 15px;
        p {
          font-size: 16px;
        }
      }
    }
    .Detail_content {
      padding-top: 10px;
      p:nth-child(1) {
        height: 28px;
        font-size: 18px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
    }
    .imgGroup {
      display: grid;
      grid-template-columns: 105px 105px 105px;
      margin: 5px 0 0;
      img {
        // width: 100%;
        // max-height: 300px;
        margin: 0 0 2px;
        width: 100px;
        height: 100px;
      }
    }

    .Detail-foot {
      display: flex;
      padding-top: 10px;
      > div:nth-child(1) {
        flex-grow: 1;
      }
      > div:nth-child(2) {
        margin-right: 10px;
      }
      > div:nth-child(3) {
        margin-right: 10px;
      }
    }
  }

  header {
    height: 80px;
    // background-color:#f56e9c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 80px;
    span {
      font-size: 16px;
      vertical-align: super;
      color: #fff;
    }
  }

  .addPost {
    width: 100%;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 45%;
    z-index: 999999999;
  }
</style>
