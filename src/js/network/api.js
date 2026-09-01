import axios from 'axios';
import { getAuthToken } from '../utils/authUtils.js';

const api = axios.create({
  baseURL: 'https://story-api.dicoding.dev/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
