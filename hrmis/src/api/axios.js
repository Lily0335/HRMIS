
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

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://hrmis-api.devfamz.com/api",
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // ✅ Pick JWT
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // ✅ Attach it
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "https://hrmis-api.devfamz.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default API;
