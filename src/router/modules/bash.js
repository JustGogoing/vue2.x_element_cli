// 基础路由, 不需要权限的

const BashRouters = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "bash" */ "@views/Login"),
    meta: { title: "登录" }
  }
];

export default BashRouters;
