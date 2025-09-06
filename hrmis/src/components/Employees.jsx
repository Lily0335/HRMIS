
// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import "./Employees.css";

// export default function Employees() {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const res = await API.get("/users"); // change endpoint if different
//         setEmployees(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchEmployees();
//   }, []);

//   return (
//     <div className="table-container">
//       <h2>Employees</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Position</th>
//             <th>Department</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map(emp => (
//             <tr key={emp.id}>
//               <td data-label="ID">{emp.id}</td>
//               <td data-label="Name">{emp.name}</td>
//               <td data-label="Email">{emp.email}</td>
//               <td data-label="Position">{emp.position}</td>
//               <td data-label="Department">{emp.department}</td>
//               <td data-label="Status">{emp.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// src/components/Employees.js
// src/components/Employees.js
import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await API.get("/users"); // ✅ Swagger ke mutabiq
        console.log("Employees Response:", res.data);

        // Kabhi kabhi API array return karti hai ya object with data field
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        } else if (res.data?.data) {
          setEmployees(res.data.data);
        } else {
          setError("⚠️ Unexpected response format");
        }
      } catch (err) {
        console.error("Employees API Error:", err.response || err.message);
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "❌ Failed to load employees"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>⏳ Loading employees...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="table-container">
      <h2>Employees</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
