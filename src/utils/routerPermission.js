/// 目前只支持一级子路由,多级路由暂不支持

/**
 * 对router进行处理
 * 递归生成数组,
 * 对比生成啥的
 */
import DyRoutes from "@/router/modules"; // 获取动态路由集合

/**
 * 对原始路由列表处理成可保存的k-v数据,方便保存在数据库
 * 主要在设置角色权限并保存到数据库的时候使用
 * @param {Array} arr, 默认为全局动态路由, 在设置角色的时候可以传入对应的
 * @returns {Array} 返回的是路由整理后的k-v数据对象
 */
export function factoryRoutes(arr = DyRoutes) {
  const res = [];
  arr.forEach(route => {
    let tmp = {};
    tmp.path = route.path;
    // tmp.meta = route.meta || {};
    if (route.children) {
      tmp.children = factoryRoutes(route.children);
    }
    res.push(tmp);
  });
  return JSON.parse(JSON.stringify(res));
}

/**
 * 将k-v数据转成正儿八经的路由, 主要用在读取用户权限后
 * 从总的路由表中挑选出路由信息转化为本地路由用于挂载
 * @param {*} roleRoutes, 角色的路由列表
 * @param {*} dyRoutes  实际的路由列表
 * @returns {Array} 过滤后的角色对应的路由列表
 */
export function reFactoryRoutes(roleRoutes, dyRoutes = DyRoutes) {
  const res = [];
  roleRoutes.forEach(e => {
    const route = dyRoutes.find(route => route.path === e.path); // find函数不支持ie11以下
    if (route !== undefined) {
      if (e.children && e.children.length > 0) {
        let dyChildren = route;
        const children = reFactoryRoutes(e.children, route.children);
        dyChildren.children = children;
        res.push(dyChildren);
      } else {
        res.push(route);
      }
    }
  });
  return res;
}

/**
 * 判断路由是不是当前的动态权限路由列表中的
 */
let pathArr = [];
export function checkDyRoute(route, routes) {
  setPathArr(routes);
  return pathArr.includes(route);
}
// 递归生成路由集合
function setPathArr(routes, pre = "") {
  routes.forEach(e => {
    e.path = pre + e.path;
    pathArr.push(e.path);
    if (e.children && e.children.length > 0) {
      setPathArr(e.children, e.path + "/");
    }
  });
}
