import * as types from "./types";

export default {
  /**
   * 存储token
   */
  [types.SET_TOKEN](state, token) {
    state.token = token;
  }
};
