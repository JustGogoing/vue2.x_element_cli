<template>
  <div>
    这个是登陆页面

    <el-button @click="setToken">设置token</el-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data: function() {
    return {};
  },
  methods: {
    ...mapActions("common", ["GET_TOKEN"]),
    setToken() {
      this.GET_TOKEN();
    }
  }
};
</script>

<style lang="scss" scoped></style>
