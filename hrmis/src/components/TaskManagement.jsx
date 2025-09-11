import { useEffect, useState } from "react";
import API from "../api/axios";
//import "./TaskManagement.css";

export default function TaskManagement({ userRole }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    assigned_to: "",
  });

  // ✅ Check admin access
  const isAdmin = userRole === "admin";
  useEffect(() => {
    if (isAdmin) fetchTasks();
  }, [isAdmin]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tasks. Ensure you're logged in as Admin.");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    try {
      await API.post("/tasks", form);
      setForm({
        title: "",
        description: "",
        priority: "Medium",
        status: "Pending",
        assigned_to: "",
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to create task.");
    }
  };

  const updateTask = async (id, newStatus) => {
    try {
      const task = tasks.find((t) => t.id === id);
      await API.put(`/tasks/${id}`, { ...task, status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="no-access">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="task-management">
      <h1>Task Management</h1>

      {/* Form */}
      <div className="task-form card">
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="form-row">
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="number"
            placeholder="Assign to User ID"
            value={form.assigned_to}
            onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
          />
        </div>
        <button className="primary-btn" onClick={createTask}>
          Add Task
        </button>
      </div>

      {/* Task Table */}
      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : (
        <div className="card">
          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned User</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.priority}</td>
                    <td>{task.status}</td>
                    <td>{task.assigned_to_user?.name || "N/A"}</td>
                    <td>
                      <button
                        className="btn in-progress"
                        onClick={() => updateTask(task.id, "In Progress")}
                      >
                        In Progress
                      </button>
                      <button
                        className="btn complete"
                        onClick={() => updateTask(task.id, "Completed")}
                      >
                        Complete
                      </button>
                      <button
                        className="btn delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
