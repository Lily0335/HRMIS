import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faCalendar, faClipboardList, faMoneyCheck, faChartBar, faCog, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

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

  return (
    <div className={`dashboard-container ${collapsed ? "collapsed" : ""}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">{collapsed ? "H" : "HRMIS"}</h2>
          <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
          </button>
        </div>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={item.icon} className="menu-icon" />
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="topbar">
          <span>Welcome, Admin</span>
          <button onClick={handleLogout}>Logout</button>
        </header>

        <section className="content">
          <h1>Dashboard Overview</h1>
          <p>Manage employees, attendance, leaves, payroll, and reports efficiently.</p>
        </section>
      </div>
    </div>
  );
}
