<template>
  <div class="dataPage_content">
    <div class="daat_Basics">
      <mu-divider style="color: #FFFFFF"></mu-divider>
      <p>
        <span>昵称：</span>
        <span class="span_b">{{info.nickname}}</span>
      </p>
      <mu-divider></mu-divider>
      <p>
        <span>性别：</span>
        <span class="span_b" v-if="info.sex!='0'">{{info.sex=='1'?'男':'女'}}</span>
      </p>
      <mu-divider></mu-divider>
      <p>
        <span>年龄：</span>
        <span class="span_b">{{info.year}}</span>
      </p>
      <mu-divider></mu-divider>
      <p>
        <span>生日：</span>
        <span class="span_b">{{info.birthday}}</span>
      </p>
      <mu-divider></mu-divider>
      <p>
        <span>星座：</span>
        <span class="span_b">{{info.constellation}}</span>
      </p>
      <mu-divider style="color: #FFFFFF"></mu-divider>
    </div>
    <div class="data_Hobby">
      <mu-divider style="color: #FFFFFF"></mu-divider>
      <p>
        <span>职业：</span>
        <span class="span_b">{{info.occupation}}</span>
      </p>
      <mu-divider></mu-divider>
      <p>
        <span>学校：</span>
        <span class="span_b">{{info.school}}</span>
      </p>
      <mu-divider></mu-divider>
      <p>
        <span>故乡：</span>
        <span class="span_b">{{info.hometown}}</span>
      </p>
      <mu-divider></mu-divider>
      <p>
        <span>邮箱：</span>
        <span class="span_b">{{info.email}}</span>
      </p>
      <mu-divider style="color: #FFFFFF"></mu-divider>
    </div>

    <div class="data_Hobby">
      <mu-divider style="color: #FFFFFF"></mu-divider>
      <p>
        <span>个人说明：</span>
        <span class="span_b">{{info.autograph}}</span>
      </p>
      <mu-divider style="color: #FFFFFF"></mu-divider>
    </div>
  </div>
</template>

<script>
  import {PersonInfo} from "@/api/othersHomepage";
  import {token} from '@/common/js/token';
  import {transStamp2} from '@/common/js/timeStamp'

  export default {
    name: "dataPage",
    props: ['oId'],

    data() {
      return {
        info:''
      };
    },
    created() {
      this._getDetails()
    },
    methods: {
      async _getDetails(){
        const params = {
          token:sessionStorage.getItem('token'),
          uid:this.oId
        };
        const {code, data, msg} = await PersonInfo(params);
        if(code=='1'){
          data.birthday=transStamp2(data.birthday)
          this.info=data
        }else {
          this.$toast.message(data);
        }
      },
    },
  }
</script>

<style scoped>
  p {
    margin: 0;
  }

  .dataPage_content {
    padding: 10px 0 20px;
    background: #f1f0f0;
    height: auto;
  }

  .daat_Basics {
    background: #FFFFFF;
  }

  .daat_Basics p, .data_Hobby p {
    padding: 5px 40px 4px;
    font-size: 14px;
    margin: 5px 0 0px;
  }

  .span_b {
    font-weight: 700;
    margin-left: 15px;
  }

  .data_Hobby {
    background: #FFFFFF;
    margin-top: 20px;
  }
</style>
