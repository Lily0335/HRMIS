import { useState, useEffect } from 'react';
import './Dashboard.css';
export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage se user data load karo
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');

    if (role) {
      setUser({ name: name || 'User', role });
    } else {
      // Agar token hai lekin role nahi, toh login pe wapas
      window.location.href = '/';
    }
  }, []);

  if (!user) {
    return (
      <div className="dashboard-loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Welcome, <span className="highlight">{user.name}</span>
        </h1>
        <p className="dashboard-subtitle">
          You are logged in as <strong>{user.role}</strong>
        </p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>My Profile</h3>
          <p>View and update your information</p>
        </div>

        <div className="card">
          <h3>Leave Management</h3>
          <p>Apply or check leave status</p>
        </div>

        <div className="card">
          <h3>Tasks</h3>
          <p>See your assigned tasks</p>
        </div>
      </div>
    </div>
  );
}