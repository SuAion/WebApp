<template>
    <div class="setup_page">
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


    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="less">
  .setup_page{

  }
  .title_p {
    text-align: center;
  }
</style>
