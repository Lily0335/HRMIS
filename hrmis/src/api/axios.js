import axios from "axios";

const API = axios.create({
  baseURL: "https://hrmis-api.devfamz.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
