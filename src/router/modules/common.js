/**
 * 静态路由,但是要能读取的
 * 不同于bash之中的
 */
import Layout from "@/Layout";

const CommonRouters = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "dashboard", icon: "el-icon-house" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        meta: { title: "dashboard" },
        component: () =>
          import(/* webpackChunkName: "dashboard"  */ "@views/Dashboard")
      }
    ]
  }
];

export default CommonRouters;
