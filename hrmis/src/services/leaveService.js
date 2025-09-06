import API from "../api/axios";

export const getAllLeaves = () => API.get("/leaves");
export const createLeave = (data) => API.post("/leaves", data);
export const getLeaveById = (id) => API.get(`/leaves/${id}`);
export const updateLeave = (id, data) => API.put(`/leaves/${id}`, data);
export const deleteLeave = (id) => API.delete(`/leaves/${id}`);

export const getLeavesByUser = (id) => API.get(`/leaves/user/${id}`);
export const getPendingLeaves = (id) => API.get(`/leaves/user/${id}/pending`);
export const getApprovedLeaves = (id) => API.get(`/leaves/user/${id}/approved`);
export const getRejectedLeaves = (id) => API.get(`/leaves/user/${id}/rejected`);
