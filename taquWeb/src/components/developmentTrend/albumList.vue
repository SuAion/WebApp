<template>
  <div class="album_List">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <div style="text-align: center">
        相册列表
      </div>
      <mu-button flat slot="right" @click="newAlbum">新建相册</mu-button>
    </mu-appbar>
    <div class="album_content">
      <div v-for="(item,index) in albumList" class="album_img" :key="index">
        <div @click="enteringAlbum(item.id,item.img,item.title)">
          <img :src="item.title" alt="">
        </div>
        <div class="album_title">
          <div>
            <p>{{item.img}}</p>
            <span>{{item.count}}张</span>
          </div>
          <img src="../../assets/image/deleteAlbum.png" alt="" @click="albumEmpty(item.id)">
        </div>
      </div>
    </div>

    <mu-dialog title="相册名称" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      <mu-text-field v-model="albumName"></mu-text-field>
      <mu-button slot="actions" flat color="primary" @click="openAlert = false">取消</mu-button>
      <mu-button slot="actions" flat color="primary" @click="closeAlertDialog">确定</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import {PictureList,PictureDel,AlbumDel} from "@/api/dynamic";
  import jsonToFormData from '@/common/js/jsonToFormData'
  import {token} from '@/common/js/token'

  export default {
    name: "albumList",
    data(){
      return{
        openAlert: false,
        albumName:'',
        page:1,
        albumList:[],
      }
    },
    created(){
      this._getAlbumList()
    },
    methods:{
      //获取相册列表
      async _getAlbumList(){
        const params={
          page:this.page,
          token:sessionStorage.getItem('token'),
        }
        const {code,data,msg}=await PictureList(params)
        if(code=='1'){
          this.albumList=data
        }else {
          
        }
      },
      //确定名称
      closeAlertDialog () {
        this.openAlert = false;
        this.$router.push({path: '/dynamicAlbum',query: {name: this.albumName}})
      },
      //清空相册
      async albumEmpty(id){
        const params={
          id,
          token:sessionStorage.getItem('token'),
        }
        const {code,data,msg}=await PictureDel(params)
        if(code=='1'){
          this.albumDel(id)
        }else {
          this.albumDel(id)
          this.$toast.message(data);
          this.$router.go(0)
        }
      },
      //删除相册
      async albumDel(id){
        const params={
          id,
         token:sessionStorage.getItem('token'),
        }
        const {code,data,msg}=await AlbumDel(params)
        if(code=='1'){
           this._getAlbumList()
           this.$toast.success('删除成功');
        }else {
          this.$toast.message(data);
        }
      },
      //进入相册
      enteringAlbum(id,name,imgUrl){
        sessionStorage.setItem('imgUrl',imgUrl);
        this.$router.push({path: '/dynamicAlbum',query: {id: id,name:name}})
      },
      //创建相册
      newAlbum(){
        this.openAlert = true;
      },
    }
  }
</script>

<style scoped lang="less">
  p{
    margin: 0;
  }
  .album_List {
    background: #f1f0f0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .album_content{
      padding: 0 8px;
      display: flex;
      justify-content: space-between;
      flex-wrap:wrap;
      .album_img{
        width: 50%;
        padding: 8px;
        .album_title{
          display: flex;
          justify-content: space-between;
          p{
            font-size: 14px;
            font-weight: 700;
          }
          span{
            color: gray;
          }
          img{
            width: 25px;
            height: 25px
          }
        }
        img{
          width: 100%;
          height: 183px;
        }
      }
    }
  }
</style>
