/*
 * @Author: your name
 * @Date: 2020-07-06 15:53:39
 * @LastEditTime: 2020-07-06 17:10:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/store/common/getters.js
 */

export default {
  getToken(state) {
    return state.token === "" ? "888888" : state.token;
  }
};
