<template>
  <div class="container">
    <h1 class="title">后台管理系统</h1>
    <div class="card">
      <el-input
        class="input"
        placeholder="请填写账号(6-16位)"
        type="text"
        maxlength="16"
        minlength="6"
        clearable
        v-model.trim="acc"
      >
        <template slot="prepend">账号</template>
      </el-input>
      <el-input
        class="input"
        placeholder="请输入密码(6-12位)"
        type="password"
        clearable
        minlength="6"
        maxlength="12"
        v-model="pwd"
      >
        <template slot="prepend">密码</template>
      </el-input>
      <el-button
        class="btn-login"
        type="primary"
        :disabled="loginDis"
        @click="login"
        >登录</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Api from "@/api/api";
import md5 from "md5";
export default {
  name: "login",
  data: function() {
    return {
      acc: "",
      pwd: ""
    };
  },
  methods: {
    ...mapActions("common", ["SAVE_USER"]),
    login() {
      Api.login({
        acc: this.acc,
        pwd: md5(this.pwd)
      }).then(res => {
        this.SAVE_USER(res.data);
        this.$router.replace({
          name: "dashboard"
        });
      });
    }
  },
  computed: {
    loginDis() {
      if (
        this.acc.length >= 6 &&
        this.acc.length <= 166 &&
        this.pwd.length >= 6 &&
        this.pwd.length <= 12
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  padding-top: 15vh;
  width: 100vw;
  height: 100vh;
  background-color: grey;
  box-sizing: border-box;
  overflow: hidden;
  .title {
    color: #fff;
    margin-bottom: 48px;
  }
  .card {
    .input {
      margin-bottom: 24px;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
