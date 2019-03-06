<template>
  <div class="dynamic_page">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <div style="text-align: center">
        发布帖子
      </div>
      <mu-button flat slot="right" @click="preservation">发表</mu-button>
    </mu-appbar>

    <div class="dynamic_content">
          <mu-text-field v-model="titleValue" placeholder="标题最多不超过15个字符" :max-length="15"></mu-text-field>
      <textarea name="" class="textarea_class" cols="30" rows="5" v-model="text" placeholder="分享周围的新鲜事，记录生活美好..."></textarea>
      <div class="uploadImg">
        <!--<div style="width: 100px;height: 100px;background: aquamarine">-->

        <!--</div>-->

        <div class="wrapper"
             :style="uploadImg.length<3?'grid-template-rows: 130px;':uploadImg.length<6?'grid-template-rows: 130px 130px;':'grid-template-rows: 130px 130px 130px;'">
          <img alt="" v-for="(item,index) in uploadImg" :src="item" v-if="item!='upload'" preview="1" :key="index">
          <img src="../../assets/image/dynamicImg.png" alt="" v-else @click="clickInput">
        </div>
        <input type="file" ref="headerImg" multiple style="display: none;" @change="upHeaderImg"
               accept="image/jpeg,image/x-png,image/gif">
      </div>
    </div>
  </div>
</template>

<script>
  import {CircleArticlePush, dynamicFile} from "@/api/community/fabu";
  import jsonToFormData from '@/common/js/jsonToFormData'
  import {token} from '@/common/js/token'
import Toast from 'muse-ui-toast';
  export default {
    name: "index",
    data() {
      return {
        // dynamicImg
        uploadImg: [
          'upload'
        ],
        text: '',
        pText: '',
        dataImg:[],
        titleValue:'',
      };
    },
    created() {
        this.cid = this.$route.query.cid;
    },
    methods: {
      //发表动态
      async preservation() {
        if(!this.titleValue){
          Toast.error('请输入标题');
          return
        }
       if(!this.text){
          Toast.error('帖子内容不能未空,请输入内容');
          return
        }
        const params = {
          token:sessionStorage.getItem('token'),
          content: this.text,
          img: this.dataImg,
          cid:this.cid,
          title:this.titleValue
        }; 
        const {code, data, msg} = await CircleArticlePush(jsonToFormData(params));
        if(code=='1'){
          this.$router.back(-1);
          Toast.success('发布成功');
        }else {
          this.$toast.message(data);
        }
      },
      //点击触发头像上传
      clickInput() {
        this.$refs.headerImg.click()
      },
      async upHeaderImg() {
        let inputDOM = this.$refs.headerImg;
        console.log(inputDOM.files)
        // 通过DOM取文件数据
        let form = new FormData();
        for (let i = 0; i < inputDOM.files.length; i++) {
          form.append('file[]', inputDOM.files[i])
        }
        // form.append('icon',inputDOM.files[0])
        form.append('token', sessionStorage.getItem('token'),)
        const {code, data, msg} = await dynamicFile(form);
        if (code == '1') {
          // if(this.dataImg[0]){
          //   this.dataImg=this.dataImg.concat(data)
          // }else {
          //   this.dataImg=data
          // }
          this.dataImg=this.dataImg.concat(data)
          this.uploadImg = data.concat(this.uploadImg);
        } else {
          this.$toast.message(data);
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .dynamic_page {
    background: #f1f0f0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .dynamic_content {
      background: white;
      .textarea_class {
        width: 100%;
        border: none;
        resize: none;
        outline: none;
        padding: 10px;
        font-size: 16px;
        font-weight: 400;
      }
      .uploadImg {
        display: flex;
        justify-content: center;
      }
    }
  }

  .wrapper {
    display: grid;
    grid-template-columns: 130px 130px 130px;
    margin: 5px 0 0;
  }

  .wrapper img {
    margin: 0 0 5px;
    width: 125px;
    height: 125px;
  }
  .mu-input{
      width: 100%!important;
      padding-left: 5px!important;
  }
</style>
