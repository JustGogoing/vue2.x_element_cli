<template>
  <div :class="isCollapse ? '' : 'menu-wrap'">
    <el-menu
      :collapse="isCollapse"
      default-active="0"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        :index="index+''"
        v-for="(item, index) in getRoutes"
        :key="item.path"
      >
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  computed: {
    ...mapGetters("common", ["getRoutes"]),
    ...mapState("common", ["isCollapse"])
  }
};
</script>

<style lang="scss" scoped>
.menu-wrap {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100vh;
  overflow-y: scroll;
}
</style>
