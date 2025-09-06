// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://hrmis-api.devfamz.com/api",
// });

// // Add Authorization header automatically if token exists
// API.interceptors.request.use(config => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;
// src/api.js
// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://hrmis-api.devfamz.com/api",
});

// ✅ Token har request ke sath bhejna
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
