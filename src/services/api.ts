import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://pruebareactjs.test-class.com/Api/',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = sessionStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;