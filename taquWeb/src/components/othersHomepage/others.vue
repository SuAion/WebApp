<template>
  <div class="mine_index">
    <div class="mine_index_top">
      <div class="banner">
        <div class="ban_Icon">
          <mu-icon value="keyboard_arrow_left" color="white" size="40" @click="ReturnPage"></mu-icon>
        </div>
      </div>

      <div class="business_card">
        <mu-row>
          <mu-col span="3" ><img :src="info.icon" alt="" class="header_img"></mu-col>
          <mu-col span="8" style="margin-left:10px;">
            <div>
              <div class="box_name">
                <div>
                  {{info.nickname}}
                  <img src="../../assets/image/female.jpg" alt="" style="width: 14px;height: 14px" v-if="info.sex=='2'">
                  <img src="../../assets/image/male.jpg" alt="" style="width: 14px;height: 14px" v-if="info.sex=='1'">
                </div>
                <mu-button color="secondary" small flat v-if="info.collection=='0'" @click="Collection">
                  <span class="iconfont icon-tianchongxing-"></span>
                  关注
                </mu-button>
                <mu-button color="secondary" small flat v-else @click="isCollection">
                  <mu-icon value="done"></mu-icon>
                  已关注
                </mu-button>
              </div>
              <p class="grade">
                <i class="cubeic-vip"></i>
                LV {{info.vip}}
              </p>
              <p class="PersonalizedSignature">{{info.autograph?info.autograph:'此用户什么也没留下。。。'}}</p>
            </div>
          </mu-col>
          <!--<mu-col span="4"><img :src="info.icon" alt="" class="header_img"></mu-col>-->
        </mu-row>
      </div>
    </div>

    <div class="mine_index_centre">
      <div class="centre_top">
        <div>
          <span>{{info.care}}</span>
          <p>关注</p>
        </div>
        <div>
          <span>{{info.area}}</span>
          <p>圈子</p>
        </div>
        <div>
          <span>{{info.fans}}</span>
          <p>粉丝</p>
        </div>
      </div>
    </div>
    <mu-divider></mu-divider>
    <mu-container>
      <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" full-width
               @change="tabChange">
        <mu-tab value="0">Ta的动态</mu-tab>
        <mu-tab value="1">Ta的照片</mu-tab>
        <mu-tab value="2">Ta的资料</mu-tab>
      </mu-tabs>
    </mu-container>
    <dynamic v-if="active=='0'" :oId="othersId"></dynamic>
    <photo v-if="active=='1'" :oId="othersId"></photo>
    <dataPage v-if="active=='2'" :oId="othersId"></dataPage>
  </div>
</template>

<script>
  import dynamic from '@/components/othersHomepage/dynamic';
  import photo from '@/components/othersHomepage/photo';
  import dataPage from '@/components/othersHomepage/dataPage';

  import {PersonInfo,PersonCollection,CancelCollection} from "@/api/othersHomepage";
  import {token} from '@/common/js/token';

  export default {
    name: "others",
    data() {
      return {
        info: '',
        active: '0',
        uid: '',     
        othersId:'',                   //访问者ID
      };
    },
    created() {

      // console.log(this.$route.query.uid)
      // this.uid = this.$route.query.uid
      // if(this.uid){
      //   this._getOthersDetails()
      // }else{
      //   this._getDetails();
      // }

      // console.log(this.$route.query.id)
      this.othersId = this.$route.query.id
      this.active='1';
      this._getDetails();
    },
    mounted(){
      this.active='0'
    },
    methods: {
      async _getDetails() {
        const params = {
          token: sessionStorage.getItem('token'),
          uid:this.othersId
        }
        const {code, data, msg} = await PersonInfo(params);
        // console.log(code, data, msg)
        if (code == '1') {
          this.info = data
        }
      },
      async _getOthersDetails() {
        const params = {
          token: sessionStorage.getItem('token'),
          uid:this.uid,
        }
        const {code, data, msg} = await PersonInfo(params);
        if (code == '1') {
          this.info = data
        }
      },

      //关注
      async Collection(){
        const params={
           token: sessionStorage.getItem('token'),
          guid:this.othersId
        }
        const {code,data,msg}=await PersonCollection(params)
        if(code=='1'){
          this._getDetails()
        }else {
          this.$toast.message(data);
        }
      },
      //取消关注
      async isCollection(){
        const params={
          token: sessionStorage.getItem('token'),
          uid:this.othersId
        }
        const {code,data,msg}=await CancelCollection(params)
        if(code=='1'){
          this._getDetails()
        }else {
          this.$toast.message(data);
        }
      },


      //下导航
      tabChange(val) {
        console.log(this.active)
        this.active=val
        // this.$router.push({path: val, query: {id: this.othersId}})
      },
      //返回上一页
      ReturnPage() {
        this.$router.back(-1)
      },
    },
    components: {
      dynamic,
      photo,
      dataPage
    }
  }
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
    text-align: left;
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
    /*text-align: left;*/
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }

  .PersonalizedSignature {
    font-size: 14px;
    color: #B3B3B3;
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
    color: #DD7639;
    border: 1px solid #DD7639;
    border-radius: 10px;
  }

  .mine_index_centre {
    width: 94%;
    margin: 70px auto 0;
    background: white;
    border-radius: 18px;
    border: 1px solid #f1f1f1;
    box-shadow: 6px 6px 5px #4a4a4a2b;
    margin-bottom: 20px;
  }

  .mine_index_centre > div {
    padding: 15px 20px;
  }

  .centre_top {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }

  .centre_bottom {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
  }

  .centre_top div {
    text-align: center;
  }

  .centre_top span {
    font-size: 20px;
    font-weight: 500;
  }

  .centre_top p {
    color: #737373;
  }

  .centre_bottom img {
    margin-bottom: 4px;
  }

  .centre_bottom div {
    text-align: center;
  }

  .bottom_box {
    padding: 0 20px;
    text-align: left;
  }

  .bottom_box > div {
    border-bottom: 1px solid #E2E2E2;
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
