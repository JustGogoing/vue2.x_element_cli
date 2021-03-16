<template>
  <el-container class="container">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu default-active="/dashboard" router>
        <el-menu-item index="/dashboard">
          <template slot="title">
            <i class="el-icon-house"></i>
            Dashboard
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            内容管理
          </template>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/works">作品管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>人员管理</template
          >
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown @command="handleCommand">
          <span>{{ user.user_name }}</span>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layout",
  computed: {
    ...mapState("common", ["user"])
  },
  methods: {
    handleCommand(e) {
      if (e === "exit") {
        this.$store.dispatch("common/EXIT");
        this.$router.replace({
          name: "login"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.container {
  width: 100vw;
  height: 100vh;
  border: 1px solid #eee;
}
</style>
