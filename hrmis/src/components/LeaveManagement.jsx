// src/components/LeaveManagement.js
import { useEffect, useState } from "react";
import API from "../api/axios";
import "./LeaveManagement.css";

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all leaves (Admin only)
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await API.get("/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update leave status
  const updateLeave = async (id, status) => {
    try {
      await API.put(`/leaves/${id}`, { status });
      alert(`Leave ${status} successfully!`);
      fetchLeaves();
    } catch (err) {
      console.error("Error updating leave:", err);
      alert("Failed to update leave.");
    }
  };

  // Delete leave
  const deleteLeave = async (id) => {
    try {
      await API.delete(`/leaves/${id}`);
      alert("Leave deleted!");
      fetchLeaves();
    } catch (err) {
      console.error("Error deleting leave:", err);
      alert("Failed to delete leave.");
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="leave-management">
      <h2>Leave Management</h2>

      {loading ? (
        <p>Loading...</p>
      ) : leaves.length === 0 ? (
        <p>No leave requests found.</p>
      ) : (
        <table className="leave-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Dates</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.requested_by_user?.name || "Unknown"}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.start_date} → {leave.end_date}
                </td>
                <td>
                  <button
                    className="action-btn approve"
                    onClick={() => updateLeave(leave.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="action-btn reject"
                    onClick={() => updateLeave(leave.id, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => deleteLeave(leave.id)}
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
  );
}
