import { reFactoryRoutes } from "@/utils/routerPermission";
const getters = {
  // 对vuex中的路由处理为真正的路由
  getRoutes(state) {
    return reFactoryRoutes(state.routes);
  }
};

export default getters;
