<template>
    <div class="leader">
        <header>
              <mu-button round color="primary" to='main' style="float: right;margin-right: 10px;">进入</mu-button>
        </header>
        <footer>
             <mu-button   to='login' round color="primary">登陆</mu-button>
              <mu-button  to='regis'   round color="primary">注册</mu-button>
        </footer>
    </div>
</template>

<script>
  export default {
    name: "leader",
     data() {
      return {
      };
    },
    methods: {
      PageSkipping(val) {
        this.$router.push({name: val,})
      },
    }
  };
</script>

<style scoped lang="less">
.leader{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url("../../../static/leader/001.jpg");
    background-size: cover;
}
header{
    position: absolute;
    top: 30px;
    left: 0px;
    width: 100%;;
}
footer{
    position: absolute;
    bottom: 30px;
    display: flex;
    justify-content: space-around;
    width: 100%;

}

</style>
