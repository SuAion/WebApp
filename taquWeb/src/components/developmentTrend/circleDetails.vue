<template>
  <div class="dynamicDetails">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>帖子详情
      <mu-menu slot="right" v-show="this.userUid!==this.mineUid" >
        <mu-button flat>更多</mu-button>
        <mu-list slot="content">
          <mu-list-item button  @click="chatSomeone(userUid,userNickname)">
            <mu-list-item-content>
              <mu-list-item-title >与TA聊天</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-container ref="container" class="demo-loadmore-content">
      <mu-load-more :loading="loading" @load="load">
        <div class="info">
          <div class="infoHead">
            <div>
              <img :src="dynamic.icon" alt @click="checkUser(dynamic.uid)">
              <span>{{dynamic.nickname}}</span>
            </div>
            <div>
              <mu-button
              v-show="this.userUid!==this.mineUid" 
                v-if="isfollow"
                @click="PersonCollectionDel(dynamic.uid)"
                style="float:right"
                small
                color="secondary"
              >
                <mu-icon left flat value="person"></mu-icon>已关注
              </mu-button>
              <mu-button
                v-else
                v-show="this.userUid!==this.mineUid" 
                @click=" PersonCollection(dynamic.uid)"
                style="float:right"
                small
                color="secondary"
              >
                <mu-icon left flat value="person_add"></mu-icon>关注
              </mu-button>
            </div>
          </div>
          <div class="infoContent">
            <p>{{dynamic.content}}</p>

            <!-- <img :src="dynamic.img" preview="1" alt> -->
              <div >
                <img :src="dynamic.img[0]" alt="" preview="1" style="width: 100%"  v-if="dynamicLength === 1 ">
                <div class="imgGroup" v-else
                 :style="dynamicLength<4?'grid-template-rows: 102px;':dynamicLength<7?'grid-template-rows: 107px 107px;':'grid-template-rows: 107px 107px 107px;'">
                <img  :src="imgs" preview="1"  v-for="(imgs,index) in dynamic.img"  :key="index">
                </div>
              </div>
          </div>
          <div class="infofoot">
            <div></div>
            <div>
              <span class="iconfont icon-pinglun" @click="opencommentBox('','')"></span>
              {{dynamic.commentCount}}
            </div>
            <div>
              浏览
              {{dynamic.click}}
            </div>
          </div>
        </div>
        <div class="pageComment" style="padding: 10px;" >
          <div class="itemComment" v-for="(item,index) in comment" v-if="comment!==false" :key="index">
            <div>
              <div class="itemHead" >
                <div>
                  <img :src="item.icon" alt @click="checkUser(item.uid)" >
                  <span>{{item.nickname}}</span>
                </div>
                <div @click="opencommentBox(item.id,item.pid)">{{changeTime(item.create_time)}}</div>
              </div>
              <div class="itemcontent" @click="opencommentBox(item.id,item.pid)">
                <span class="contentStyle2">{{item.comment}}</span>
                <div class="replayComment">
                  <div v-for="(titl,num) in item.replay" v-if="num>=1" :key="num">
                    <p v-if="titl.rnickname==undefined">
                      <span class="contentStyle">{{titl.nickname}}</span>:
                      <span class="contentStyle2">{{titl.comment}}</span>
                    </p>
                    <p v-else>
                      <span class="contentStyle">{{titl.rnickname}}</span> 回复
                      <span class="contentStyle">{{titl.nickname}}</span> :
                      <span class="contentStyle2">{{titl.comment}}</span>
                    </p>
                  </div>
                  <p
                    @click="openFullscreenDialog(comment[index],index)"
                    v-if="item.replay"
                  >查看更多{{item.replay.length}}条评论</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mu-load-more>
    </mu-container>
    <!-- 评论更多内容 -->
    <mu-dialog
      width="360"
      transition="slide-bottom"
      fullscreen
      scrollable
      :open.sync="openFullscreen"
      :padding="paddingBottom"
    >
      <mu-appbar color="primary" :title="fullIndex+'楼的回复'">
        <mu-button slot="left" icon @click="closeFullscreenDialog">
          <mu-icon value="close"></mu-icon>
        </mu-button>
      </mu-appbar>
      <div style="padding: 10px;" class="fullContent">
        <div class="contentFirst">
          <div class="fullFirst">
            <div>
              <img :src="fullContent.icon" alt>
              <span>{{fullContent.nickname}}</span>
            </div>
            <span>{{changeTime(fullContent.create_time)}}</span>
          </div>
          <div @click="opencommentBox(fullContent.id,fullContent.pid)">{{fullContent.comment}}</div>
        </div>
        <p style="border-top:10px solid #eee;padding-top:10px;">所有回复</p>
        <div class="contentReplay" v-for="(item,index) in fullContent.replay" :key="index">
          <div
            v-if="item.ricon"
            class="contentFirst"
            style="padding: 10px 0;border-bottom: 2px solid #eee;"
            @click="opencommentBox(item.id,item.pid)"
          >
            <div class="fullFirst">
              <div>
                <img :src="item.ricon">
                <span>{{item.rnickname}}</span>
              </div>
              <span>{{changeTime(item.create_time)}}</span>
            </div>
            <div>{{item.comment}}123456</div>
          </div>
          <div
            v-else
            class="contentFirst"
            @click="opencommentBox(item.id,item.pid)"
            style="padding: 10px 0;border-bottom: 2px solid #eee;"
          >
            <div class="fullFirst">
              <div>
                <img :src="item.icon">
                <span>{{item.nickname}}</span>
              </div>
              <span>{{changeTime(item.create_time)}}</span>
            </div>
            <div>{{item.comment}}</div>
          </div>
        </div>
      </div>
    </mu-dialog>
    <div class="commentText" v-if="commentBox">
      <input
        type="text"
        v-model="replayText"
        id="commentInput"
        v-focus
        placeholder="说点什么...."
        @blur="commentBox=false"
      >
      <mu-button flat @click="sendComment" color="primary">→发送</mu-button>
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
import Toast from "muse-ui-toast";
import {
  DynamicDetail,
  PersonCollection,
  PersonCollectionDel,
  DynamicComment,
  circleComment,
  ArticleDetail,
  GetUserMsg
} from "@/api/dynamic/dynamicDetails";
import jsonToFormData from "@/common/js/jsonToFormData";

export default {
  name: "follow",
  data() {
    return {
      active: "0",
      dynamic: {},
      comment: [],
      loading: false,
      cid: "",
      refreshing: false,
      isfollow: false,
      //打开外层的
      openFullscreen: false,
      //外层评论页码数量
      CrerentPage: 1,
      //内层评论
      fullContent: {},
      fullIndex: 0,
      paddingBottom: 0,
      //评论弹窗
      commentBox: true,
      id: "",
      pid: "",
      replayText: "", //回复内容
      qid:'',
      dynamicLength:0,
      /** */
      chongzhiAlert:false,
      userNickname:'',
      userUid:'',
      mineUid:'',
      repeat:true
    };
  },
  created() {
    this.qid = this.$route.query.qid;
    this._getcircleDetail();
    this.getuser()
    
  },
  methods: {
      //请求个人信息
    async getuser() {
      const params = {
        token: sessionStorage.getItem("token"),
      };
      const { code, data, msg } = await GetUserMsg(params);
      if (code == "1") {
        console.log(data.uid)
         this.mineUid=data.uid
      } else {
        // Toast.message(msg);
      }
    },
      //与默认聊天
    async chatSomeone(id,nickname) {
      console.log(id,nickname)
      this.$router.push({ path: "/chating", query: { id, nickname} });
    },
    //评论的弹窗
    openFullscreenDialog(obj, index) {
      console.log(obj, index);
      this.fullContent = obj;
      this.fullIndex = index + 1;
      this.openFullscreen = true;
      // console.log(this.fullContent);
    },
    closeFullscreenDialog() {
      this.openFullscreen = false;
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.CrerentPage++;
        this._getcircleDetail();
      }, 2000);
    },
    //获取列表信息
    async _getcircleDetail() {
      const params = {
        token: sessionStorage.getItem("token"),
        qid: this.qid,
        cPage: {
          //评论区域
          page: this.CrerentPage,
          limit: 10
        },
        rPage: {
          //回复区域
          page: 1,
          limit: 10
        }
      };
      const { data, msg, code } = await ArticleDetail(params);
      if (code == "1") {
        this.dynamic = data.list;
        this.userNickname =data.list.nickname;
        this.userUid =data.list.uid;
        this.dynamicLength =data.list.img.length;
       this.$previewRefresh()
        // this.comment = data.comment;
        // if(this.CrerentPage!==1){
        // }
        if(data.comment==false){
           console.log(data.comment)
          this.CrerentPage--;
        } else {
           this.comment = this.comment.concat(data.comment);
        }
      }
    },
    //取消关注
    async PersonCollection(uid) {
      console.log(uid)
      const params = {
        token: sessionStorage.getItem("token"),
        guid: 1
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
    async PersonCollectionDel(uid) {
      console.log(uid)
      const params = {
        token: sessionStorage.getItem("token"),
        guid: uid
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
    },
    //
    opencommentBox(id, pid) {
      this.commentBox = true;
      this.id = id;
      this.pid = id;
    },
    async sendComment() {
      const params = {
        token: sessionStorage.getItem("token"),
        res: this.id, //回复人的id
        comment: this.replayText,
        pid: this.pid, //那条评论的id //不填为一级评论
        cid: this.qid
      };
        const { data, msg, code } = await circleComment(jsonToFormData(params));
        if (code == "1") {
          this.comment = [];
          this.CrerentPage--;
          this._getcircleDetail();
          Toast.message(data);
        }else if (code == "-1") {
          this.chongzhiAlert=true
        }
         else {
          Toast.error(data);
      }
    },
     //购买对话框
    openchongzhiDialog() {
      this.$router.push({ path: "/walletIndex", query: {} });
    },
    closechongzhiDialog() {
      this.chongzhiAlert = false;
    },
        //点击头像查看 用户的资料
    async checkUser(uid) {
      this.$router.push({ path: '/others', query: { id:uid }});
    },
    
  }
};
</script>

<style scoped lang="less">
.dynamicDetails {
  .info {
    .infoHead {
      height: 60px;
      width: 100%;
      padding: 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div{
        img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
      }
      > span {
        width: 42px;
        height: 13px;
        font-size: 13px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        position: relative;
        bottom: 12px;
      }
      }
    }
    .infoContent {
      padding: 10px;
      p {
      }
      img{
          width: 115px;
      }
    }
    .infofoot {
      margin-top: 10px;
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
  .pageComment {
    .itemComment {
      margin-bottom: 10px;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
      .itemHead {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          width: 46px;
          height: 46px;
          border-radius: 50%;
        }
        span {
          height: 16px;
          font-size: 17px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          position: relative;
          bottom: 16px;
        }
      }
      .itemcontent {
        .replayComment {
          background: #efefef;
          padding-left: 10px;
        }
        margin-left: 15%;
        .contentStyle3 {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
        }
        .contentStyle2 {
          height: 18px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          word-break: break-all;
        }
        .contentStyle {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(255, 110, 188, 1);
          word-break: break-all;
        }
      }
    }
  }
}
.fullContent {
  .fullFirst {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      img {
        width: 46px;
        height: 46px;
        border-radius: 50%;
      }
      span {
        height: 16px;
        font-size: 15px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        position: relative;
        bottom: 10px;
      }
    }
  }
  div:nth-child(2) {
    margin-left: 15%;
  }
}
.commentText {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  z-index: 999;
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
.imgGroup {
    display: grid;
    grid-template-columns: 120px 120px 115px;
    margin: 5px 0 0;
    img{
      // width: 100%;
      // max-height: 300px;
       margin: 0 0 2px;
       width: 100px;
       height: 100px;
    }
}


</style>
