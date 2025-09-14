import API from "./axios"; // Axios instance with baseURL & JWT already set

// Fetch all leave requests
export const fetchLeaves = async () => {
  try {
    const response = await API.get("/leaves");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch leaves");
  }
};

// Create a new leave request
export const createLeave = async (leaveData) => {
  try {
    const response = await API.post("/leaves", leaveData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create leave request");
  }
};

// Fetch a specific leave request by ID
export const fetchLeaveById = async (id) => {
  try {
    const response = await API.get(`/leaves/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch leave details");
  }
};

// Update an existing leave request
export const updateLeave = async (id, leaveData) => {
  try {
    const response = await API.put(`/leaves/${id}`, leaveData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update leave request");
  }
};

// Delete a leave request
export const deleteLeave = async (id) => {
  try {
    const response = await API.delete(`/leaves/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete leave request");
  }
};

// Fetch leaves by user ID
export const fetchLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user leaves");
  }
};

// Fetch pending leaves by user ID
export const fetchPendingLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}/pending`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch pending leaves");
  }
};

// Fetch approved leaves by user ID
export const fetchApprovedLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}/approved`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch approved leaves");
  }
};

// Fetch rejected leaves by user ID
export const fetchRejectedLeavesByUserId = async (userId) => {
  try {
    const response = await API.get(`/leaves/user/${userId}/rejected`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch rejected leaves");
  }
};
