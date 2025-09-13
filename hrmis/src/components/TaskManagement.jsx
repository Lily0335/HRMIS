// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function TaskManagement() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Pending",
//     assigned_to: "",
//   });

//   // ✅ Fetch tasks on mount
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await API.get("/tasks");
//       // ✅ Defensive check for non-array responses
//       setTasks(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch tasks. Please check your authentication or server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createTask = async () => {
//     try {
//       await API.post("/tasks", form);
//       setForm({
//         title: "",
//         description: "",
//         priority: "Medium",
//         status: "Pending",
//         assigned_to: "",
//       });
//       fetchTasks();
//     } catch (err) {
//       console.error("Create error:", err);
//       setError("Failed to create task.");
//     }
//   };

//   const updateTask = async (id, newStatus) => {
//     try {
//       const task = tasks.find((t) => t.id === id);
//       await API.put(`/tasks/${id}`, { ...task, status: newStatus });
//       fetchTasks();
//     } catch (err) {
//       console.error("Update error:", err);
//       setError("Failed to update task.");
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       fetchTasks();
//     } catch (err) {
//       console.error("Delete error:", err);
//       setError("Failed to delete task.");
//     }
//   };

//   return (
//     <div className="task-management" style={{ padding: "20px" }}>
//       <h1>Task Management</h1>

//       {/* Error Display */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Form */}
//       <div className="task-form" style={{ marginBottom: "20px" }}>
//         <h2>Create Task</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />
//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//         />
//         <div>
//           <select
//             value={form.priority}
//             onChange={(e) => setForm({ ...form, priority: e.target.value })}
//           >
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//           <select
//             value={form.status}
//             onChange={(e) => setForm({ ...form, status: e.target.value })}
//           >
//             <option value="Pending">Pending</option>
//             <option value="In Progress">In Progress</option>
//             <option value="Completed">Completed</option>
//           </select>
//           <input
//             type="number"
//             placeholder="Assign to User ID"
//             value={form.assigned_to}
//             onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
//           />
//         </div>
//         <button onClick={createTask}>Add Task</button>
//       </div>

//       {/* Loading */}
//       {loading && <p>Loading tasks...</p>}

//       {/* Tasks Table */}
//       {!loading && tasks.length > 0 && (
//         <table border="1" cellPadding="8" style={{ width: "100%", textAlign: "left" }}>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Priority</th>
//               <th>Status</th>
//               <th>Assigned User</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.id}</td>
//                 <td>{task.title}</td>
//                 <td>{task.priority}</td>
//                 <td>{task.status}</td>
//                 <td>{task.assigned_to_user?.name || "N/A"}</td>
//                 <td>
//                   <button onClick={() => updateTask(task.id, "In Progress")}>
//                     In Progress
//                   </button>
//                   <button onClick={() => updateTask(task.id, "Completed")}>
//                     Complete
//                   </button>
//                   <button onClick={() => deleteTask(task.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {!loading && tasks.length === 0 && <p>No tasks available.</p>}
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import API from "../api/axios"; // Uses your interceptors
// //import "./TaskManagement.css"; // Import the CSS file

// export default function TaskManagement() {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [form, setForm] = useState({
//     id: null,
//     title: "",
//     description: "",
//     priority: "Low",
//     status: "Pending",
//     assigned_to: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/tasks");
//       setTasks(res.data);
//       setError("");
//     } catch (err) {
//       setError("Failed to fetch tasks. Check authentication or server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         await API.put(`/tasks/${form.id}`, form);
//       } else {
//         await API.post("/tasks", form);
//       }
//       setForm({
//         id: null,
//         title: "",
//         description: "",
//         priority: "Low",
//         status: "Pending",
//         assigned_to: "",
//       });
//       setIsEditing(false);
//       fetchTasks();
//     } catch {
//       setError("Failed to save task. Ensure you’re authenticated.");
//     }
//   };

//   const handleEdit = (task) => {
//     setForm(task);
//     setIsEditing(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this task?")) return;
//     try {
//       await API.delete(`/tasks/${id}`);
//       fetchTasks();
//     } catch {
//       setError("Failed to delete task.");
//     }
//   };

//   return (
//     <div className="task-container">
//       <h2 className="task-title">Task Management</h2>

//       {error && <div className="task-error">{error}</div>}

//       <form onSubmit={handleSubmit} className="task-form">
//         <h3>{isEditing ? "Edit Task" : "Create Task"}</h3>
//         <div className="task-grid">
//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Title"
//             required
//           />
//           <input
//             type="text"
//             name="assigned_to"
//             value={form.assigned_to}
//             onChange={handleChange}
//             placeholder="Assigned User ID"
//             required
//           />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Description"
//             required
//           />
//           <select
//             name="priority"
//             value={form.priority}
//             onChange={handleChange}
//           >
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//           </select>
//           <select
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//           >
//             <option>Pending</option>
//             <option>In Progress</option>
//             <option>Completed</option>
//           </select>
//         </div>
//         <button type="submit" className="task-btn">
//           {isEditing ? "Update Task" : "Add Task"}
//         </button>
//       </form>

//       {loading ? (
//         <p>Loading tasks...</p>
//       ) : (
//         <div className="task-table-container">
//           <table className="task-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Priority</th>
//                 <th>Status</th>
//                 <th>Assigned To</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="no-tasks">
//                     No tasks found.
//                   </td>
//                 </tr>
//               ) : (
//                 tasks.map((task) => (
//                   <tr key={task.id}>
//                     <td>{task.title}</td>
//                     <td>{task.priority}</td>
//                     <td>{task.status}</td>
//                     <td>{task.assigned_to_user?.name || task.assigned_to}</td>
//                     <td>
//                       <button
//                         className="edit-btn"
//                         onClick={() => handleEdit(task)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="delete-btn"
//                         onClick={() => handleDelete(task.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import API from "../api/axios";

export default function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks
  useEffect(() => {
    API.get("/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  const handleAddTask = async () => {
  try {
    const res = await API.post("/tasks", {
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the new feature",
      priority: "High",
      status: "Pending",
      assigned_to: 1,
    });
    console.log("Task created:", res.data);
  } catch (err) {
    console.error("Error creating task:", err.response || err);
    alert(err.response?.data?.message || "Failed to save task.");
  }
};


  return (
    <div>
      <h2>Task Management</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task title"
      />
      <button onClick={handleAddTask}>Add Task</button>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
