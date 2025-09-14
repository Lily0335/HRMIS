import API from "./axios"; 

export const fetchUsers = async () => {
  const res = await API.get("/users");
  return res.data;
};

export const createUser = async (userData) => {
  const res = await API.post("/users", userData);
  return res.data;
};

export const fetchUserById = async (userId) => {
  const res = await API.get(`/users/${userId}`);
  return res.data;
};

export const updateUser = async (userId, userData) => {
  const res = await API.put(`/users/${userId}`, userData);
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await API.delete(`/users/${userId}`);
  return res.data; 
};
export const fetchUserByEmail = async (email) => {
  const res = await API.get(`/users/email/${email}`);
  return res.data;
};

export const fetchUserProfile = async () => {
  const res = await API.get("/users/profile");
  return res.data;
};
