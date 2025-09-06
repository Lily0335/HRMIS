
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
import { getAllUsers } from "../services/userService"; // ✅ service import
import "./Employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllUsers();
        setEmployees(res.data); // ✅ backend se data
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <p className="loading">Loading employees...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="employees-container">
      <h2>Employees</h2>
      <table className="employees-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>{emp.phone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
