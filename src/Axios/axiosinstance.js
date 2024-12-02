import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3004/', // Replace with your backend's base URL
  withCredentials: true, // Include cookies if needed
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lighthouse_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('lighthouse_admin_token'); 
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
