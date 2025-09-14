
import { useEffect, useState } from "react";
import Layout from "../components/Layout.jsx";
import { fetchUsers } from "../api/users"; 
import "./Dashboard.css";

export default function Dashboard() {
  const [profile, setProfile] = useState({ name: "Admin" });
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const users = await fetchUsers();

        const pendingLeaves = 3;   
        const approvedLeaves = 8;  
        const rejectedLeaves = 1;  
        const completedTasks = 12; 
        const pendingTasks = 5;    

        setStats({
          totalEmployees: users.length,
          pendingLeaves,
          approvedLeaves,
          rejectedLeaves,
          completedTasks,
          pendingTasks,
        });

        // ✅ Example: Set profile if you have profile API
        setProfile({ name: "Admin User" });
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <Layout>
      <div className="dashboard-top">
        <h2>Hello, {profile.name || "Admin"}</h2>
        <p>Welcome back! Here's an overview of your system.</p>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Employees</h3>
          <p>{stats.totalEmployees}</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending Leaves</h3>
          <p>{stats.pendingLeaves}</p>
        </div>
        <div className="dashboard-card">
          <h3>Approved Leaves</h3>
          <p>{stats.approvedLeaves}</p>
        </div>
        <div className="dashboard-card">
          <h3>Rejected Leaves</h3>
          <p>{stats.rejectedLeaves}</p>
        </div>
        <div className="dashboard-card">
          <h3>Completed Tasks</h3>
          <p>{stats.completedTasks}</p>
        </div>
        <div className="dashboard-card">
          <h3>Pending Tasks</h3>
          <p>{stats.pendingTasks}</p>
        </div>
      </div>
    </Layout>
  );
}
