import * as types from "./types";

export default {
  /**
   * 保存用户角色
   */
  [types.SET_ROLE](state, role) {
    state.role = role;
  },
  /**
   * 保存路由
   */
  [types.ADD_ROUTES](state, routes) {
    state.routes = routes;
  },
  /**
   * 存储token
   */
  [types.SET_TOKEN](state, token) {
    state.token = token;
  }
};
