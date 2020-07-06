/*
 * @Author: sdx
 * @Date: 2020-07-05 17:40:35
 * @LastEditTime: 2020-07-06 18:27:13
 * @LastEditors: Please set LastEditors
 * @Description: 调用封装的axios,实现不同的数据请求格式
 * @FilePath: /vue-admin-cli/src/api/config.js
 */
/**
 * 待做
 * 大文件上传下载这块
 * 多个并发请求的处理
 * 请求的取消
 */

import qs from "qs";
import { Message } from "element-ui";

import service from "@/utils/request.js";

/**
 * get 请求,
 * @param {String} url
 * @param {Object} params
 * @param {Object} options
 */
export function GET(url, params = {}, options = {}) {
  const config = setConfig(options);
  return new Promise((resolve, reject) => {
    service
      .get(url, params, config)
      .then(res => {
        // resolve(res);
        errCodeHandler(res, resolve, reject);
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * post
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
export function POST(url, data, options = {}) {
  const config = setConfig(options);
  return new Promise((resolve, reject) => {
    service
      .post(url, qs.stringify(data), config)
      .then(res => {
        // resolve(res);
        errCodeHandler(res, resolve, reject);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// put
// delete
// .....

/**
 * 对于一些请求需要单独处理
 * @param {Object} options
 * @param {Object} options.type  header的几种类型, 如下
 * @param {Object} options.responseType 返回的数据类型
 * xxx  对于请求过期时间可能还要单独处理以适应上传等
 */
function setConfig(options) {
  const { type = 0, responseType = "json" } = options;
  const Header = setHeader(type);
  return {
    headers: Header,
    responseType
  };
}

/**
 * 对于部分请求是需要修改header的配置的
 * @param {*} options
 */
function setHeader(type) {
  let typeStr = "";
  switch (type) {
    case 1:
      // HTTP会将请求参数用key1=val1&key2=val2的方式进行组织，并放到请求实体里面
      // 注意如果是中文或特殊字符如"/"、","、“:" 等会自动进行URL转码
      // 不支持文件，一般用于表单提交  这个必须用qs
      // 参考资料：https://blog.csdn.net/liangcha007/article/details/88293121
      typeStr = "application/x-www-form-urlencoded";
      break;
    case 2:
      // 数据以纯文本形式(text/json/xml/html)进行编码，其中不含任何控件或格式字符。postman软件里标的是RAW
      typeStr = "text/plain;charset=UTF-8";
      break;
    case 3:
      // 上传文件
      typeStr = "multipart/form-data";
      break;
    case 4:
      // svg图片，如果是cookie本地验证，必须：axios.defaults.withCredentials = true
      typeStr = "image/svg+xml";
      break;
    default:
      // 用来告诉服务端消息主体是序列化后的 JSON 字符串
      typeStr = "application/json;charset=UTF-8";
      break;
  }
  return { "Content-Type": typeStr };
}

/**
 * 对错误代码的处理
 */
function errCodeHandler(res, resolve, reject) {
  const { code, msg } = res;
  switch (code) {
    case 0:
      resolve(res);
      break;
    case -1:
      // 需要单独处理的
      break;
    default:
      Message.error(msg);
      reject(res);
      break;
  }
}
