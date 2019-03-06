<template>
  <div class="wallet_page">
    <mu-appbar style="width: 100%;">
      <mu-row>
        <mu-col span="4">
          <p class="title_button">
            <mu-button icon style="margin-top: 5px" @click="$router.back(-1)">
              <mu-icon value="keyboard_arrow_left"></mu-icon>
            </mu-button>
          </p>
        </mu-col>
        <mu-col span="4">
          <p class="title_p">
            关注
          </p>
        </mu-col>
        <mu-col span="4">

        </mu-col>
      </mu-row>
    </mu-appbar>
    <div class="balance">
      <p style="font-size: 18px;">金币余额</p>
      <p class="monye">0</p>
      <p style="color: white">
        <span class="iconfont icon-wenti-"></span>
        充值未到账？对金币余额有疑问？
      </p>
    </div>
    <div class="rechargeList">
      <p style="padding: 10px 10px 6px">请选择充值的额度</p>
      <mu-divider></mu-divider>
      <div class="inputAmount">
        <div class="inputBox">
          <span>￥</span>
          <input type="number" ref="inputMoney" style="border: none;outline: none;" placeholder="　输入人民币金额" v-model="monyeNum">
        </div>
        <div class="goldCoin">对应金币：<img src="../../assets/image/myselfMoney.png" alt=""><span>{{monyeNum*100}}</span></div>
        <div class="promptingLanguage">
          <p>·当前金币充值比例<span style="color: red;margin-left: 4px">1:100</span></p>
        </div>
        <div style="text-align: center;margin: 30px 0">
          <mu-button large color="red" style="width: 80%" round @click="confirmRecharge">确认充值</mu-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        monyeNum:'',

      };
    },
    created() {

    },
    mounted(){
      this.$refs.inputMoney.focus()
    },
    methods:{

      //历史记录
      preservation(){

      },
      //确定充值
      confirmRecharge(){
        if(this.monyeNum){
          this.$router.push({path: '/walletPay', query: {money: this.monyeNum}})
        }else {
          this.$toast.message('请输入金额');
        }
      },
    },
  }
</script>

<style scoped lang="less">
  .title_p {
    text-align: center;
  }
  .wallet_page {
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    p {
      margin: 0;
    }
    .balance {
      background: #F37686;
      padding: 10px 20px;
      .monye {
        font-size: 46px;
        font-weight: 500;
      }
      p{
        color: white;
      }
    }
    .rechargeList{
      background: white;
      .inputAmount{
        padding: 30px 10px 0;
        .inputBox{
          font-size: 24px;
        }
        .goldCoin{
          background: #ddd9d1;
          border-radius: 10px;
          padding: 0 8px;
          margin: 8px 0 10px;
          img{
            width: 18px;
            height: 18px;
            vertical-align: sub;
            margin-right: 10px;
          }
        }
        .promptingLanguage{
          color: #767676;
        }
      }
    }
  }
</style>
