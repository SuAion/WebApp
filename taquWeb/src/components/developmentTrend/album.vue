<template>
  <div class="album_page">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <div style="text-align: center">相册详情</div>
      <mu-button flat slot="right" @click="clickpreservation">保存</mu-button>
    </mu-appbar>

    <div class="content">
      <div class="headPortrait">
        <div>
          <span>相册名称</span>
          <span>{{ albumName }}</span>
        </div>
        <mu-icon value="keyboard_arrow_right" color="#C5C4C4"></mu-icon>
      </div>
      <div class="headPortrait">
        <div style="height: 27px;">
          <span style="width: 56px;">所属类别</span>
          <mu-select
            v-model="selectVal"
            underline-color="#fff"
            style="font-size: 14px;position: relative;top: 6px;"
          >
            <mu-option
              v-for="(option) in options"
              :key="option.bid"
              :label="option.title"
              :value="option.bid"
            ></mu-option>
          </mu-select>
        </div>
        <mu-icon value="keyboard_arrow_right" color="#C5C4C4"></mu-icon>
      </div>

      <input
        type="file"
        ref="headerImg"
        style="display: none;"
        @change="upHeaderImg"
        accept="image/jpeg, image/x-png, image/gif"
      >
      <div class="headPortrait" style="min-height:60px;" @click="clickInput">
        <div>
          <span>相册封面</span>
          <img :src="pictureCover" alt v-if="pictureCover">
          <span style="color: #C7C7C7" v-else>请上传封面...</span>
        </div>
        <mu-icon value="keyboard_arrow_right" color="#C5C4C4"></mu-icon>
      </div>
    </div>

    <div class="dynamic_content">
      <div class="uploadImg">
        <div
          v-for="(item,index) in dataImg"
          ref="waterImg"
          :style="{width: waterfallW + 'px', height: item.imgH + 'px', left: item.left + 'px', top: item.top + 'px'}"
          :key="index"
        >
          <img alt :src="item.src" v-if="item.src!='upload'" preview="1">
          <img src="../../assets/image/dynamicImg.png" v-else alt @click="clickImgArr">
          <mu-button
            fab
            small
            color="red"
            style="position: absolute;width: 20px;height:20px;top: 0;right: 0"
            @click="deleteImg(index)"
            v-if="item.src!='upload'"
          >
            <mu-icon value="close"></mu-icon>
          </mu-button>
        </div>
        <input
          type="file"
          ref="imgArr"
          multiple
          style="display: none;"
          @change="upImgArr"
          accept="image/jpeg, image/x-png, image/gif"
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  PictureAlbum,
  PicturePutFile,
  AlbumSet,
  PictureSet,
  GetPictureType
} from "@/api/dynamic";
import jsonToFormData from "@/common/js/jsonToFormData";
import { token } from "@/common/js/token";
import Toast from "muse-ui-toast";

export default {
  name: "album",
  data() {
    return {
      options: [],
      selectVal: "",
      albumName: "",
      albumId: "",
      dataImg: [{ src: "upload" }],
      photoArr: [],
      pictureCover: "",
      waterfallW: "",
      screenWidth: document.body.clientWidth // 屏幕宽度
    };
  },
  created() {
    this.waterfallW = (this.screenWidth - 30) / 2;
    this.albumName = this.$route.query.name;
    this.albumId = this.$route.query.id;
    this._getType();
    if (this.albumId) {
      this.pictureCover = sessionStorage.getItem("imgUrl");
      this._getDetails();
    } else {
    }
  },
  methods: {
    //获取分类
    async _getType() {
      const pamars = {
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await GetPictureType(pamars);
      if (code == "1") {
        this.options = data;
        console.log(this.options);
      } else {
        this.$toast.message(data);
      }
    },
    //获取相册详情
    async _getDetails() {
      const pamars = {
        id: this.albumId,
        token: sessionStorage.getItem("token")
      };
      const { code, data, msg } = await PictureAlbum(pamars);
      if (code == "1") {
        let arr = [];
        for (let item of data) {
          arr.push({ src: item.img });
          this.photoArr.push(item.img);
        }
        this.dataImg = this.dataImg.concat(arr);
        // this.dataImg = data.concat(this.uploadImg);
        this.waterFall();
      } else {
        this.$toast.message(data);
      }
    },
    //点击触发头像上传
    clickInput() {
      if (!this.selectVal) {
        this.$toast.message("请先选择上传分类");
      }
      {
        this.$refs.headerImg.click();
      }
    },
    async upHeaderImg() {
      let inputDOM = this.$refs.headerImg;
      // 通过DOM取文件数据
      let form = new FormData();
      form.append("photo[]", inputDOM.files[0]);
      form.append("token", sessionStorage.getItem("token"));
      const { code, data, msg } = await PicturePutFile(form);
      if (code == "1") {
        this.pictureCover = data;
        this.submitDetails();
      } else {
        this.$toast.message(data);
      }
    },
    //提交相册信息
    async submitDetails() {
      let params = {
        token: sessionStorage.getItem("token"),
        title: this.albumName,
        photo: this.pictureCover,
        bid: this.selectVal
      };
      if (this.albumId) {
        params.id = this.albumId;
      }
      const { code, data, msg } = await AlbumSet(jsonToFormData(params));
      if (code == "1") {
        if (!this.albumId) {
          this.albumId = data;
        }
      } else {
        this.$toast.message(data);
      }
    },
    //点击保存
    clickpreservation() {
      // this.waterFall()
      // console.log(this.$refs.input1)
      if (this.pictureCover) {
        this.preservation();
      } else {
        this.$toast.message("请先设置封面");
      }
    },
    //保存
    async preservation() {
      const params = {
        token: sessionStorage.getItem("token"),
        photo: this.photoArr,
        pid: this.albumId
      };
      const { code, data, msg } = await PictureSet(jsonToFormData(params));
      if (code == "1") {
        Toast.success("上传成功");
        this.$router.push({ path: "/dynamicAlbumList" });
      } else {
        this.$toast.message(data);
      }
    },
    //点击相册上传
    clickImgArr() {
      this.$refs.imgArr.click();
    },
    async upImgArr() {
      let inputDOM = this.$refs.imgArr;
      // 通过DOM取文件数据
      let form = new FormData();
      if (inputDOM.files.length > 20) {
        this.$toast.message("最多一次上传20张图片");
      } else {
        for (let i = 0; i < inputDOM.files.length; i++) {
          form.append("photo[]", inputDOM.files[i]);
        }
        form.append("token", sessionStorage.getItem("token"));
        const { code, data, msg } = await PicturePutFile(form);
        if (code == "1") {
          let arr = [];
          this.photoArr = this.photoArr.concat(data);
          for (let item of data) {
            arr.push({ src: item });
          }
          this.dataImg = this.dataImg.concat(arr);
          // this.dataImg = data.concat(this.uploadImg);
          this.waterFall();
        } else {
          this.$toast.message(data);
        }
      }
    },
    //瀑布
    waterFall() {
      const gap = 8;
      let leftH = 0;
      let rightH = 0;
      this.dataImg.push({ src: "456" });
      const imgArr = this.$refs.waterImg;
      this.$nextTick(function() {
        setTimeout(() => {
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
            this.dataImg[i].top = top;
            this.dataImg[i].left = left;
            this.dataImg[i].itemH = itemH;
            this.dataImg[i].itemW = this.waterfallW;
          }
        }, 100);
        setTimeout(() => {
          this.dataImg.pop();
        }, 100);
      });
    },
    //点击删除
    deleteImg(index) {
      this.dataImg.splice(index, 1);
      this.photoArr.splice(index - 1, 1);
      this.waterFall();
    }
  }
};
</script>

<style scoped lang="less">
.album_page {
  background: #f1f0f0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .content {
    .headPortrait {
      background: white;
      margin-top: 10px;
      padding: 8px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        align-items: center;
      }
      span {
        margin-right: 20px;
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
  .dynamic_content {
    background: white;
    position: absolute;
    top: 237px;
    left: 0;
    right: 0;
    bottom: 0;
    .uploadImg {
      /*display: flex;*/
      /*justify-content: space-between;*/
      /*flex-wrap:wrap;*/
      padding: 5px 8px 0;
      div {
        /*width: 50%;*/
        /*height: 50%;*/
        position: relative;
        img {
          width: 100px;
          /*height: 100%;*/
        }
      }
    }
  }
}
</style>
