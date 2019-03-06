<template>
    <div class="photo_page">
      <!--<vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="_getPhoto"></vue-waterfall-easy>-->
      <mu-load-more :loading="loading" @load="load">
        <div class="photo_list">
          <div v-for="(item,index) in imgsArr" class="photo_img" :key="index"   >
            <div @click="enteringAlbum(item.id,item.title)" class="div_img">
              <img :src="item.title" alt="">
              <div class="maskImg">
                <!--<button>456</button>-->
              </div>
            </div>
            <div class="photo_title">
              <div>
                <p>{{item.src}}</p>
                <span>{{item.count}}张</span>
              </div>
            </div>
          </div>
        </div>
      </mu-load-more>


      <mu-dialog title="提示" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
        你还未购买此相册，是否购买？
        <mu-button slot="actions" flat color="primary" @click="openAlert = false">取消</mu-button>
        <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">购买</mu-button>
      </mu-dialog>
    </div>
</template>

<script>
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import {PersonImg,PersonImgBuy,PersonImgDetail} from "@/api/othersHomepage";
  import {token} from '@/common/js/token';

  export default {
    name: "photo",
    props: ['oId'],

    components: { vueWaterfallEasy },
    data() {
      return {
        imgsArr: [],
        group: 0, // request param
        loading: false,
        page:1,
        openAlert: false,
        albumId:'',
        albumName:''
      };
    },
    created() {
      this._getPhoto()
    },
    methods: {
      //获取相册列表
      async _getPhoto() {
        const params = {
          token: sessionStorage.getItem('token'),
          uid:this.oId,
          limit:10,
          page:this.page
        };
        const {code, data, msg} = await PersonImg(params);
        if(code=='1'){
          this.imgsArr=this.imgsArr.concat(data)
        }else {
          this.$toast.message(data);
        }
      },
      //点击相册查看是否购买
      async enteringAlbum(id,name){
        this.albumId=id
        this.albumName=name
        const pamars={
         token: sessionStorage.getItem('token'),
          id,
        }
        const {code,data,msg}=await PersonImgDetail(pamars)
        if(code=='1'){
          this.$router.push({path: '/othersAlbum',query: {id: id,name:name}})
        }else if(code=='-1'){
          this.openAlert = true;
        }else {
          this.$toast.message(data);
        }
      },
      //购买相册
      async closeAlertDialog () {
        const pamars={
           token: sessionStorage.getItem('token'),
          id:this.albumId
        }
        const {code,data,msg}=await PersonImgBuy(pamars)
        if(code=='1'){
          this.$router.push({path: '/othersAlbum',query: {id: this.albumId,name:this.albumName}})
        }else if(code=='-2'){
          this.$toast.message(data);
        }else {
          this.$toast.message(data);
        }
        this.openAlert = false;
      },
      //下拉刷新
      load() {
        this.loading = true;
        setTimeout(() => {
          this.page++
          this._getPhoto()
          this.loading = false;
        }, 2000)
      }
    }
  }
</script>

<style lang="less">
    .photo_page{
      /*.vue-waterfall-easy{*/
        /*position: static !important;*/
        /*height: 49vh;*/
      /*}*/
      .photo_list{
        padding: 0 8px;
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap;
        .photo_img{
          width: 50%;
          padding: 8px;
          .photo_title{
            display: flex;
            justify-content: space-between;
            p{
              font-size: 14px;
              font-weight: 700;
            }
            span{
              color: gray;
            }
          }
          .div_img{
            position: relative;
            .maskImg{
              width: 183px;
              height: 183px;
              /*background: url("../../assets/image/mohu.png");*/
              /*opacity: 0.8;*/
              background: rgba(9, 9, 9, 0.63);
              position: absolute;
              top: 0;
            }
            img{
              width: 183px;
              height: 183px;
            }
          }
        }
      }
    }
</style>
