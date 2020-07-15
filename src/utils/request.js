/*
 * @Author: sdx
 * @Date: 2020-07-05 17:40:35
 * @LastEditTime: 2020-07-06 18:58:25
 * @LastEditors: Please set LastEditors
 * @Description: 对axios进行封装以满足不同的请求需要
 * @FilePath: /vue-admin-cli/src/api/config.js
 */

import axios from "axios";
import store from "@store";
import config from "../config";
import { Message } from "element-ui";

const service = axios.create({
  baseURL: config.BASE_URL, // api的base_url
  timeout: 5000 // 请求超时时间
});

// 请求的拦截
service.interceptors.request.use(
  config => {
    // 头部添加token信息
    if (store.common.getter.getToken) {
      config.headers["X-Token"] = store.common.getter.getToken;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 相应的全局拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data;
    } else {
      httpErrorHandler(response);
      return Promise.reject(response.statusText);
    }
  },
  err => {
    return Promise.reject(err);
  }
);

// http状态码错误
function httpErrorHandler(response) {
  let { status: code, statusText } = response.status;
  let err = {
    code,
    statusText
  };
  // 这里status：需要和服务器约定统一
  switch (code) {
    case 400:
      err.message = "请求错误";
      break;
    case 401:
      err.message = "未授权，请重新登录，2 秒后将跳转至登录页面";
      break;
    case 403:
      err.message = "拒绝访问";
      break;
    case 404:
      err.message = `请求地址出错: ${response.config.url}`;
      break;
    case 408:
      err.message = "请求超时";
      break;
    case 500:
      err.message = "服务器内部错误";
      break;
    case 501:
      err.message = "服务未实现";
      break;
    case 502:
      err.message = "网关错误";
      break;
    case 503:
      err.message = "服务不可用";
      break;
    case 504:
      err.message = "网关超时";
      break;
    case 505:
      err.message = "HTTP版本不受支持";
      break;
    default:
  }
  Message({
    type: "error",
    message: err.message,
    duration: 3000
  });
}

export default service;
