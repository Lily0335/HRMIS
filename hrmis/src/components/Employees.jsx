
import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Employees.css";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await API.get("/users"); // change endpoint if different
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="table-container">
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td data-label="ID">{emp.id}</td>
              <td data-label="Name">{emp.name}</td>
              <td data-label="Email">{emp.email}</td>
              <td data-label="Position">{emp.position}</td>
              <td data-label="Department">{emp.department}</td>
              <td data-label="Status">{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
