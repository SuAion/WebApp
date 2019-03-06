<template>
  <div class="other_album">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-row>
        <mu-col span="4">
          <p class="title_button">
            <mu-button icon style="margin-top: 5px" @click="$router.back(-1)">
              <mu-icon value="keyboard_arrow_left"></mu-icon>
            </mu-button>
          </p>
        </mu-col>
        <mu-col span="4">
          <p class="title_p">关注</p>
        </mu-col>
        <mu-col span="4"></mu-col>
      </mu-row>
    </mu-appbar>

    <div class="other_content">
      <mu-load-more :loading="loading" @load="load" style="overflow: initial">
        <div
          v-for="(item,index) in dataImg"
          ref="waterImg"
          :style="{width: waterfallW + 'px', height: item.imgH + 'px', left: item.left + 'px', top: item.top + 'px'}"
          :key="index"
        >
           <img alt :src="item.src" preview="1">
          <!--<img src="../../assets/image/dynamicImg.png" alt="">-->
          <div style="margin-top: 48px" v-if="index+1==dataImg.length"></div>
        </div>
      </mu-load-more>
    </div>
  </div>
</template>

<script>
import { PersonImgDetail } from "@/api/othersHomepage";
import { token } from "@/common/js/token";

export default {
  name: "othersAlbum",
  data() {
    return {
      albumName: "",
      albumId: "",
      page: 1,
      loading: false,
      dataImg: [],
      waterfallW: "",
      screenWidth: document.body.clientWidth // 屏幕宽度
    };
  },
  created() {
    this.waterfallW = (this.screenWidth - 30) / 2;
    this.albumName = this.$route.query.name;
    this.albumId = this.$route.query.id;
    this._getDetails();
  },
  methods: {
    //获取相册信息
    async _getDetails() {
      const pamars = {
        page: this.page,
        id: this.albumId,
        token: sessionStorage.getItem('token'),
      };
      const { code, data, msg } = await PersonImgDetail(pamars);
      if (code == "1") {
        let arr = [];
        for (let item of data) {
          arr.push({ src: item.img });
        }
        this.dataImg = this.dataImg.concat(arr);
        this.waterFall();
      } else {
        this.$toast.message(data);
      }
    },
    //瀑布
    waterFall() {
      const gap = 8;
      let leftH = 0;
      let rightH = 0;
      this.dataImg.push({ src: "456" });
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
          this.dataImg[i].top = top;
          this.dataImg[i].left = left;
          this.dataImg[i].itemH = itemH;
          this.dataImg[i].itemW = this.waterfallW;
        }
      }, 100);
      setTimeout(() => {
        this.dataImg.pop();
      }, 100);
    },
    //下拉刷新
    load() {
      this.loading = true;
      setTimeout(() => {
        this.page++;
        this._getDetails();
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="less">
.title_p {
  text-align: center;
}

.other_album {
  .other_content {
    background: white;
    position: absolute;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 5px 8px 0;
    div {
      /*width: 50%;*/
      /*height: 50%;*/
      position: relative;
      img {
        width: 100%;
        /*height: 100%;*/
      }
    }
  }
  .mu-infinite-scroll {
    position: fixed !important;
    bottom: 0;
  }
  .mu-circle-gap-patch {
    position: absolute !important;
  }
}
</style>
