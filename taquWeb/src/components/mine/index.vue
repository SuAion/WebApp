<template>
  <div class="mine_index">
    <div class="mine_index_top" color="#f56e9c">
      <div class="banner">
        <div class="ban_Icon">
          <!--<span class="iconfont icon-shezhi" @click="$router.push({path: '/setup'})"></span>-->
          <mu-menu cover placement="bottom-end" :open.sync="open">
            <mu-button icon>
              <span class="iconfont icon-shezhi"></span>
            </mu-button>
            <mu-list slot="content">
              <!-- <mu-list-item>
                <mu-list-item-action  @click='$router.push({ path: "/dynamicIndex" })'>
                  <mu-icon value="settings"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>设置</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>-->
              <!-- <mu-list-item >
                <mu-list-item-action>
                  <mu-icon value="help_outline"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>帮助</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item> -->
              <!-- <mu-divider></mu-divider> -->
              <mu-list-item button  @click="logout()">
                <mu-list-item-action>
                  <mu-icon value="power_settings_new" ></mu-icon>
                </mu-list-item-action>
                <mu-list-item-content @click="logout()">
                  <mu-list-item-title >退出</mu-list-item-title>
                </mu-list-item-content>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </div>
      </div>

      <div class="business_card">
        <mu-row>
          <mu-col span="4">
            <img :src="info.icon" alt class="header_img">
          </mu-col>
          <mu-col span="8">
            <div>
              <p class="box_name">
                {{info.nickname}}
                <img
                  src="../../assets/image/female.jpg"
                  alt
                  style="width: 14px"
                  v-if="info.sex=='2'"
                >
                <img src="../../assets/image/male.jpg" alt style="width: 14px" v-if="info.sex=='1'">
              </p>
              <p class="grade">
                <i class="cubeic-vip"></i>
                LV {{info.vip}}
              </p>
              <p class="PersonalizedSignature">{{info.autograph?info.autograph:'此人什么也没留下...'}}</p>
            </div>
          </mu-col>
        </mu-row>
      </div>
    </div>

    <div class="mine_index_centre">
      <div>
        <div class="centre_top">
          <div @click="PageSkipping('/mineFollow','0')">
            <img src="../../assets/heart.png" alt>
            <p>关注</p>
          </div>
          <div @click="PageSkipping('/mineFollow','1')">
            <img src="../../assets/circle.png" alt>
            <p>圈子</p>
          </div>
          <div @click="PageSkipping('/mineFollow','2')">
            <img src="../../assets/fans.png" alt>
            <p>粉丝</p>
          </div>
        </div>
        <div class="centre_bottom">
          <div @click="PageSkipping('/myselfSpeak','0')">
            <img src="../../assets/myselfSpeak.png" alt>
            <p>我的发言</p>
          </div>
          <div>
            <img
              src="../../assets/myselfMoney.png"
              alt
              @click="$router.push({path: '/walletIndex'})"
            >
            <p>我的金币</p>
          </div>
          <div>
            <img src="../../assets/myselfOrder.png" alt @click="$router.push({path: '/orderPage'})">
            <p>我的订单</p>
          </div>
          <div>
            <img src="../../assets/artificial.png" @click="$router.push({path: '/help'})" alt>
            <p>帮助中心</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mine_index_bottom">
      <div class="bottom_box">
        <div @click="$router.push({path: '/dynamicAlbumList'})">
          <img src="../../assets/image/PublishImg.png" alt>
          <span>发表图片</span>
        </div>
        <div @click="$router.push({path: '/dynamicIndex'})">
          <img src="../../assets/image/dynamic.png" alt>
          <span>写动态</span>
        </div>
        <div>
          <img src="../../assets/image/FriendsList.png" alt>
          <span>好友列表</span>
        </div>
        <div style="border: 0px" @click="$router.push({path: '/edit'})">
          <img src="../../assets/image/EditorPersonal.png" alt>
          <span>修改个人资料</span>
        </div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { userinfo, login } from "@/api/mine";
import jsonToFormData from "@/common/js/jsonToFormData";
import { token } from "@/common/js/token";
//引入muse-ui的插件
import Toast from "muse-ui-toast";

export default {
  name: "tabbar",
  data() {
    return {
      info: "",
      open: false
    };
  },
  created() {
    this._getDetails();
  },
  methods: {
    logout(){
     sessionStorage.removeItem('token'),
      this.$router.push({ path: '/login' });
      Toast.success('退出成功');
    },
    async _getDetails() {
      const params = {
        token:sessionStorage.getItem("token")
      };
      const { code, data, msg } = await userinfo(params);
      if (code == "1") {
        for(let key in data){
            if(data[key]=='null'||data[key]=='undefined'){
              data[key]='说点什么吧'
            }
        }
        this.info = data;
      }
      // const {code, data, msg} = await login(jsonToFormData(params));
    },
    PageSkipping(url, num) {
      this.$router.push({ path: url, query: { type: num } });
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
}

.mine_index {
  height: auto;
}

.mine_index_top {
  overflow: hidden;
}

.ban_Icon {
  text-align: right;
  margin-right: 18px;
  padding-top: 10px;
}

.ban_Icon span {
  font-size: 24px;
  color: white;
}

.banner {
  width: 100%;
  height: 150px;
  /*background: url("../../assets/mine_bn.png") no-repeat center center / cover;*/
  background: url("../../assets/mine_bn.png") no-repeat;
}

.business_card {
  width: 94%;
  height: 120px;
  margin: auto;
  position: absolute;
  background: white;
  border-radius: 18px;
  top: 12%;
  left: 0;
  right: 0;
  /*box-shadow: 6px 6px 5px #4a4a4a2b;*/
  border: 1px solid #f1f1f1;
  padding: 20px 20px;
}

.box_name {
  text-align: left;
  font-weight: 600;
}

.PersonalizedSignature {
  font-size: 14px;
  color: #b3b3b3;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header_img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 5px;
}

.grade {
  display: inline-block;
  margin: 10px 50% 10px 0;
  padding: 2px 5px;
  color: #dd7639;
  border: 1px solid #dd7639;
  border-radius: 10px;
}

.mine_index_centre,
.mine_index_bottom {
  width: 94%;
  margin: 70px auto 0;
  background: white;
  border-radius: 18px;
  border: 1px solid #f1f1f1;
  box-shadow: 6px 6px 5px #4a4a4a2b;
}

.mine_index_centre > div {
  padding: 20px 20px;
}

.centre_top {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  margin-bottom: 20px;
}

.centre_bottom {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

.centre_top img {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.centre_bottom img {
  margin-bottom: 4px;
}

.centre_bottom div {
  text-align: center;
}

.mine_index_bottom {
  margin: 12px auto 56px;
}

.bottom_box {
  padding: 0 20px;
  text-align: left;
}

.bottom_box > div {
  border-bottom: 1px solid #e2e2e2;
  padding: 5px 0;
}

.bottom_box img {
  vertical-align: bottom;
}

.bottom_box i {
  font-size: 24px;
  margin-right: 12px;
}
</style>
