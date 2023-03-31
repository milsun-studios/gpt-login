import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/mschat",
  timeout: 50000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// 错误处理函数
function errorHandle(response) {
  switch (response.status) {
    case 400:
      // 处理错误信息，例如抛出错误信息提示，或者跳转页面等处理方式。
      // return Promise.resolve(error)
      break;
    case 401:
      //
      break;
    case 404:
      //
      break;
    // ...
    default:
      throw new Error("未知错误");
  }
}
// 成功处理函数

function successHandle(response) {
  switch (response.status) {
    case 200:
      //
      return Promise.resolve(response.data);
    // ....
    default:
      return response.data;
  }
}
// 请求拦截器
http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {};
    error.data.msg = "服务器异常";
    return Promise.resolve(error);
  }
);

http.interceptors.response.use(
  (response) => {
    return successHandle(response);
  },
  (err) => {
    errorHandle(err);
  }
);

export default http;
