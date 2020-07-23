// 基础路由, 不需要权限的

const BashRouters = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "bash" */ "@views/Login"),
    meta: { title: "登录" }
  },
  {
    path: "/401",
    name: "401",
    component: () => import(/* webpackChunkName: "bash" */ "@views/Error/401"),
    meta: { title: "401" }
  },
  {
    path: "/404",
    name: "404",
    component: () => import(/* webpackChunkName: "bash" */ "@views/Error/404"),
    meta: { title: "404" }
  }
];

export default BashRouters;
