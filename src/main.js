/*
 * @Author: your name
 * @Date: 2020-07-05 17:03:22
 * @LastEditTime: 2020-07-06 11:20:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/main.js
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV == "development") {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
