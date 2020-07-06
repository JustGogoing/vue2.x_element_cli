/*
 * @Author: your name
 * @Date: 2020-07-06 15:53:11
 * @LastEditTime: 2020-07-06 17:00:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/store/common/index.js
 */

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

export default {
  namespace: true,
  actions,
  getters,
  mutations,
  state
};
