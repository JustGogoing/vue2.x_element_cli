<template>
  <div :class="isCollapse ? '' : 'menu-wrap'">
    <el-menu
      router
      :collapse="isCollapse"
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <side-bar-item
        v-for="item in combineRoute"
        :key="item.path"
        :item="item"
        :path="item.path"
      />
    </el-menu>
  </div>
</template>

<script>
import commonRoutes from "@/router/modules/common";
import { mapGetters, mapState } from "vuex";
import SideBarItem from "./SideBarItem";
export default {
  components: { SideBarItem },
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
    ...mapState("common", ["isCollapse"]),
    combineRoute() {
      return [...commonRoutes, ...this.getRoutes];
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
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
