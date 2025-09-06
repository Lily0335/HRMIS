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

// ✅ Automatically attach token with every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
