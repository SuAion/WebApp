<template>
  <div class="many_people" id="dialogue_box">
    <mu-appbar style="width: 100%;position: fixed;top: 0;">
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
            聊天室
          </p>
        </mu-col>
        <mu-col span="4">

        </mu-col>
      </mu-row>
    </mu-appbar>
    <div class="chatContent">
      <div v-for="item in chatArr">
        <p v-if="item.userAccess"
           style="color: white; background: #00000042;text-align: center;border-radius: 5px;margin-bottom: 10px !important;">
          {{item.userAccess}}</p>

        <div class="chatContent_box" v-if="item.isSelf==false">
          <mu-avatar size="48" style="margin: 4px 8px 0 0">
            <img :src="item.icon">
          </mu-avatar>
          <div class="userText">
            <p>{{item.nickname}}</p>
            <span>{{item.msg}}</span>
          </div>
        </div>

        <div class="chatContent_box" v-else style="justify-content:flex-end" v-if="item.isSelf==true">
          <div class="userText" style="text-align: right;">
            <p>{{item.nickname}}</p>
            <span>{{item.msg}}</span>
          </div>
          <mu-avatar size="48" style="margin: 4px 0 0 8px">
            <img :src="item.icon">
          </mu-avatar>
        </div>

      </div>
    </div>

    <mu-dialog title="提示" width="360" :open.sync="openSimple">
      该房间不存在！
      <mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">确定</mu-button>
    </mu-dialog>

    <div class="chatBox">
      <input type="text" placeholder="说点什么...." v-model="news">
      <mu-button flat color="primary" @click="sendNews">→</mu-button>
    </div>

  </div>
</template>

<script>
  let Heartbeat
  export default {
    name: "manyPeople",
    data() {
      return {
        websock: null,
        openSimple: false,
        news: '',
        userAccess: '',
        chatArr: [],
        rid:'',
      };
    },
    created() {
      this.initWebSocket();
      this.rid = this.$route.query.id;
    },
    destroyed() {
      this.websock.close(); //离开路由之后断开websocket连接
      clearInterval(Heartbeat)
    },
    updated: function () {
      this.$nextTick(function () {
        var div = document.getElementById('dialogue_box');
        div.scrollTop = div.scrollHeight;
      })
    },
    methods: {
      //房间不存在时
      closeSimpleDialog(){
        this.openSimple = false;
        this.$router.back(-1)
      },
      //心跳包
      heart(){
        Heartbeat=setInterval(()=>{
          var obj={
            type:'heart',
          }
          this.websock.send(JSON.stringify(obj));
        },10000)
      },
      //点击发送
      sendNews() {
        if (this.news) {
          this.threadPoxi()
        }
      },
      //发送消息
      threadPoxi() {
        //参数
        const agentData = {
          text: this.news,
          type: 'say',
          rid: this.rid,
        }
        //若是ws开启状态
        if (this.websock.readyState === this.websock.OPEN) {
          this.websocketsend(JSON.stringify(agentData))
        }
        // 若是 正在开启状态，则等待300毫秒
        else if (this.websock.readyState === this.websock.CONNECTING) {
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(JSON.stringify(agentData))
          }, 300);
        }
        // 若未开启 ，则等待500毫秒
        else {
          this.initWebSocket();
          let that = this;//保存当前对象this
          setTimeout(function () {
            that.websocketsend(JSON.stringify(agentData))
          }, 500);
        }
        console.log(this.chatArr)
      },
      initWebSocket() { //初始化weosocket
        const wsuri = "ws://47.107.92.235:50001";
        // const wsuri = "192.168.0.29:2345";
        this.websock = new WebSocket(wsuri);
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onclose = this.websocketclose;
        this.heart();
      },
      websocketonopen() { //连接建立之后执行send方法发送数据
        let actions = {
          token: '456',
          type: 'login',      //login  heart  say
          rid: this.rid,      //login
          text: '内容'         //say
        };
        let a = {
          uid: '2',
          type: 'login',
          rid: this.rid,
        }
        this.websocketsend(JSON.stringify(a));
      },
      websocketonerror() {//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e) { //数据接收
        console.log(e)
        if (e.data.indexOf('进入房间') > -1) {
          this.chatArr.push({
            userAccess: e.data,
          })
        }else if(e.data.indexOf('房间不存在') > -1){
          this.chatArr.push({
            userAccess: e.data,
          })
          this.openSimple = true;
        }else if (e.data.indexOf('"msg"') < 0) {
          sessionStorage.setItem('chatInfor', e.data);
        } else {
          var infor = JSON.parse(sessionStorage.getItem('chatInfor'))
          let obj = JSON.parse(e.data);
          if (infor.nickname == obj.nickname && infor.icon == obj.icon) {
            obj.isSelf = true;
          } else {
            obj.isSelf = false;
          }
          this.chatArr.push(obj)
        }
        // const redata = JSON.parse(e.data);
        this.news = ''
      },
      websocketsend(Data) {//数据发送
        this.websock.send(Data);
      },
      websocketclose(e) {  //关闭
        console.log("断开连接", e);
      }
    }
  }
</script>

<style scoped lang="less">
  .title_p {
    text-align: center;
  }

  .many_people {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    background-color: #EDEDED;
    .chatContent {
      padding: 8px 16px;
      margin-top: 61px;
      margin-bottom: 56px;
      .chatContent_box {
        display: flex;
        margin-bottom: 10px;
        .userText {
          p {
            font-size: 12px;
            margin-bottom: 6px !important;
          }
          span {
            background: white;
            padding: 5px;
            border-radius: 6px;
          }
        }
      }
    }
    .chatBox {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      padding: 10px 10px;
      display: flex;
      justify-content: space-between;
      input {
        width: 80%;
        padding-left: 10px;
        border: 1px solid #d6d6d6;
        border-radius: 10px;
        outline: none;
        background: #F7F7F7;
        color: #909090;
        height: 36px;
      }
    }
  }
</style>
