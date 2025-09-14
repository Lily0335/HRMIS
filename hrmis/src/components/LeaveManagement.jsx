// src/components/LeaveManagement.jsx
import { useEffect, useState } from "react";
import API from "../api/axios"; // Your Axios instance with JWT
import "./LeaveManagement.css";

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState("");

  // Load leaves when component mounts
  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const res = await API.get("/leaves"); // Axios automatically sends JWT
      setLeaves(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch leaves");
    }
  };

  const handleApprove = async (id) => {
    try {
      await API.put(`/leaves/${id}`, { status: "Approved" });
      loadLeaves(); // refresh table
    } catch (err) {
      setError(err.response?.data?.message || "Failed to approve leave");
    }
  };

  const handleReject = async (id) => {
    try {
      await API.put(`/leaves/${id}`, { status: "Rejected" });
      loadLeaves(); // refresh table
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reject leave");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) return;
    try {
      await API.delete(`/leaves/${id}`);
      loadLeaves();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete leave");
    }
  };

  return (
    <div className="leave-management">
      <h2>Leave Management</h2>
      {error && <p className="error">{error}</p>}

      <table className="leave-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Requested By</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.requested_by_user?.name}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td className="action-buttons">
                  {leave.status === "Pending" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(leave.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleReject(leave.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(leave.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No leaves found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
