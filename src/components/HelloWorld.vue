<!--
 * @Author: your name
 * @Date: 2020-07-05 17:03:22
 * @LastEditTime: 2020-07-06 10:57:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/components/HelloWorld.vue
-->
<template>
  <div class="hello">
    <el-button @click="show">Button</el-button>
  </div>
</template>

<script>
import {get} from '../api/config'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    show() {
      get()
    }
  }
};
</script>
