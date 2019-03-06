<template>
  <div class="edit_page">
     <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-button icon slot="left" @click="$router.back(-1)">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <div style="text-align: center">
        编辑资料
      </div>
      <mu-button flat slot="right" @click="preservation">保存</mu-button>
    </mu-appbar>
    <div class="content" @click="clickInput">
      <div class="headPortrait" >
        <div>
          <span>头像　　</span>
          <img :src="detailsData.icon" alt="">
        </div>
        <mu-icon value="keyboard_arrow_right" color="#C5C4C4"></mu-icon>
      </div>
      <input type="file" ref="headerImg" style="display: none;" @change="upHeaderImg" accept="image/jpeg,image/x-png,image/gif">
      <!-- <div class="wallpaper">
        <div>
          <span>背景图片</span>
          <img src="../../assets/image/speak02.jpg" alt="">
        </div>
        <mu-icon value="keyboard_arrow_right" color="#C5C4C4"></mu-icon>
      </div> -->
    </div>

    <div class="daat_Basics">
      <mu-divider style="color: #FFFFFF"></mu-divider>
      <p @click="prompt('请输入您的名字','nickname')">
        <span style="margin-right: 10px">昵称　　</span>
        <span class="span_b">{{detailsData.nickname}}</span>
      </p>
      <mu-divider></mu-divider>
      <p @click="openPicker">
        <span style="margin-right: 10px">性别　　</span>
        <span class="span_b">{{detailsData.sex}}</span>
      </p>
      <mu-divider></mu-divider>
      <p @click="openBirthday">
        <span style="margin-right: 10px">生日　　</span>
        <span class="span_b">{{detailsData.birthday}}</span>
      </p>
      <mu-divider style="color: #FFFFFF"></mu-divider>
    </div>

    <div class="daat_Basics">
      <mu-divider style="color: #FFFFFF"></mu-divider>
      <p @click="prompt('请输入您的职业','occupation')">
        <span style="margin-right: 10px">职业　　</span>
        <span class="span_b">{{detailsData.occupation}}</span>
      </p>
      <mu-divider></mu-divider>
      <p @click="prompt('请输入您的学校','school')">
        <span style="margin-right: 10px">学校　　</span>
        <span class="span_b">{{detailsData.school}}</span>
      </p>
      <mu-divider></mu-divider>
      <p @click="prompt('请输入您的故乡','hometown')">
        <span style="margin-right: 10px">故乡　　</span>
        <span class="span_b">{{detailsData.hometown}}</span>
      </p>
      <mu-divider></mu-divider>
      <p @click="prompt('请输入您的邮箱','email')">
        <span style="margin-right: 10px">邮箱　　</span>
        <span class="span_b">{{detailsData.email}}</span>
      </p>
      <mu-divider style="color: #FFFFFF"></mu-divider>
    </div>

    <div class="data_autograph">
      <mu-divider style="color: #FFFFFF"></mu-divider>
      <p @click="prompt('请输入您的签名','autograph')">
        <span style="margin-right: 10px">签名　　</span>
        <span class="span_b">{{detailsData.autograph}}</span>
      </p>
      <mu-divider style="color: #FFFFFF"></mu-divider>
    </div>
    <picker v-model="open" :data-items="items" @change="onValuesChange"></picker>
    <picker v-model="birthdayOpen" :data-items="birthdayitem" @change="onBirthdayChange"></picker>
  </div>
</template>

<script>
  // 引用滑动选择器
  import picker from 'vue-3d-picker';

  import {IconPutFile,InfoDetail,InfoSet} from "@/api/editPersonalData";
  import jsonToFormData from '@/common/js/jsonToFormData'
  import {transStamp2} from '@/common/js/timeStamp'
  import {token} from '@/common/js/token';

  export default {
    name: "editingMaterials",
    data() {
      return {
        type:0,
        detailsData: {},
        //****************性别选择***************
        items: [
          {
            values: ['男', '女']
          }
        ],
        open: false,
        //****************生日选择***************
        birthdayOpen: false,
        birthdayitem: [
          {
            values: ['2019年', '2018年', '2017年', '2016年', '2015年', '2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年', '2007年', '2006年', '2005年',
              '2004年', '2003年', '2002年', '2001年', '2000年', '1999年', '1998年', '1997年', '1996年', '1995年', '1994年', '1993年', '1992年', '1991年', '1990年',],
            index: 0
          }, {
            values: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            index: 0
          }, {
            values: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日',
              '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日','29日','30日','31日'],
            index: 0
          }
        ],
      };
    },

    components: {picker},

    created() {
       this.type = this.$route.query.type;
      //获取信息
      this._getDetails()
      //生成生日日期
      this.generate()
    },
    methods: {
      //
      async _getDetails(){
        const params = {
          token:sessionStorage.getItem('token')
        }
        const {code, data, msg} = await InfoDetail(params);
        if(code=='1'){
          if(data.sex=='1'){
            data.sex='男'
          }else if(data.sex=='2'){
            data.sex='女'
          }
          console.log(data)
          for(let key in data){
            console.log(data[key])
            if(data[key]=='null'||data[key]=='undefined'){
              data[key]='保密'
            }
          }

          data.birthday=transStamp2(data.birthday*1000)
          this.detailsData=data
        }else {
          this.$toast.message(data);
        }
      },
      //点击触发头像上传
      clickInput(){
        this.$refs.headerImg.click()
      },
      async upHeaderImg(){
        let inputDOM = this.$refs.headerImg;
        // 通过DOM取文件数据
        let form = new FormData();
        form.append('icon',inputDOM.files[0])
        form.append('token',sessionStorage.getItem('token'))
        const {code, data, msg} = await IconPutFile(form);
        if(code=='1'){
          this.detailsData.icon=data
        }else {
          this.$toast.message(data);
        }
      },
      generate() {
        var myDate = new Date();
        if (myDate.getFullYear() - 2019 > 0) {
          for (let i = 0; i < myDate.getFullYear() - 2019; i++) {
            this.birthdayitem[0].values.splice(0, 0, (2019 + i + 1) + '年')
          }
        }
        //匹配当前日期
        if (this.detailsData.birthday) {
          let arr = this.detailsData.birthday.split('-')
          this.birthdayitem[0].index = this.birthdayitem[0].values.indexOf(arr[0] + '年')
          this.birthdayitem[1].index = this.birthdayitem[1].values.indexOf(arr[1] + '月')
          this.birthdayitem[2].index = this.birthdayitem[2].values.indexOf(arr[2] + '日')
        }else {
          this.birthdayitem[1].index = this.birthdayitem[1].values.indexOf((myDate.getMonth()+1) + '月')
          this.birthdayitem[2].index = this.birthdayitem[2].values.indexOf(myDate.getDate() + '日')
        }
      },
      //选择性别
      onValuesChange(result1) {
        this.detailsData.sex = result1
      },
      //选择生日
      onBirthdayChange(result1, result2, result3) {
        let year = parseInt(result1)
        let month = parseInt(result2)
        let date = parseInt(result3)
        let day = new Date(year,month,0);
        // console.log(day.getDate());
        // if(day.getDate()==29){
        //   this.birthdayitem[2].values.push('29日')
        // }else if(day.getDate()==30){
        //   this.birthdayitem[2].values.push(['29日','30日'])
        // }else if(day.getDate()==31){
        //   this.birthdayitem[2].values.push([])
        // }
        this.detailsData.birthday=year+'-'+month+'-'+date
      },
      //修改名字
      prompt(text,data) {
        if(data=='email'){
          this.$prompt('请输入邮箱', '提示', {
            validator (value) {
              return {
                valid: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value),
                message: '请输入正确邮箱格式'
              }
            }
          }).then(({ result, value }) => {
            if (result) {
              this.detailsData[data] = value
            } else {
            }
          });
        }else {
          this.$prompt(text, '修改', {}).then(({result, value}) => {
            if (result) {
              this.detailsData[data] = value
            } else {

            }
          });
        }
      },
      //保存资料
      async preservation(){
        let params=this.detailsData;
        params.token=sessionStorage.getItem('token');
        if(params.sex=='男'){
          params.sex=1
        }else {
          params.sex=2
        }
        const {code, data, msg} = await InfoSet(jsonToFormData(params));
        if(code=='1'){
          this._getDetails()
          this.$toast.success('保存成功！')
          if(this.type){
            this.$router.push({ path: "/main"});
          }
        }else {
          this.$toast.message(data);
        }
        
      },
      openPicker() {
        this.open = true
      },
      openBirthday() {
        this.birthdayOpen = true
      },
    }
  }
</script>

<style scoped lang="less">
  .edit_page {
    background: #f1f0f0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .content {
      .headPortrait {
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
          border-radius: 50%;
          width: 40px;
          height: 40px
        }
      }
      .wallpaper {
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
          width: 80px;
          height: 80px
        }
      }
    }
    .content > div {
      background: white;
      margin-top: 20px;
      padding: 8px 15px;
    }
    .daat_Basics {
      margin-top: 20px;
      background: #FFFFFF;
    }
    .data_autograph{
      margin: 20px 0;
      background: #FFFFFF;
    }
    .daat_Basics p, .data_autograph p{
      padding: 8px 15px;
      font-size: 14px;
      margin: 5px 0 0px;
    }
    .span_b {
      font-weight: 700;
    }
  }

  .title_p {
    text-align: center;
  }
</style>
