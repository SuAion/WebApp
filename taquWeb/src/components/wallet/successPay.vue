<template>
  <div class="success_page">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>充值成功
      <mu-button flat slot="right" @click="aaa()">完成</mu-button>
    </mu-appbar>
    <div class="contain">
      <img src="../../../static/queren.png" alt>
      <div class="rightContent">
        <div>
          <p>金币余额</p>
          <p>你当前充值的额度:{{goldCoin}}金币</p>
        </div>
        <div>
          <p>努力充值中</p>
          <p>预计2分钟后会到账,请稍等一会哦</p>
        </div>
        <div>
          <p>充值到账</p>
        </div>
      </div>
    </div>
    <div class="process">
        <i></i>
      <div>
        <mu-circular-progress
          class="demo-circular-progress"
          color="secondary"
          :stroke-width="5"
          :size="60"
        ></mu-circular-progress>
        <p>已提交充值订单,等待审核。请浏览其他内容</p>
      </div>
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "payPage",
  data() {
    return {
        goldCoin:''
    };
  },
  created() {
      this.goldCoin = this.$route.query.goldCoin;
  },
  methods: {
    aaa(){
        this.$router.go(-3)
    }
  }
};
</script>

<style scoped lang="less">
.success_page {
  .contain {
    display: flex;
    padding-top: 30px;
    img {
      margin: 0 30px;
    }
    .rightContent {
      flex-grow: 1;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      div {
        p:nth-child(1) {
          margin: 20px 0;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 600;
          color: rgba(0, 0, 0, 1);
        }
        p:nth-child(2) {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(151, 151, 151, 1);
        }
      }
    }
  }
  .process {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    div{
      text-align: center;
    
    }
    
  }
}
</style>
