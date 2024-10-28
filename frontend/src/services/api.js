// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const registerUser = (userData) =>
  axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) =>
  axios.post(`${API_URL}/auth/login`, userData);
export const executeCode = (codeData) =>
  axios.post(`${API_URL}/code/execute`, codeData);
