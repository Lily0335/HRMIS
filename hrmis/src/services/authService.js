import API from "../api/axios";

export const login = (data) => API.post("/auth/login", data);

export const register = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const logout = () => API.post("/auth/logout");
export const refresh = () => API.post("/auth/refresh");
