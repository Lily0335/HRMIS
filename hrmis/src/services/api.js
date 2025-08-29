// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hrmis-api.devfamz.com/api',  // ✅ Base URL (without /api/auth/login)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Har request ke sath token automatically jaye
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;