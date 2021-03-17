// 基础路由, 不需要权限的
import Layout from "@/Layout";
const BashRouters = [
  {
    path: "/",
    component: Layout,
    redirect: { name: "dashboard" },
    meta: { title: "dashboard", icon: "el-icon-house" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { title: "dashboard", activeMenu: "/" },
        component: () =>
          import(/* webpackChunkName: "dashboard"  */ "@views/dashboard")
      },
      {
        path: "banner",
        name: "banner",
        meta: { title: "banner", activeMenu: "/" },
        component: () =>
          import(/* webpackChunkName: "dashboard"  */ "@views/banner")
      },
      {
        path: "addBanner",
        name: "addBanner",
        meta: { title: "addBanner", activeMenu: "/" },
        component: () =>
          import(/* webpackChunkName: "dashboard"  */ "@views/banner/add")
      },
      {
        path: "works",
        name: "works",
        meta: { title: "works", activeMenu: "/" },
        component: () =>
          import(/* webpackChunkName: "dashboard"  */ "@views/works")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "bash" */ "@views/login"),
    meta: { title: "登录" }
  }
];

export default BashRouters;
