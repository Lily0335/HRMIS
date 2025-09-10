// src/components/LeaveManagement.js
import { useEffect, useState } from "react";
import API from "../api/axios";
import "./LeaveManagement.css";

export default function LeaveManagement() {
  const [leaves, setLeaves] = useState([]);
  const [profile, setProfile] = useState({});
  const [newLeave, setNewLeave] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch profile + leaves
  const fetchLeaves = async () => {
    try {
      setLoading(true);

      // Get profile
      const resProfile = await API.get("/users/profile");
      setProfile(resProfile.data);

      let res;
      if (resProfile.data.role === "employee") {
        // Employee → only own leaves
        res = await API.get(`/leaves/user/${resProfile.data.id}`);
      } else {
        // Manager/Admin → all leaves
        res = await API.get("/leaves");
      }

      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create leave request
  const createLeave = async () => {
    try {
      await API.post("/leaves", newLeave);
      alert("Leave created successfully!");
      fetchLeaves();
      setNewLeave({ start_date: "", end_date: "", reason: "" });
    } catch (err) {
      console.error("Error creating leave:", err);
      alert("Failed to create leave.");
    }
  };

  // Update leave status (Manager/Admin only)
  const updateLeave = async (id, status) => {
    try {
      await API.put(`/leaves/${id}`, { status });
      alert(`Leave ${status} successfully!`);
      fetchLeaves();
    } catch (err) {
      console.error("Error updating leave:", err);
    }
  };

  // Delete leave (Manager/Admin only)
  const deleteLeave = async (id) => {
    try {
      await API.delete(`/leaves/${id}`);
      alert("Leave deleted!");
      fetchLeaves();
    } catch (err) {
      console.error("Error deleting leave:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="leave-management">
      <h2>Leave Management</h2>

      {profile.role === "employee" && (
        <div className="leave-form">
          <input
            type="date"
            value={newLeave.start_date}
            onChange={(e) =>
              setNewLeave({ ...newLeave, start_date: e.target.value })
            }
          />
          <input
            type="date"
            value={newLeave.end_date}
            onChange={(e) =>
              setNewLeave({ ...newLeave, end_date: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Reason"
            value={newLeave.reason}
            onChange={(e) =>
              setNewLeave({ ...newLeave, reason: e.target.value })
            }
          />
          <button onClick={createLeave}>Submit</button>
        </div>
      )}

      <h3>
        {profile.role === "employee"
          ? "My Leave Requests"
          : "All Employee Leave Requests"}
      </h3>

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
              {profile.role !== "employee" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.id}</td>
                <td>{leave.requested_by_user?.name || "Me"}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
                <td>
                  {leave.start_date} → {leave.end_date}
                </td>
                {profile.role !== "employee" && (
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
