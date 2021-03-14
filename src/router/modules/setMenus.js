import Layout from "@/Layout/index.vue";

const setMenus = {
  path: "/set",
  component: Layout,
  redirect: "/set/index",
  meta: { title: "设置", icon: "el-icon-setting" },
  children: [
    {
      path: "index",
      name: "set",
      meta: { title: "设置", activeMenu: "/set" },
      component: () => import(/* webpackChunkName: "set"  */ "@views/Set"),
      children: [
        {
          path: "index-a",
          name: "seta",
          meta: { title: "设置a" },
          component: () => import(/* webpackChunkName: "set"  */ "@views/Login")
        },
        {
          path: "index-b",
          name: "setb",
          meta: { title: "设置b" },
          component: () => import(/* webpackChunkName: "set"  */ "@views/Login")
        }
      ]
    }
  ]
};

export default setMenus;
