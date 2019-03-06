<template>
  <div class="tabbar_plate">
    <mu-container>
      <mu-bottom-nav  color="#f56e9c" :value="shift" @change="PageSkipping">
        <mu-bottom-nav-item value="首页" title="首页"   icon="home"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="社区" title="社区"   icon="account_balance"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="交友" title="交友"   icon="group_work"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="我的" title="我的"   icon="sentiment_satisfied"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>

  export default {
    name: "tabbar",
    data() {
      return {
         shift: '首页'
      };
    },
    beforeMount() {
      this.shift=localStorage.getItem('navItem')
    },
  //   mounted() {
  //       this.shift=localStorage.getItem('navItem')
  //       console.log(this.shift,'改变')
  //  },
    methods: {
      PageSkipping(val) {
        this.shift=val;
        this.$router.push({name: val,})
        localStorage.removeItem('navItem')
        localStorage.setItem('navItem', val)
        
      },

    }
  };
</script>

<style lang="less">
  .tabbar_plate {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    border-top: solid 1px #E4E4E4;
    z-index: 999;
    .container {
      padding: 0;
    }

    .mu-bottom-nav-shift-wrapper {
      background: white;
    }
  }


</style>
