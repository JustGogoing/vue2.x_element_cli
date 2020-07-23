/**
 * 对路由鉴权的一个封装
 */
import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import AllRoutes from "./router/modules";
import { getToken } from "@/utils/auth";

// 不会被重定向的白名单, 可以从router/modules/bash.js中获取
const whiteList = ["/login"];
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || "后台管理系统";
  const token = getToken();
  if (token) {
    if (to.path === "/login") {
      next({
        path: "/",
        replace: true
      });
      NProgress.done();
    } else {
      // 这里获取判断是否已经有存在本地的路由, 有的话继续, 没有的话获取
      const { role, routes } = store.state.common;
      const hasRoles = role && routes.length > 0;
      if (hasRoles) {
        next();
      } else {
        /**
         * 1. 根据cookie中的token 获取用户信息
         * 2. 根据用户角色获取路由列表
         * 3. 动态挂载并保存
         */
        const routes = await store.dispatch(`common/GET_USERINFO`);
        router.addRoutes(routes);
        next({ ...to, replace: true });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

/**
 * 路由后置, 关闭进度条
 */
router.afterEach(() => {
  NProgress.done();
});
