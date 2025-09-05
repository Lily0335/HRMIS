// src/components/Attendance.js
import { useEffect, useState } from "react";
import API from "../api/axios";
import "./Attendance.css"

export default function Attendance() {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await API.get("/attendance"); // change endpoint if different
        setAttendances(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <div className="table-container">
      <h2>Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {attendances.map(att => (
    <tr key={att.id}>
      <td data-label="ID">{att.id}</td>
      <td data-label="Employee Name">{att.employeeName}</td>
      <td data-label="Date">{att.date}</td>
      <td data-label="Status">{att.status}</td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
