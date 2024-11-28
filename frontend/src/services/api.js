import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically add Authorization header
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

// Response Interceptor: Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    alert(error.response?.data?.detail || 'An error occurred');
    return Promise.reject(error);
  }
);

// Auth API
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = ({ username, password }) =>
  api.post('/auth/login', { username, password });

// Profile API

// Code Execution API
export const executeCode = (codeData) => api.post('/code/execute', codeData);

export default api;
export const fetchUserProfile = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  return api.get('/auth/me');
};

// 更新用户信息
export const updateUserProfile = (profileData) => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
  return api.put('/auth/me', profileData);
};
