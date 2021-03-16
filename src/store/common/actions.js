import * as types from "./types";
const action = {
  /**
   * 登陆获取token
   */
  async SAVE_USER({ commit }, payload) {
    await commit(types.SAVE_USER, payload);
  },
  async EXIT({ commit }) {
    await commit(types.EXIT);
  }
};
export default action;
