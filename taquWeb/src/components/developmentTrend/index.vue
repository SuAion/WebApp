<template>
  <div class="dynamic_page">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <div style="text-align: center">
        写动态
      </div>
      <mu-button flat slot="right" @click="preservation">发表</mu-button>
    </mu-appbar>

    <div class="dynamic_content">
      <textarea name="" class="textarea_class" cols="30" rows="5" v-model="text" placeholder="分享新鲜事..."></textarea>
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
  import {dynamicPush, dynamicFile} from "@/api/dynamic";
  import jsonToFormData from '@/common/js/jsonToFormData'
  import {token} from '@/common/js/token'

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
      };
    },
    created() {

    },
    methods: {
      //发表动态
      async preservation() {
        const params = {
          token:sessionStorage.getItem('token'),
          content: this.text,
          img: this.dataImg
        };
        console.log(params)
        const {code, data, msg} = await dynamicPush(jsonToFormData(params));
        if(code=='1'){
          this.$router.push({path: '/myselfSpeak', query: {type: '0'}})
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
</style>
