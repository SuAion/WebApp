<template>
  <div class="oder_page">
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
          <p class="title_p">
            我的订单
          </p>
        </mu-col>
        <mu-col span="4">

        </mu-col>
      </mu-row>
    </mu-appbar>

    <div class="screen_box">
      <mu-button @click="openMonth=true" round small style="margin-right: 76px;">{{queryDate}}</mu-button>
      <div>
        <p>充值总额：<span style="color: #43DA4A">$</span>{{sum}}</p>
      </div>
    </div>

    <div style="background: white">
      <mu-load-more :loading="loading" @load="load">
        <div v-for="(item,index) in dataList" :key="index">
          <div class="record_list">
            <div class="list_content">
              <p>充值金额{{item.money}}元</p>
              <span>{{item.create_time}}</span>
            </div>
            <div style="display: flex">
              <span>+{{item.gold}}</span>
              <img src="../../assets/image/myselfMoney.png" alt="" style="width: 20px;height: 20px">
            </div>
          </div>
          <mu-divider></mu-divider>
        </div>
      </mu-load-more>
    </div>

    <!--筛选月份 start-->
    <mu-container>
      <mu-bottom-sheet :open.sync="openMonth">
        <div class="demo-picker-container" @item-click="openMonth=false">
          <mu-slide-picker :slots="addressSlots" :visible-item-count="7" @change="addressChange"
                           :values="address"></mu-slide-picker>
        </div>
      </mu-bottom-sheet>
    </mu-container>
    <!--筛选月份 end-->
  </div>
</template>

<script>
  import {OrderList} from "@/api/order";
  import {token} from '@/common/js/token';
  import {transStamp} from '@/common/js/timeStamp'

  let address = {
    '2017年': ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月'],
  };
  const month = ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月'];
  export default {
    name: "list",
    data() {
      return {
        dataList: [],
        loading: false,
        openMonth: false,
        addressSlots: [
          {
            width: '100%',
            textAlign: 'right',
            values: []
          }, {
            width: '100%',
            textAlign: 'left',
            values: []
          }
        ],
        address: [],
        addressProvince: '',
        addressCity: '',
        page:1,
        queryDate:'',
        sum:''
      };
    },
    created() {
      //生成日期
      this.generate()
      //获取列表
      this._getOrderList()
    },
    mounted() {

    },
    methods:{
      //获取列表
      async _getOrderList(){
        const params={
          token:sessionStorage.getItem('token'),
          page:this.page,
          limit:14,
          date:this.queryDate
        };
        const {code, data, msg} = await OrderList(params);
        if(code=='1'){
          for(let item of data.list){
            item.create_time=transStamp(item.create_time*1000)
          }
          this.dataList=this.dataList.concat(data.list)
          console.log(this.dataList)
          this.sum=data.sum
        }else {
          this.$toast.message(data);
        }
      },
      //生成日期
      generate() {
        let myDate = new Date();
        let year = myDate.getFullYear();
        let month1 = myDate.getMonth() + 1;
        this.queryDate = year + '-' + (month1)
        let months = [];
        if (year - 2018 > 0) {
          for (let i = 0; i < year - 2018; i++) {
            let year1 = (2018 + i) + '年';
            address[year1] = month
          }
          for (let i = 0; i < month1; i++) {
            months.push((i + 1) + '月')
          }
          address[year + '年'] = months
        }
        this.addressCity = month1 + '月';
        this.addressSlots[1].values = months;
        this.addressProvince = year + '年';
        this.addressSlots[0].values = Object.keys(address);
        this.address = [this.addressProvince, this.addressCity]
      },
      //日期滑动选择
      addressChange(value, index) {
        switch (index) {
          case 0:
            this.addressProvince = value
            const arr = address[value]
            this.addressSlots[1].values = arr
            this.addressCity = arr[0]
            break
          case 1:
            this.addressCity = value
            break
        }
        this.address = [this.addressProvince, this.addressCity]
        this.queryDate = parseInt(this.addressProvince) + '-' + parseInt(this.addressCity)
        this.page=1
        this.dataList=[]
        this._getOrderList()
      },
      //下拉刷新
      load() {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          this._getOrderList();
          this.loading = false;
        }, 2000)
      }
    },
  }
</script>

<style scoped lang="less">
  p {
    margin: 0;
  }

  .oder_page {
    background: #f1f0f0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .title_p {
      text-align: center;
    }
    .screen_box {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .record_list{
      padding: 4px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list_content{
        span{
          font-size: 14px;
          color: #818181;
        }
      }
    }
  }
</style>
