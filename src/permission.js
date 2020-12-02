/**
 * 对路由鉴权的一个封装
 */
import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { reFactoryRoutes } from "@/utils/routerPermission";
// 不会被重定向的白名单, 可以从router/modules/bash.js中获取
const whiteList = ["/login"];
let count = 0;
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
      /// ###这块可能写复杂了, 可以改为路由不保存在vuex中,每次刷新重新调接口获取挂载即可###
      // 这里获取判断是否已经有存在本地的路由,并且未挂载到实例上
      // 有的话将本地的挂载到路由上继续, 没有的话获取
      const { role } = store.state.common;
      const hasRoles = role.length > 0;
      if (hasRoles) {
        // 刷新的时候要将vuex中的路由重新addRoutes
        // 通过count防止每次跳转重复挂载
        let routes = [];
        if (count === 0) {
          routes = await store.dispatch(`common/GET_ROLE_ROUTES`, role);
          router.addRoutes(await reFactoryRoutes(routes));
          // 通配符动态添加, 就不会发生动态路由挂载后还会404了
          router.push({ path: "*", redirect: "/404", hidden: true });
          ++count;
        }
      } else {
        /**
         * 1. 根据cookie中的token 获取用户信息
         * 2. 根据用户角色获取路由列表
         * 3. 动态挂载并保存
         */
        const routes = await store.dispatch(`common/GET_USERINFO`, token);
        router.addRoutes(reFactoryRoutes(routes));
        // 通配符动态添加, 就不会发生动态路由挂载后还会404了
        router.push({ path: "*", redirect: "/404", hidden: true });
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
