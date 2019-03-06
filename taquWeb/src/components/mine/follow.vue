<template>
  <div calss="follow_content">
    <mu-appbar style="width: 100%;" color="#f56e9c">
      <mu-row>
        <mu-col span="4">
          <p class="title_button">
            <mu-button icon style="margin-top: 5px" @click="ReturnPage">
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
    <mu-container style="padding: 0">
      <mu-tabs :value.sync="active" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" full-width @change="tabChange">
        <mu-tab value="0">关注</mu-tab>
        <mu-tab value="1">圈子</mu-tab>
        <mu-tab value="2">粉丝</mu-tab>
      </mu-tabs>
    </mu-container>
    <mu-load-more :loading="loading" @load="load">
      <mu-list>
        <mu-list-item avatar button :ripple="true" v-for="(item,index) in dataList" :key="index" @click="PageSkipping(active=='1'?item.cid:item.uid,item.name,item.img)">
          <mu-list-item-action>
            <mu-avatar>
              <img :src="item.img">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chat_bubble"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
    </mu-load-more>

  </div>
</template>

<script>
  import {UserCollectionPerson, UserCircle, PersonCollectionUser} from '@/api/mine';
  import {token} from '@/common/js/token'

  export default {
    name: "follow",
    data() {
      return {
        active: '0',
        dataList: [],
        list1:[],
        list2:[],
        list3:[],
        page1:1,
        page2:1,
        page3:1,
        loading: false,
      };
    },
    created() {
      this.active = this.$route.query.type

      // this._getList();
      if(this.active=='0'){
        this._getFollowPeople()
      }else if(this.active=='1'){
        this._getCircleList()
      }else {
        this._getFansList()
      }
    },
    methods: {
      //获取关注人列表
      async _getFollowPeople(){
        const params = {
          token:sessionStorage.getItem('token'),
          page: this.page1,
        };
        const {code, data, msg} = await UserCollectionPerson(params);
        if(code=='1'){
          this.list1=this.list1.concat(data.list)
          this.dataList=this.list1
        }else {
          this.$toast.message(data);
        }
      },
      //获取圈子列表
      async _getCircleList() {
        const params = {
          token:sessionStorage.getItem('token'),
          page: this.page2,
        };
        const {code, data, msg} = await UserCircle(params);
        if(code=='1'){
          this.list2=this.list2.concat(data.list)
          this.dataList=this.list2
        }else {
          this.$toast.message(data);
        }
      },
      //获取粉丝列表
      async _getFansList(){
        const params = {
          token:sessionStorage.getItem('token'),
          page: this.page3,
        };
        const {code, data, msg} = await PersonCollectionUser(params);
        if(code=='1'){
          this.list3=this.list3.concat(data.list)
          this.dataList=this.list3
        }else {
          this.$toast.message(data);
        }
      },
      //改变头时
      tabChange(val) {
        this.active = val
        console.log(this.active)
        // this._getList()
        if(this.active=='0'){
          this.list1[0]?this.dataList=this.list1:this._getFollowPeople()
        }else if(this.active=='1'){
          this.list2[0]?this.dataList=this.list2:this._getCircleList()
        }else {
          this.list3[0]?this.dataList=this.list3:this._getFansList()
        }
      },
      //点击
      PageSkipping(id,name,img) {
        console.log(id)
        // this.$router.push({path: '/others', query: {id}})
        if (this.active == '1') {
          this.$router.push({path: '/group', query: {cid:id,name:name}})
          localStorage.setItem('bgImg',img)
        } else {
          this.$router.push({path: '/others', query: {id}})
        }
      },
      ReturnPage() {
        this.$router.back(-1)
      },
      //下拉刷新
      load() {
        this.loading = true;
        setTimeout(() => {
          if(this.active=='0'){
            this._getFollowPeople()
          }else if(this.active=='1'){
            this._getCircleList()
          }else {
            this._getFansList()
          }
          // this.loading = false;
          // let arr = [{
          //   imgUrl: "/static/img/HeadPortrait.012b928.jpg",
          //   name: 'Mike Mai3',
          //   id: '3'
          // }, {
          //   imgUrl: "/static/img/HeadPortrait.012b928.jpg",
          //   name: 'Mike Mai4',
          //   id: '3'
          // }]
          // this.dataList=this.dataList.concat(arr);
        }, 2000)
      }
    }

  }
</script>

<style scoped lang="less">
  .title_p {
    text-align: center;
  }

  .demo-text {
    padding: 16px;
    background: #fff;
    p {
      margin: 8px 0;
    }
  }

  .demo-list-wrap {
    width: 100%;
    max-width: 360px;
  }

  .demo-loadmore-content {
    flex: 1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

</style>
