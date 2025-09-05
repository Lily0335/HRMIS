
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faCalendar, faClipboardList, faMoneyCheck, faChartBar, faCog, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import logoImg from "../assets/logo.png";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    completedTasks: 0,
    payrollAmount: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    { icon: faHome, label: "Dashboard" },
    { icon: faUsers, label: "Employees" },
    { icon: faCalendar, label: "Attendance" },
    { icon: faClipboardList, label: "Leave Requests" },
    { icon: faMoneyCheck, label: "Payroll" },
    { icon: faChartBar, label: "Reports" },
    { icon: faCog, label: "Settings" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resEmployees = await API.get("/users"); // total employees
        const resLeaves = await API.get("/leaves/user/1/pending"); // pending leaves
        const resTasks = await API.get("/tasks"); // completed tasks
        setStats({
          totalEmployees: resEmployees.data.length,
          pendingLeaves: resLeaves.data.length,
          completedTasks: resTasks.data.filter(t => t.status === "completed").length,
          payrollAmount: 500000, // static example
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const pieData = [
    { name: "Completed Tasks", value: stats.completedTasks },
    { name: "Pending Leaves", value: stats.pendingLeaves },
  ];
  const COLORS = ["#1abc9c", "#e74c3c"];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src={logoImg} alt="Logo" className="logo-img" />
          <h1 className="header-title">HRMIS</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
        </button>
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              <FontAwesomeIcon icon={item.icon} className="menu-icon" />
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
        {/* Admin Card */}
        <div className="admin-card">
          <h2>Hello, Admin</h2>
          <p>Welcome back!</p>
        </div>

        {/* Stats Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Employees</h3>
            <p>{stats.totalEmployees}</p>
          </div>
          <div className="card">
            <h3>Pending Leaves</h3>
            <p>{stats.pendingLeaves}</p>
          </div>
          <div className="card">
            <h3>Completed Tasks</h3>
            <p>{stats.completedTasks}</p>
          </div>
          <div className="card">
            <h3>Payroll Amount</h3>
            <p>${stats.payrollAmount}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="chart-container">
            <h3>Tasks & Leaves</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
