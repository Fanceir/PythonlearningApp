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
export const fetchUserProfile = () => api.get('/auth/me'); // Updated endpoint to /auth/me
export const updateUserProfile = (profileData) =>
  api.put('/auth/me', profileData); // Updated endpoint to /auth/me

// Code Execution API
export const executeCode = (codeData) => api.post('/code/execute', codeData);

export default api;
