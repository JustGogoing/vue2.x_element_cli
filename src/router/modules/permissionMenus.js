import Layout from "@/Layout";

const setMenus = {
  path: "/permission",
  component: Layout,
  redirect: "/permission/user",
  meta: { title: "权限管理", icon: "lock" },
  children: [
    {
      path: "user",
      name: "user",
      component: () =>
        import(/* webpackChunkName: "permission"  */ "@views/Permission/user")
    },
    {
      path: "role",
      name: "role",
      component: () =>
        import(/* webpackChunkName: "permission"  */ "@views/Permission/role")
    }
  ]
};

export default setMenus;
