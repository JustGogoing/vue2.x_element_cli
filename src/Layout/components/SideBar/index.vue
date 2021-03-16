<template>
  <div class="menu-wrap">
    <el-menu
      default-active="1"
      class="menu"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">轮播图管理</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">作品管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">成员管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
.menu-wrap {
  width: 200px;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  .menu {
    height: 100%;
  }
}
</style>
