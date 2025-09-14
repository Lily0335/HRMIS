// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUsers,
//   faCalendar,
//   faClipboardList,
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import logoImg from "../assets/logo.png";
// import "./Layout.css"; // use updated CSS

// export default function Layout({ children }) {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const menuItems = [
//     { icon: faHome, label: "Dashboard", path: "/dashboard" },
//     { icon: faUsers, label: "Employees", path: "/users" },
//     { icon: faCalendar, label: "Leaves", path: "/leaves" },
//     { icon: faClipboardList, label: "Tasks", path: "/tasks" },
//     { icon: faUsers, label: "Register User", path: "/register" },
//   ];

//   return (
//     <div className="layout-container">
//       <header className="layout-header">
//         <div className="header-left">
//           <img src={logoImg} alt="Logo" className="logo-img" />
//           <h1 className="header-title">HRMIS</h1>
//         </div>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <button
//           className="collapse-btn"
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
//         </button>
//         <ul className="menu-list">
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className="menu-item"
//               onClick={() => navigate(item.path)}
//             >
//               <FontAwesomeIcon icon={item.icon} className="menu-icon" />
//               {!collapsed && <span className="menu-label">{item.label}</span>}
//             </li>
//           ))}
//         </ul>
//       </aside>

//       <main className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
//         {children}
//       </main>
//     </div>
//   );
// }
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
    { icon: faUsers, label: "Register User", path: "/register" },
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
