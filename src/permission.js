/**
 * 对路由鉴权的一个封装
 */
import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || "后台管理系统";
  const token = store.getters["common/token"];
  if (to.name !== "login") {
    if (token) {
      next();
    } else {
      next({
        name: "login"
      });
    }
  } else {
    next();
  }
});

/**
 * 路由后置, 关闭进度条
 */
router.afterEach(() => {
  NProgress.done();
});
