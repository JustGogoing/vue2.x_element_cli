import { POST } from "@/utils/http";
export default {
  /**
   * 1.1 登录
   * @param {string} params.acc
   * @param {string} params.pwd
   */
  login: params => {
    return POST("/api/login", params);
  }
};
