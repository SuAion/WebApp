<template>
  <div class="login-container">
    <mu-container>
      <div class="head">
          <h3>登陆</h3>
      </div>
      <div class="logo">
        <img src="../../../static/friend_index/002.png" alt="" style="width:50px;height:50px;">
      </div>
      <mu-form ref="form" :model="validateForm" class="mu-demo-form" style="padding:10px;" label-position='left'> 
        <mu-form-item label="邮箱:" prop="account" :rules="accountRules">
          <mu-text-field  v-model="validateForm.account" prop="account"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码:" prop="password" :rules="passwordRules">
          <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
        <mu-form-item >
          <mu-button style="margin-left:35%;" color="primary" @click="submit">登陆</mu-button><router-link v-bind:to="'regis'" style="color: rgb(0, 0, 0);margin-top: 17px;">注册成为会员</router-link>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
import { login,} from '@/api/user/login';
import jsonToFormData from '@/common/js/jsonToFormData';
//引入muse-ui的插件
import Toast from "muse-ui-toast";

export default {
  name: "login",
  data: function() {
    return {
      accountRules: [
        { validate: val => !!val, message: "必须填邮箱" },
        { validate: val => {
          
          let reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
           console.log(reg.test(val))
          if(reg.test(val)==true){
            return true
          }else{
            return false
          }
        }, message: "请输入正确的登录邮箱" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      validateForm: {
        account: "",
        password: "",
        isAgree: false
      },
      loading: {
        login: false
      }
    };
  },
  watch: {
    "ruleForm.account"() {
      if (this.ruleForm.account === "") {
        this.ruleForm.password === "";
      }
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate().then((result) => {
        if (result) {
          this._login();
        } else {
          return false;
        }
      });
    },
    async _login() {
      this.loading.login = true;
      const params = this.validateForm;
      const { code, data, msg } = await login(jsonToFormData(params));
      if (code == "1") {
        this.$router.push("/main");
        sessionStorage.setItem("token", data);
      } else {
        Toast.error(data);
      }
      this.loading.login = false;
    }
  }
};
</script>

<style scoped lang="less">
.login-container {
  .head{
      position: fixed;
      left: 45%;
      right: 0;
      top: 0;
  }
  .logo{
    display: flex;
    justify-content: center;
  }
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-content {
    padding: 20px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    .ms-login {
      width: 360px;
      padding: 25px 40px;
      border-radius: 5px;
      background: #f5f5f5;
      .logo {
        padding: 20px;
        font-size: 18px;
        color: #409eff;
      }
      .login-btn {
        text-align: center;
        button {
          width: 100%;
        }
        .sub-btn {
          padding-top: 10px;
          text-align: right;
        }
      }
    }
  }
  .checkout-btn {
    position: absolute;
    right: 90px;
    top: 50%;
    margin-top: -70px;
    .item {
      margin-top: 30px;
      .primary {
        background: #409eff;
        border: 1px solid #409eff;
        color: #fff;
      }
    }
  }
}
</style>
