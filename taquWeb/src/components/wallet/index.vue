<template>
  <div class="wallet_page">
    <mu-appbar style="width: 100%;">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <div style="text-align: center">
        我的金币
      </div>
      <mu-button flat slot="right" @click="preservation">历史记录</mu-button>
    </mu-appbar>
    <div class="balance">
      <p style="font-size: 18px;">金币余额</p>
      <p class="monye">{{money}}</p>
      <p style="color: white">
        <span class="iconfont icon-wenti-"></span>
        充值未到账？对金币余额有疑问？
      </p>
    </div>
    <div class="rechargeList">
      <p style="padding: 10px 10px 6px">请选择充值的额度</p>
      <mu-divider></mu-divider>

      <div v-for="(item,index) in list" :key="index">
        <div class="recharge_content">
          <div class="content_left">
            <img src="../../assets/image/myselfMoney.png" alt="">
            <span>{{item.gold}}</span>
          </div>
          <mu-button color="error" round @click="confirmRecharge(item.id,item.price,item.gold)">${{item.price}}</mu-button>
        </div>
        <mu-divider></mu-divider>
      </div>
      <div style="display: flex;justify-content: space-between;padding: 8px 12px">
        <p>更多金额</p>
        <p style="display: flex" @click="inputGold">充值金额不小于10元<mu-icon value="keyboard_arrow_right"></mu-icon></p>
      </div>

    </div>

  </div>
</template>

<script>
  import {gearList,userinfo} from "@/api/wallet";
  import {token} from '@/common/js/token';

  export default {
    name: "index",
    data() {
      return {

        money:0,
        list:[
          {
            money:'6.00',
            goldCoin:'600',
            id:1,
          },
          {
            money:'25.00',
            goldCoin:'2500',
            id:1,
          },
          {
            money:'35.00',
            goldCoin:'3500',
            id:1,
          },
          {
            money:'45.00',
            goldCoin:'4500',
            id:1,
          },
          {
            money:'88.00',
            goldCoin:'8800',
            id:1,
          },{
            money:'199.00',
            goldCoin:'19900',
            id:1,
          },
          {
            money:'399.00',
            goldCoin:'39900',
            id:1,
          },
          {
            money:'668.00',
            goldCoin:'66800',
            id:1,
          },
        ],

      };
    },
    created() {
      this._getGearList(),
      this._getMoney()
    },
    methods:{

      //查看自己所剩下的金币数量
      async _getMoney(){
        const params={
           token: sessionStorage.getItem('token'),
        };
        const {code, data, msg} = await userinfo(params);
        if(code=='1'){
          this.money=data.money
        }else {
          this.$toast.message(data);
        }
      },
      //获取充值档位
      async _getGearList(){
        const params={
           token: sessionStorage.getItem('token'),
        };
        const {code, data, msg} = await gearList(params);
        if(code=='1'){
          this.list=data
        }else {
          this.$toast.message(data);
        }
      },
      //历史记录
      preservation(){
        this.$router.push({path:'/historicalRecord'})
      },
      //
      inputGold(){
        this.$router.push({path: '/walletEntry'})
      },
      //充值
      confirmRecharge(gid,gMoney,goldCoin){
        this.$router.push({path: '/walletPay', query: {id: gid,money:gMoney,goldCoin}})
      },
    },
  }
</script>

<style scoped lang="less">
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
      .recharge_content{
        padding: 6px 10px;
        display: flex;
        justify-content: space-between;
        .content_left{
          span{
            vertical-align: top;
            font-size: 24px;
          }
        }
        img{
          width: 32px;
          height: 32px;
          margin-right: 20px;
        }
      }
    }
  }
</style>
