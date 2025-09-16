
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faCalendar,
  faClipboardList,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header.jsx";
import "./Layout.css";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: faHome, label: "Dashboard", path: "/dashboard" },
    { icon: faUsers, label: "Employees", path: "/users" },
    { icon: faCalendar, label: "Leaves", path: "/leaves" },
    { icon: faClipboardList, label: "Tasks", path: "/tasks" },
  ];

  return (
    <div className="layout-container">
      <Header />

      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
        </button>

        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="menu-item"
              onClick={() => navigate(item.path)}
            >
              <FontAwesomeIcon icon={item.icon} className="menu-icon" />
              {!collapsed && <span className="menu-label">{item.label}</span>}
            </li>
          ))}
        </ul>
      </aside>

      <main className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
        {children}
      </main>
    </div>
  );
}
