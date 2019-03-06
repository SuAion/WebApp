<template>
  <div class="main-container">
    <div class="content-container">
      <transition name="slide" mode="out-in">
        <router-view/>
      </transition>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
  import TabBar from "@/components/main/tabbar";
  export default {
    name: "index",
    components: {
      TabBar
    }
  }
</script>

<style scoped>
  .main-container{
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*background: #EDEDED;*/
  }
</style>
