import * as types from "./types";

export default {
  /**
   * 存储user
   */
  [types.SAVE_USER](state, payload) {
    state.user = payload;
  },
  [types.EXIT](state) {
    state.user = {};
  }
};
