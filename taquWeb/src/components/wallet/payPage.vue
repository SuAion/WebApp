<template>
  <div class="pay_page">
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
            确认付款
          </p>
        </mu-col>
        <mu-col span="4">

        </mu-col>
      </mu-row>
    </mu-appbar>

    <div class="quota">
      <p>充值额度</p>
      <div>
        <img src="../../assets/image/myselfMoney.png" alt="">
        <span>{{goldCoin}}=</span>
        <span style="color: red">{{gMoney}}</span>
      </div>
    </div>

    <div class="paymentMethod">
      <p>支付方式</p>
      <mu-divider></mu-divider>
      <div>
        <p>扫码支付：</p>
        <img :src="img" alt="">
      </div>
    </div>

    <div class="agreement">
      <mu-flex class="select-control-row">
        <mu-checkbox v-model="checkbox"></mu-checkbox>
        <p style="margin-top: 3px">我已阅读并同意<span style="color: #2196F3">《充值协议》</span></p>
      </mu-flex>
    </div>

    <div style="text-align: center;margin: 30px 0">
      <mu-button large color="red" style="width: 80%" round @click="judge">确认充值</mu-button>
    </div>

  </div>
</template>

<script>
  import {recharge, getQR} from "@/api/wallet";
  import {token} from '@/common/js/token';
  import jsonToFormData from '@/common/js/jsonToFormData'

  export default {
    name: "payPage",
    data() {
      return {
        goldCoin: '',
        gMoney: '',
        gid: '',
        checkbox: false,
        img:'',

      };
    },
    created() {
      this.gMoney = this.$route.query.money;
      this.goldCoin = this.$route.query.goldCoin;
      this.gid = this.$route.query.id;
      this._getQr()
    },
    methods: {
      //获取二维码
      async _getQr() {
        const params = {
           token: sessionStorage.getItem('token'),
          type: 1
        }
        const {code, data, msg} = await getQR(params)
        if(code=='1'){
          this.img=data.qr
        }else {
          this.$toast.message(data);
        }
      },
      //点击判断是否同意协议
      judge() {
        if(this.checkbox){
          this.confirmRecharge()
        }else {

        }
      },
      //确定充值
      async confirmRecharge() {
        const params = {
          token: sessionStorage.getItem('token'),
          id: this.gid,
        }
        const {code, data, msg} = await recharge(jsonToFormData(params))
        if(code=='1'){
            this.$router.push({path:'/successPay',query:{goldCoin:this.goldCoin}})
        }else {
          this.$toast.message(data);
        }
      },
    },
  }
</script>

<style scoped lang="less">
  p {
    margin: 0;
  }

  .pay_page {
    background: #f1f0f0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .title_p {
      text-align: center;
    }
    .quota {
      background: white;
      margin: 20px 0 0;
      display: flex;
      justify-content: space-between;
      padding: 20px;
      font-size: 16px;
      font-weight: 600;
      div {
        display: flex;
        align-items: center;
        img {
          margin-right: 10px;
          width: 20px;
          height: 20px;
        }
      }
    }
    .paymentMethod {
      background: white;
      margin: 20px 0 0;
      p {
        padding: 10px 20px;
      }
      div {
        text-align: center;
        p {
          text-align: left
        }
        img {
          width: 140px;
          height: 140px;
          margin-bottom: 20px;
        }
      }
    }
    .agreement {
      margin: 20px 10px 0;
    }
  }
</style>
