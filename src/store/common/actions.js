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
  async GET_USERINFO({ commit }) {
    // 这里调用获取用户信息接口
    // 保存该角色的路由列表和角色
    const routerArr = factoryRoutes(); // 这里应该是用户那边保存的k-y,从服务端请求
    const role = "superAdmin";
    await commit(types.SET_ROLE, role);
    await commit(types.ADD_ROUTES, routerArr);
    return reFactoryRoutes(routerArr);
  }
  /**
   * 根据用户身份获取用户路由列表
   */
};
export default action;
