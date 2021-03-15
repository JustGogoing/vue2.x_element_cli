/**
 * 对路由鉴权的一个封装
 */
import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  document.title = to.meta.title || "后台管理系统";
  next();
});

/**
 * 路由后置, 关闭进度条
 */
router.afterEach(() => {
  NProgress.done();
});
