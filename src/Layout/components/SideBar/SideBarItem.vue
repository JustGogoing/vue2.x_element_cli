<template>
  <div>
    <!-- 不需要二级菜单的 -->
    <template v-if="checkHasOneChild(item)">
      <el-menu-item :index="path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="item.path" popper-append-to-body>
      <template slot="title">
        <div v-if="item.meta">
          <i :class="item.meta.icon"></i>
          <span>{{ item.meta.title }}</span>
        </div>
      </template>
      <side-bar-item
        v-for="child in item.children"
        :key="item.path + '/' + child.path"
        :path="item.path + '/' + child.path"
        :item="child"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    item: {
      type: Object
    },
    path: {
      type: String
    }
  },
  methods: {
    /**
     * 判断是不是只有一个子元素
     * 如果有多个子元素, 那么就得全部展示
     * 如果只有有1个子元素, 并且子元素的path或者子元素的重定向(要递归到最后)
     * 和父元素重定向的地址一样,就不展示子元素
     */
    checkHasOneChild(item) {
      // 多个
      if (item.children && item.children.length > 1) {
        return false;
      } else {
        // 没有子元素或者只有一个
        // 判断仅有的一个是不是和他的重定向地址一样, 一样不显示子菜单, 不一样显示子菜单
        // 有可能子路由1个 但是孙路由好几个,这种也要false
        return true;
      }
    }
  }
};
</script>

<style></style>
