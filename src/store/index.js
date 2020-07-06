/*
 * @Author: your name
 * @Date: 2020-07-05 17:03:22
 * @LastEditTime: 2020-07-06 17:01:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/store/index.js
 */

import Vue from "vue";
import Vuex from "vuex";
import common from "./common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    common
  }
});
