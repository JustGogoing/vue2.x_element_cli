import { setToken } from "@/utils/auth";
import * as types from "./types";
const action = {
  /**
   * 登陆获取token
   */
  async SAVE_TOKEN({ commit }, payload) {
    // 这里调用登陆接口, 返回token
    await commit(types.SET_TOKEN, payload);
    setToken(payload);
  }
};
export default action;
