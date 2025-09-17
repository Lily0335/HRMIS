// import { useEffect, useState } from "react";
// import {
//   getTasks,
//   getTaskById,
//   createTask,
//   updateTask,
//   deleteTask,
// } from "../api/tasks";
// import "./TaskManagement.css"; // Link to the CSS file

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     id: "",
//     title: "",
//     description: "",
//     priority: "",
//     status: "",
//     assigned_to: "",
//   });

//   const [searchId, setSearchId] = useState("");

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const data = await getTasks();
//       setTasks(data);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Failed to fetch tasks.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleSearch = async () => {
//     if (!searchId) return fetchTasks();
//     try {
//       const task = await getTaskById(searchId);
//       setTasks([task]);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || "Task not found.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (form.id) {
//         await updateTask(form.id, form);
//       } else {
//         await createTask(form);
//       }
//       setForm({
//         id: "",
//         title: "",
//         description: "",
//         priority: "",
//         status: "",
//         assigned_to: "",
//       });
//       fetchTasks();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to save task.");
//     }
//   };

//   const handleEdit = (task) => {
//     setForm({
//       id: task.id,
//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       status: task.status,
//       assigned_to: task.assigned_to,
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this task?")) return;
//     try {
//       await deleteTask(id);
//       fetchTasks();
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to delete task.");
//     }
//   };

//   return (
//     <div className="tasks-container">
//       <h1 className="tasks-title">Task Management</h1>

//       {error && <div className="tasks-error">{error}</div>}

//       <div className="tasks-search">
//         <input
//           type="text"
//           placeholder="Search by ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleSearch}>
//           Search
//         </button>
//         <button className="btn btn-secondary" onClick={fetchTasks}>
//           Reset
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="task-form">
//         <input
//           type="text"
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           required
//         ></textarea>
//         <input
//           type="text"
//           placeholder="Priority"
//           value={form.priority}
//           onChange={(e) => setForm({ ...form, priority: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Status"
//           value={form.status}
//           onChange={(e) => setForm({ ...form, status: e.target.value })}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Assigned To (User ID)"
//           value={form.assigned_to}
//           onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
//           required
//         />
//         <button type="submit" className="btn btn-success">
//           {form.id ? "Update Task" : "Create Task"}
//         </button>
//       </form>

//       {loading ? (
//         <p>Loading tasks...</p>
//       ) : (
//         <table className="tasks-table">
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
//             {tasks.length > 0 ? (
//               tasks.map((task) => (
//                 <tr key={task.id}>
//                   <td>{task.id}</td>
//                   <td>{task.title}</td>
//                   <td>{task.priority}</td>
//                   <td>{task.status}</td>
//                   <td>{task.assigned_to_user?.name || "—"}</td>
//                   <td className="action-buttons">
//                     <button className="btn btn-edit" onClick={() => handleEdit(task)}>
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-delete"
//                       onClick={() => handleDelete(task.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="no-tasks">
//                   No tasks available.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";
import "./TaskManagement.css"; // Link to your CSS file

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    status: "",
    assigned_to: "",
  });

  const [searchId, setSearchId] = useState("");

  // Helper to format dates
  const formatDate = (date) =>
    date ? new Date(date).toLocaleString() : "—";

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Search task by ID
  const handleSearch = async () => {
    if (!searchId) return fetchTasks();
    try {
      const task = await getTaskById(searchId);
      setTasks([task]);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Task not found.");
    }
  };

  // Create or Update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateTask(form.id, form);
      } else {
        await createTask(form);
      }
      setForm({
        id: "",
        title: "",
        description: "",
        priority: "",
        status: "",
        assigned_to: "",
      });
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid data. Please check your input.");
    }
  };

  // Fill form for editing
  const handleEdit = (task) => {
    setForm({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assigned_to:
        typeof task.assigned_to === "object"
          ? task.assigned_to.id
          : task.assigned_to,
    });
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task.");
    }
  };

  return (
    <div className="tasks-container">
      <h1 className="tasks-title">Task Management</h1>

      {error && <div className="tasks-error">{error}</div>}

      {/* Search */}
      <div className="tasks-search">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={fetchTasks}>
          Reset
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Priority"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Assigned To (User ID)"
          value={form.assigned_to}
          onChange={(e) =>
            setForm({ ...form, assigned_to: e.target.value })
          }
          required
        />
        <button type="submit" className="btn btn-success">
          {form.id ? "Update Task" : "Create Task"}
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <table className="tasks-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned User</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    {typeof task.assigned_to === "object"
                      ? task.assigned_to.name ||
                        `User ID: ${task.assigned_to.id}`
                      : `User ID: ${task.assigned_to}`}
                  </td>
                  <td>{formatDate(task.created_at)}</td>
                  <td>{formatDate(task.updated_at)}</td>
                  <td className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-tasks">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
