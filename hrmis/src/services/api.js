
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hrmis-api.devfamz.com/api',
});

// Har request ke sath token bhejo agar available ho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;