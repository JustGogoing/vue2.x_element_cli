import { POST, GET, DELETE, PUT } from "@/utils/http";
export default {
  /**
   * 1.1 登录
   * @param {string} params.acc
   * @param {string} params.pwd
   */
  login: params => {
    return POST("/login", params);
  },
  /**
   * 1.2 获取轮播图列表
   * @param {number} params.page
   */
  bannerList: params => {
    return GET("/banner", params);
  },
  /**
   * 1.21 获取轮播图列表
   * @param {number} params.page
   */
  delBanner: params => {
    return DELETE("/banner", params);
  },
  addBanner: params => {
    return POST("/banner", params, false, {type: 3})
  },
  /*1.3 获取用户列表*/
  getUsers: params => {
    return GET("/users", params);
  },
  /*1.4 新增用户*/
  addUser: params => {
    return POST("/user", params);
  },
  /**
   * 1.5 更新用户
   */
  updateUser: params => {
    return POST("/updateUser", params)
  },
  /**
   * 1.6 删除用户
   */
  removeUser: params => {
    return DELETE("/removeUser", params)
  },
  /**
   * 2.1 获取作品列表
   */
  getWorks: params => {
    return GET("/works", params)
  },
  /**
   * 2.2 发表作品
   */
  addWorks: params => {
    return POST("/works", params, false, {type: 3})
  },
  /**
   * 2.3删除作品
   */
  removeWork: params => {
    return DELETE("/works", params)
  },
  /**
   * 2.4 切换作品更新状态
   */
  toggleRecommend: params => {
    return PUT("/works", params)
  }
};
