/*
 * @Author: your name
 * @Date: 2020-07-05 17:03:22
 * @LastEditTime: 2020-07-06 17:32:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/store/index.js
 */

import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import common from "./common";
Vue.use(Vuex);

// 本地持久化vuex中的数据
const vuexLocal = new VuexPersistence({
  key: "hzm",
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common
  },
  plugins: [vuexLocal.plugin]
});
