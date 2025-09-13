
// import { useState, useEffect } from "react";
// //import "./TaskManagement.css";

// export default function TaskManagement() {
//   const [tasks, setTasks] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     priority: "Medium",
//     status: "Pending",
//     assigned_to: "",
//   });
//   const [selectedTask, setSelectedTask] = useState(null);

//   // 🔹 Mock fetch (GET /tasks)
//   useEffect(() => {
//     const mockTasks = [
//       {
//         id: 1,
//         title: "Complete project documentation",
//         description: "Write documentation for the new feature",
//         priority: "High",
//         status: "In Progress",
//         assigned_to: 1,
//         assigned_to_user: { id: 1, name: "John Doe", email: "john@example.com" },
//       },
//       {
//         id: 2,
//         title: "Fix login bug",
//         description: "Resolve issue with authentication flow",
//         priority: "Medium",
//         status: "Pending",
//         assigned_to: 2,
//         assigned_to_user: { id: 2, name: "Jane Smith", email: "jane@example.com" },
//       },
//     ];
//     setTasks(mockTasks);
//   }, []);

//   // 🔹 Create (POST /tasks)
//   const handleCreate = () => {
//     if (!form.title.trim()) return alert("Title is required");
//     const newTask = {
//       id: Date.now(),
//       ...form,
//       assigned_to_user: { id: form.assigned_to, name: "Mock User" },
//     };
//     setTasks([...tasks, newTask]);
//     setForm({
//       title: "",
//       description: "",
//       priority: "Medium",
//       status: "Pending",
//       assigned_to: "",
//     });
//   };

//   // 🔹 Edit (GET /tasks/{id}) + Update (PUT /tasks/{id})
//   const handleEdit = (task) => {
//     setSelectedTask(task);
//     setForm({
//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       status: task.status,
//       assigned_to: task.assigned_to,
//     });
//   };

//   const handleUpdate = () => {
//     if (!selectedTask) return;
//     const updated = tasks.map((t) =>
//       t.id === selectedTask.id ? { ...selectedTask, ...form } : t
//     );
//     setTasks(updated);
//     setSelectedTask(null);
//     setForm({
//       title: "",
//       description: "",
//       priority: "Medium",
//       status: "Pending",
//       assigned_to: "",
//     });
//   };

//   // 🔹 Delete (DELETE /tasks/{id})
//   const handleDelete = (id) => {
//     if (window.confirm("Delete this task?")) {
//       setTasks(tasks.filter((t) => t.id !== id));
//     }
//   };

//   return (
//     <div className="task-management">
//       <h2>Task Management (Mock Data)</h2>

//       {/* Form */}
//       <div className="task-form">
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
//         ></textarea>
//         <select
//           value={form.priority}
//           onChange={(e) => setForm({ ...form, priority: e.target.value })}
//         >
//           <option value="High">High</option>
//           <option value="Medium">Medium</option>
//           <option value="Low">Low</option>
//         </select>
//         <select
//           value={form.status}
//           onChange={(e) => setForm({ ...form, status: e.target.value })}
//         >
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Assigned To (User ID)"
//           value={form.assigned_to}
//           onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
//         />

//         {selectedTask ? (
//           <button onClick={handleUpdate}>Update Task</button>
//         ) : (
//           <button onClick={handleCreate}>Add Task</button>
//         )}
//       </div>

//       {/* Task List */}
//       <ul className="task-list">
//         {tasks.map((task) => (
//           <li key={task.id}>
//             <strong>{task.title}</strong> ({task.priority}) - {task.status}
//             <br />
//             <small>Assigned to: {task.assigned_to_user.name}</small>
//             <div className="actions">
//               <button onClick={() => handleEdit(task)}>Edit</button>
//               <button onClick={() => handleDelete(task.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import "./TaskManagement.css";

export default function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    assigned_to: "",
  });
  const [selectedTask, setSelectedTask] = useState(null);

  // 🔹 Mock fetch tasks
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: "Complete project documentation",
        description: "Write documentation for the new feature",
        priority: "High",
        status: "In Progress",
        assigned_to: 1,
        assigned_to_user: { name: "John Doe" },
      },
      {
        id: 2,
        title: "Fix login bug",
        description: "Resolve issue with authentication flow",
        priority: "Medium",
        status: "Pending",
        assigned_to: 2,
        assigned_to_user: { name: "Jane Smith" },
      },
    ];
    setTasks(mockTasks);
  }, []);

  // 🔹 Reset form
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      assigned_to: "",
    });
    setSelectedTask(null);
  };

  // 🔹 Create task
  const handleCreate = () => {
    if (!form.title.trim()) return alert("Title is required");
    const newTask = {
      id: Date.now(),
      ...form,
      assigned_to_user: { name: "Mock User" },
    };
    setTasks([...tasks, newTask]);
    resetForm();
  };

  // 🔹 Start editing
  const handleEdit = (task) => {
    setSelectedTask(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assigned_to: task.assigned_to,
    });
  };

  // 🔹 Update task
  const handleUpdate = () => {
    if (!selectedTask) return;
    const updated = tasks.map((t) =>
      t.id === selectedTask.id ? { ...t, ...form } : t
    );
    setTasks(updated);
    resetForm();
  };

  // 🔹 Delete task
  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="task-management">
      <h2>📋 Task Management</h2>

      {/* Form */}
      <div className="task-form">
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
        ></textarea>
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
          placeholder="Assigned To (User ID)"
          value={form.assigned_to}
          onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
        />

        <div className="form-buttons">
          {selectedTask ? (
            <>
              <button className="update" onClick={handleUpdate}>
                ✅ Update
              </button>
              <button className="cancel" onClick={resetForm}>
                ❌ Cancel
              </button>
            </>
          ) : (
            <button className="add" onClick={handleCreate}>
              ➕ Add Task
            </button>
          )}
        </div>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="task-header">
              <strong>{task.title}</strong>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>
            <p>{task.description}</p>
            <small>Status: {task.status}</small>
            <br />
            <small>Assigned to: {task.assigned_to_user.name}</small>
            <div className="actions">
              <button onClick={() => handleEdit(task)}>✏ Edit</button>
              <button onClick={() => handleDelete(task.id)}>🗑 Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
