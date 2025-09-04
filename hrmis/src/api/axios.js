import axios from "axios";

const api = axios.create({
  baseURL: "https://hrmis-api.devamz.com/api", 
});

export default api;
