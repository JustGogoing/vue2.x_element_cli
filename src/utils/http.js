import service from "./request";

// get请求
export const GET = (url, params, loading, options) =>
  _request("GET", url, params, loading, options);
// post请求
export const POST = (url, params, loading, options) =>
  _request("POST", url, params, loading, options);
// delete请求
export const DELETE = (url, params, loading, options) =>
  _request("DELETE", url, params, loading, options);
// put请求
export const PUT = (url, params, loading, options) =>
  _request("PUT", url, params, loading, options);

function _request(method, url, params, loading = false, options) {
  if (loading) {
    console.log("show loading");
  }
  const config = _setConfig({
    url,
    params,
    method,
    ...options
  });
  return service(config)
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(err => {
      return Promise.reject(err);
    })
    .finally(() => {
      if (loading) {
        console.log("hide loading");
      }
    });
}
/**
 * 设置请求参数
 * @param options AxiosRequestConfig
 */
function _setConfig(options) {
  const {
    type = 0,
    responseType = "json",
    onUploadProgress,
    onDownloadProgress,
    url = "",
    params,
    method
  } = options;
  // header 不止会有contenttype 这里以后要优化
  const headers = _setHeaders(type);
  const config = {
    headers,
    responseType,
    url,
    method
  };
  if (method === "GET" || method === "DELETE") {
    config.params = params;
  } else {
    config.data = params;
  }
  if (onUploadProgress) {
    config.onUploadProgress = onUploadProgress;
  }
  if (onDownloadProgress) {
    config.onDownloadProgress = onDownloadProgress;
  }
  return config;
}

/**
 * 设置请求头
 * @param type
 */
function _setHeaders(type) {
  let typeStr;
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
