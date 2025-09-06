// import API from "../api/axios";

// export const getAllLeaves = () => API.get("/leaves");
// export const createLeave = (data) => API.post("/leaves", data);
// export const getLeaveById = (id) => API.get(`/leaves/${id}`);
// export const updateLeave = (id, data) => API.put(`/leaves/${id}`, data);
// export const deleteLeave = (id) => API.delete(`/leaves/${id}`);

// export const getLeavesByUser = (id) => API.get(`/leaves/user/${id}`);
// export const getPendingLeaves = (id) => API.get(`/leaves/user/${id}/pending`);
// export const getApprovedLeaves = (id) => API.get(`/leaves/user/${id}/approved`);
// export const getRejectedLeaves = (id) => API.get(`/leaves/user/${id}/rejected`);
import API from "../api/axios";

// All leave requests
export const getAllLeaves = async () => (await API.get("/leaves")).data;

// Create a new leave
export const createLeave = async (leaveData) => (await API.post("/leaves", leaveData)).data;

// Get leave by ID
export const getLeaveById = async (id) => (await API.get(`/leaves/${id}`)).data;

// Update leave by ID
export const updateLeave = async (id, leaveData) => (await API.put(`/leaves/${id}`, leaveData)).data;

// Delete leave by ID
export const deleteLeave = async (id) => (await API.delete(`/leaves/${id}`)).data;

// User-specific leaves
export const getUserLeaves = async (userId) => (await API.get(`/leaves/user/${userId}`)).data;
export const getUserLeavesByStatus = async (userId, status) =>
  (await API.get(`/leaves/user/${userId}/${status}`)).data;
