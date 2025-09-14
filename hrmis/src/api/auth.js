import API from "./axios";
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data; 
  } catch (err) {
    if (err.response?.status === 422) {
      throw new Error("Validation error: Please check your input.");
    }
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};
