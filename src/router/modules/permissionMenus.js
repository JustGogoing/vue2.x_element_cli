import Layout from "@/layout";

const setMenus = {
  path: "/permission",
  component: Layout,
  redirect: "/permission/user",
  meta: { title: "权限管理", icon: "el-icon-lock" },
  children: [
    {
      path: "user",
      name: "user",
      meta: { title: "用户管理" },
      component: () =>
        import(/* webpackChunkName: "permission"  */ "@views/Permission/user")
    },
    {
      path: "role",
      name: "role",
      meta: { title: "角色管理" },
      component: () =>
        import(/* webpackChunkName: "permission"  */ "@views/Permission/role")
    }
  ]
};

export default setMenus;
