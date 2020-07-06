<!--
 * @Author: your name
 * @Date: 2020-07-05 17:03:22
 * @LastEditTime: 2020-07-06 17:08:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/components/HelloWorld.vue
-->
<template>
  <div class="hello">
    <el-button @click="show">Button</el-button>
    {{ getToken }}
  </div>
</template>

<script>
import { get } from "../api/config";
import { mapGetters } from "vuex";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    show() {
      get();
    }
  },
  computed: {
    ...mapGetters(["getToken"])
  }
};
</script>
