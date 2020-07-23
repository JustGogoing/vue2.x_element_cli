/*
 * @Author: sdx
 * @Date: 2020-07-05 17:03:22
 * @LastEditTime: 2020-07-06 19:01:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-admin-cli/src/router/index.js
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/Layout";
import BashRoutes from "./modules/bash";

Vue.use(VueRouter);

const routes = [
  ...BashRoutes,
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
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
