import API from "./axios"; // Axios instance with JWT interceptors

// 📌 REGISTER a new user
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data; // { message, user, access_token }
  } catch (err) {
    if (err.response?.status === 422) {
      throw new Error("Validation error: Please check your input.");
    }
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};
