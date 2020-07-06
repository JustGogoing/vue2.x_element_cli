/*
 * @Author: your name
 * @Date: 2020-07-06 15:53:24
 * @LastEditTime: 2020-07-06 16:58:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/store/common/mutations.js
 */

import * as types from "./types";

export default {
  [types.SET_TOKEN](state, token) {
    state.token = token;
  }
};
