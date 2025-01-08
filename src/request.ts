import axios from 'axios';

const axiosInstance = axios.create({});

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 自动返回 response.data
    return response.data;
  },
  (error) => {
    // 在请求失败时抛出错误
    return Promise.reject(error);
  },
);

export default axiosInstance;
