<template>
  <div class="historical_page">
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
            {{headerText}}
          </p>
        </mu-col>
        <mu-col span="4">

        </mu-col>
      </mu-row>
    </mu-appbar>
    <div class="screen_box">
      <mu-button @click="openBotttomSheet" round small>筛选</mu-button>
      <mu-button @click="openMonth=true" round small style="margin-right: 76px;">{{queryDate}}</mu-button>
      <div>
        <p>支出：<span style="color: red">15132</span>$</p>
        <p>收入：<span style="color: #43DA4A">465465</span>$</p>
      </div>
    </div>

    <div style="background: white">
      <mu-load-more :loading="loading" @load="load">
        <div v-for="(item,index) in dataList" :key="index">
          <div class="record_list">
            <img src="../../assets/image/myselfMoney.png" alt="" style="width: 20px;height: 20px">
            <div class="list_content">
              <p>{{item.desc}}</p>
              <span>{{item.create_time}}</span>
            </div>
            <div style="color: red" v-if="item.status=='1 '">
              -{{item.money}}
            </div>
            <div style="color: #43DA4A" v-else>
              +{{item.money}}
            </div>
          </div>
          <mu-divider></mu-divider>
        </div>
      </mu-load-more>
    </div>

    <!--筛选条件 start-->
    <mu-container>
      <mu-bottom-sheet :open.sync="open">
        <mu-list @item-click="closeBottomSheet">
          <mu-sub-header>分类</mu-sub-header>
          <mu-list-item button @click="changeType('交易记录')">
            <mu-list-item-title>交易记录</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="changeType('金币收入')">
            <mu-list-item-title>金币收入</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="changeType('金币支出')">
            <mu-list-item-title>金币支出</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </mu-container>
    <!--筛选条件 end-->

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
  import {TurnoverList} from "@/api/wallet";
  import {token} from '@/common/js/token';
  import {transStamp} from '@/common/js/timeStamp'
  import jsonToFormData from '@/common/js/jsonToFormData'

  let address = {
    '2017年': ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月'],
  };
  const month = ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月'];
  export default {
    name: "historicalRecord",
    data() {
      return {
        dataList: [
        ],
        loading: false,
        headerText: '交易记录',
        open: false,
        openMonth: false,
        queryDate: '',
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
        page: 1,
        type: '',
      };
    },
    created() {
      //生成日期
      this.generate()
      this._getList()
    },
    mounted() {

    },
    methods: {
      //获取交易列表
      async _getList() {
        const params = {
          token: sessionStorage.getItem('token'),
          page: this.page,
          // date: this.queryDate,
          type: this.type,
          limit:14,
        }
        const {code, data, msg} = await TurnoverList(params)
        if (code == '1') {
          for(let item of data){
            item.create_time=transStamp(item.create_time)
          }
          this.dataList=this.dataList.concat(data)
        } else {
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
      //改变筛选类型
      changeType(text){
        this.page=1
        this.headerText=text
        if(text=='金币收入'){
          this.type=2
        }else if(text=='金币支出'){
          this.type=1
        }else {
          this.type=''
        }
        this.page=1
        this.dataList=[]
        this._getList()
      },
      //关闭底部
      closeBottomSheet() {
        this.open = false;
      },
      //打开底部
      openBotttomSheet() {
        this.open = true;
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
        this._getList()
      },
      //下拉刷新
      load() {
        this.loading = true;
        setTimeout(() => {
          this.page++;
          this._getList();
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

  .demo-picker-container {
    width: 100%;

  }

  .demo-list-wrap {
    width: 100%;
    max-width: 360px;
    overflow: hidden;
  }

  .historical_page {
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
    .record_list {
      padding: 4px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list_content {
        margin-right: 160px;
        span {
          font-size: 14px;
          color: #818181;
        }
      }
    }
  }
</style>
