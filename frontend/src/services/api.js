// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// 创建 axios 实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：自动添加 Authorization 头
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：处理错误
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    alert(error.response?.data?.detail || 'An error occurred');
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = ({ username, password }) =>
  api.post('/auth/login', { username, password });
export const executeCode = (codeData) => api.post('/code/execute', codeData);
