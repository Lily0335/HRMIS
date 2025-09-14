import API from "./axios";
export const fetchLeaves = async () => {
  try {
    const response = await API.get("/leaves");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch leaves");
  }
};

export const createLeave = async (leaveData) => {
  try {
    const response = await API.post("/leaves", leaveData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create leave request");
  }
};

export const fetchLeaveById = async (id) => {
  try {
    const response = await API.get(`/leaves/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch leave details");
  }
};

export const updateLeave = async (id, leaveData) => {
  try {
    const response = await API.put(`/leaves/${id}`, leaveData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update leave request");
  }
};
export const deleteLeave = async (id) => {
  try {
    const response = await API.delete(`/leaves/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete leave request");
  }
};
export const fetchLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user leaves");
  }
};
export const fetchPendingLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}/pending`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch pending leaves");
  }
};
export const fetchApprovedLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}/approved`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch approved leaves");
  }
};
export const fetchRejectedLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}/rejected`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch rejected leaves");
  }
};
