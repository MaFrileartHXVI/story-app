import api from './api.js';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during login');
  }
};

export const register = async (name, email, password) => {
  try {
    const response = await api.post('/register', { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during registration');
  }
};
