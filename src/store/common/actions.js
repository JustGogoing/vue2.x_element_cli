import * as types from "./types";
const action = {
  /**
   * 登陆获取token
   */
  async SAVE_USER({ commit }, payload) {
    // 这里调用登陆接口, 返回token
    await commit(types.SAVE_USER, payload);
  }
};
export default action;
