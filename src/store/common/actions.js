import { setToken } from "@/utils/auth";
import * as types from "./types";
// import DyRoutes from "@/router/modules";
import { factoryRoutes } from "@/utils/routerPermission";
const action = {
  /**
   * 登陆获取token
   */
  async GET_TOKEN({ commit }) {
    // 这里调用登陆接口, 返回token
    const token = "token-test";
    await commit(types.SET_TOKEN, token);
    setToken(token);
  },
  /**
   * 根据token获取用户信息,
   * 用户信息中有角色,和该角色对应的路由列表
   */
  async GET_USERINFO({ commit, dispatch }, token) {
    // 这里调用获取用户信息接口,
    console.log(token);
    const user = { role: "superAdmin" }; // mock 后端传回的信息
    const routerArr = dispatch("GET_ROLE_ROUTES", user.role);
    await commit(types.SET_ROLE, user.role);
    await commit(types.ADD_ROUTES, routerArr);
    return routerArr;
  },
  /**
   * 根据用户身份获取用户路由列表
   */
  /* eslint-disable-next-line */
  async GET_ROLE_ROUTES({ commit }, role) {
    let routerArr = null;

    // 调用根据用户角色请求路由的接口
    // 如果是超管,就直接本地获取全部路由列表
    if (role === "superAdmin") {
      routerArr = factoryRoutes(); // 正常接口获取的不需要fac,
    } else {
      // 不是超管就调用接口获取 xxx
      routerArr = factoryRoutes([]);
    }
    return routerArr;
  }
};
export default action;
