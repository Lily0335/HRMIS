
// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://hrmis-api.devfamz.com/api",
// });
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "https://hrmis-api.devfamz.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh token API
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(
          "https://hrmis-api.devfamz.com/api/refresh-token",
          { refresh_token: refreshToken }
        );

        // Store new token
        localStorage.setItem("token", res.data.access_token);

        // Update headers and retry original request
        API.defaults.headers.Authorization = `Bearer ${res.data.access_token}`;
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return API(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // redirect to login
        return Promise.reject(refreshError);
      }
    }

    // If already retried and still 401
    if (error.response?.status === 401 && originalRequest._retry) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;
