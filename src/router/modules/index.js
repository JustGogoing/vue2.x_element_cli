/**
 * 获取所有以Menus结尾的为可动态配置的路由
 * 这里获取后生成总的动态路由列表
 * 在角色配置路由的时候,拿到这个表去筛选
 * 保存筛选后的为该角色的权限路由, 存入数据库
 * 角色登陆后获取该角色权限列表,动态添加到路由中
 */

const files = require.context(".", false, /\.js$/);
const modules = [];

files.keys().forEach(key => {
  if (key === "./index.js" || key === "./bash.js") return;
  const item = files(key).default;
  modules.push(item);
});

export default modules;
