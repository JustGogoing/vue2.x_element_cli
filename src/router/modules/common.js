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
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () =>
          import(/* webpackChunkName: "dashboard"  */ "@views/Dashboard"),
        meta: { title: "dashboard", icon: "dashboard" }
      }
    ]
  }
];

export default CommonRouters;
