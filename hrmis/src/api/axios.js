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

// Response interceptor to handle 401 safely
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const originalRequest = error.config;

      // Do not retry login or register endpoints
      if (
        originalRequest.url.includes("/login") ||
        originalRequest.url.includes("/register")
      ) {
        return Promise.reject(error);
      }

      // If 401 and not retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await axios.post(
          "https://hrmis-api.devfamz.com/api/refresh-token",
          { refresh_token: refreshToken }
        );

        const newToken = res.data.access_token;
        localStorage.setItem("token", newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      }

      // If 403 (forbidden)
      if (error.response?.status === 403) {
        return Promise.reject({
          message: "You do not have permission to perform this action.",
        });
      }

      // Already retried and still 401 → redirect
      if (error.response?.status === 401 && originalRequest._retry) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);

export default API;
