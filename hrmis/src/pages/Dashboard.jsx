
import { useState, useEffect } from "react";
import API from "../api/axios";
import Layout from "../components/Layout.jsx";
import "./Dashboard.css";

export default function Dashboard() {
  const [profile, setProfile] = useState({});
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsers = await API.get("/users");
        const resProfile = await API.get("/users/profile");
        const userId = resProfile.data.id;

        const resLeavesPending = await API.get(`/leaves/user/${userId}/pending`);
        const resLeavesApproved = await API.get(`/leaves/user/${userId}/approved`);
        const resLeavesRejected = await API.get(`/leaves/user/${userId}/rejected`);
        const resTasks = await API.get("/tasks");

        const completedTasks = resTasks.data.filter(t => t.status === "completed").length;
        const pendingTasks = resTasks.data.filter(t => t.status !== "completed").length;

        setStats({
          totalEmployees: resUsers.data.length,
          pendingLeaves: resLeavesPending.data.length,
          approvedLeaves: resLeavesApproved.data.length,
          rejectedLeaves: resLeavesRejected.data.length,
          completedTasks,
          pendingTasks,
        });
        setProfile(resProfile.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    { title: "Total Employees", value: stats.totalEmployees },
    { title: "Pending Leaves", value: stats.pendingLeaves },
    { title: "Approved Leaves", value: stats.approvedLeaves },
    { title: "Rejected Leaves", value: stats.rejectedLeaves },
    { title: "Completed Tasks", value: stats.completedTasks },
    { title: "Pending Tasks", value: stats.pendingTasks },
  ];

  return (
    <Layout>
      <div className="dashboard-top">
        <h2>Hello, {profile.name || "Admin"}</h2>
        <p>Welcome back to HRMIS Dashboard!</p>
      </div>

      <div className="dashboard-cards">
        {cardData.map((card, index) => (
          <div className="dashboard-card" key={index}>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
