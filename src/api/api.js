import { POST, GET } from "@/utils/http";
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
  }
};
