import API from "./axios";

// ✅ Get all tasks (Admin/Manager only)
export const getTasks = async () => {
  const res = await API.get("/tasks");
  return res.data;
};

// ✅ Get task by ID
export const getTaskById = async (id) => {
  const res = await API.get(`/tasks/${id}`);
  return res.data;
};

// ✅ Create a new task
export const createTask = async (taskData) => {
  const res = await API.post("/tasks", taskData);
  return res.data;
};

// ✅ Update task by ID
export const updateTask = async (id, taskData) => {
  const res = await API.put(`/tasks/${id}`, taskData);
  return res.data;
};

// ✅ Delete task by ID
export const deleteTask = async (id) => {
  const res = await API.delete(`/tasks/${id}`);
  return res.data;
};
