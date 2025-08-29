import api from './api';

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { access_token, user } = response.data;

    // Save token and role
    localStorage.setItem('accessToken', access_token);
    localStorage.setItem('userRole', user.role);
    localStorage.setItem('userName', user.name);

    return user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};