import { POST, GET, DELETE } from "@/utils/http";
export default {
  /**
   * 1.1 登录
   * @param {string} params.acc
   * @param {string} params.pwd
   */
  login: params => {
    return POST("/api/login", params);
  },
  /**
   * 1.2 获取轮播图列表
   * @param {number} params.page
   */
  bannerList: params => {
    return GET("/api/banner", params);
  },
  /*1.3 获取用户列表*/
  getUsers: params => {
    return GET("/api/users", params);
  },
  /*1.4 新增用户*/
  addUser: params => {
    return POST("/api/user", params);
  },
  /**
   * 1.5 更新用户
   */
  updateUser: params => {
    return POST("/api/updateUser", params)
  },
  /**
   * 1.6 删除用户
   */
  removeUser: params => {
    return DELETE("/api/removeUser", params)
  },
  /**
   * 2.1 获取作品列表
   */
  getWorks: params => {
    return GET("/api/works", params)
  }
};
