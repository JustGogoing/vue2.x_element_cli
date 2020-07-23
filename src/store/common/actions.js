import { setToken } from "@/utils/auth";
import * as types from "./types";
// import allRoutes from "@/router/modules";
import { factoryRoutes, reFactoryRoutes } from "@/utils/routerPermission";
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
  async GET_USERINFO({ commit, dispatch }) {
    // 这里调用获取用户信息接口
    // 保存该角色的路由列表和角色
    const user = { role: "superAdmin" }; // mock 后端传回的信息
    let routerArr = null;
    // 如果是超管,就直接本地获取全部路由列表
    if (user.role === "superAdmin") {
      routerArr = factoryRoutes();
    } else {
      // 不是超管获取角色对应的权限,然后转化
      const arr = await dispatch("GET_ROLE_ROUTES", user.role);
      routerArr = factoryRoutes(arr);
    }
    await commit(types.SET_ROLE, user.role);
    await commit(types.ADD_ROUTES, routerArr);
    return reFactoryRoutes(routerArr);
  },
  /**
   * 根据用户身份获取用户路由列表
   */
  /* eslint-disable-next-line */
  async GET_ROLE_ROUTES({ commit }, role) {
    // 调用根据用户角色请求路由的接口
    return [];
  }
};
export default action;
