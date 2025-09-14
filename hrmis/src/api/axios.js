import axios from "axios";
const API = axios.create({
  baseURL: "https://hrmis-api.devfamz.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const originalRequest = error.config;
      if (
        originalRequest.url.includes("/login") ||
        originalRequest.url.includes("/register")
      ) {
        return Promise.reject(error);
      }
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
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);
      }
      if (error.response?.status === 403) {
        return Promise.reject({
          message: "You do not have permission to perform this action.",
        });
      }
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
