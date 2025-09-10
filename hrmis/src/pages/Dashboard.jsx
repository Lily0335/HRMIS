
// // src/components/Dashboard.js
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUsers,
//   faCalendar,
//   faClipboardList,
//   faMoneyCheck,
//   faChartBar,
//   faCog,
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import logoImg from "../assets/logo.png";
// import "./Dashboard.css";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);
//   const [profile, setProfile] = useState({});
//   const [stats, setStats] = useState({
//     totalEmployees: 0,
//     pendingLeaves: 0,
//     approvedLeaves: 0,
//     rejectedLeaves: 0,
//     completedTasks: 0,
//     pendingTasks: 0,
//   });


//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   const menuItems = [
//     { icon: faHome, label: "Dashboard" },
//     { icon: faUsers, label: "Employees" },
//     { icon: faCalendar, label: "Leaves", path: "/leaves" },
//     { icon: faClipboardList, label: "Tasks" },
//     { icon: faChartBar, label: "Reports" },
//     { icon: faCog, label: "Settings" },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get all users
//         const resUsers = await API.get("/users");

//         // Get profile
//         const resProfile = await API.get("/users/profile");

//         // Example: profile may return { id, name, email, role }
//         const userId = resProfile.data.id;

//         // Get leaves by user
//         const resLeavesPending = await API.get(`/leaves/user/${userId}/pending`);
//         const resLeavesApproved = await API.get(`/leaves/user/${userId}/approved`);
//         const resLeavesRejected = await API.get(`/leaves/user/${userId}/rejected`);

//         // Get all tasks
//         const resTasks = await API.get("/tasks");
//         const completedTasks = resTasks.data.filter(t => t.status === "completed").length;
//         const pendingTasks = resTasks.data.filter(t => t.status !== "completed").length;

//         setStats({
//           totalEmployees: resUsers.data.length,
//           pendingLeaves: resLeavesPending.data.length,
//           approvedLeaves: resLeavesApproved.data.length,
//           rejectedLeaves: resLeavesRejected.data.length,
//           completedTasks,
//           pendingTasks,
//         });

//         setProfile(resProfile.data);
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   const pieData = [
//     { name: "Completed Tasks", value: stats.completedTasks },
//     { name: "Pending Tasks", value: stats.pendingTasks },
//     { name: "Pending Leaves", value: stats.pendingLeaves },
//   ];

//   const COLORS = ["#1abc9c", "#f39c12", "#e74c3c"];

//   return (
//     <div className="dashboard-container">
//       {/* Header */}
//       <header className="dashboard-header">
//         <div className="header-left">
//           <img src={logoImg} alt="Logo" className="logo-img" />
//           <h1 className="header-title">HRMIS</h1>
//         </div>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </header>

//       {/* Sidebar */}
//       <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <button
//           className="collapse-btn"
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} />
//         </button>
//         <ul className="menu-list">
//           {menuItems.map((item, index) => (
//             <li key={index} className="menu-item">
//               <FontAwesomeIcon icon={item.icon} className="menu-icon" />
//               {!collapsed && <span className="menu-label">{item.label}</span>}
//             </li>
            
//           ))}
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className={`main-content ${collapsed ? "sidebar-collapsed" : ""}`}>
//         {/* Admin Card */}
//         <div className="admin-card">
//           <h2>Hello, {profile.name || "Admin"}</h2>
//           <p>Welcome back!</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="cards">
//           <div className="card">
//             <h3>Total Employees</h3>
//             <p>{stats.totalEmployees}</p>
//           </div>
//           <div className="card">
//             <h3>Pending Leaves</h3>
//             <p>{stats.pendingLeaves}</p>
//           </div>
//           <div className="card">
//             <h3>Approved Leaves</h3>
//             <p>{stats.approvedLeaves}</p>
//           </div>
//           <div className="card">
//             <h3>Rejected Leaves</h3>
//             <p>{stats.rejectedLeaves}</p>
//           </div>
//           <div className="card">
//             <h3>Completed Tasks</h3>
//             <p>{stats.completedTasks}</p>
//           </div>
//           <div className="card">
//             <h3>Pending Tasks</h3>
//             <p>{stats.pendingTasks}</p>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="charts">
//           <div className="chart-container">
//             <h3>Overview</h3>
//             <ResponsiveContainer width="100%" height={250}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// // // src/components/Dashboard.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faCalendar,
  faClipboardList,
  faMoneyCheck,
  faChartBar,
  faCog,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import logoImg from "../assets/logo.png";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [profile, setProfile] = useState({});
  const [stats, setStats] = useState({
    totalEmployees: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ✅ menuItems me path add kiya
  const menuItems = [
    { icon: faHome, label: "Dashboard", path: "/dashboard" },
    { icon: faUsers, label: "Employees", path: "/employees" },
    { icon: faCalendar, label: "Leaves", path: "/leaves" },
    { icon: faClipboardList, label: "Tasks", path: "/tasks" },
    { icon: faChartBar, label: "Reports", path: "/reports" },
    { icon: faCog, label: "Settings", path: "/settings" },
    { icon: faUsers, label: "Register User", path: "/register" },
  ];

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
        const completedTasks = resTasks.data.filter(
          (t) => t.status === "completed"
        ).length;
        const pendingTasks = resTasks.data.filter(
          (t) => t.status !== "completed"
        ).length;

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
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  const pieData = [
    { name: "Completed Tasks", value: stats.completedTasks },
    { name: "Pending Tasks", value: stats.pendingTasks },
    { name: "Pending Leaves", value: stats.pendingLeaves },
  ];

  const COLORS = ["#1abc9c", "#f39c12", "#e74c3c"];

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
              onClick={() => navigate(item.path)} // ✅ navigate add
            >
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
          <h2>Hello, {profile.name || "Admin"}</h2>
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
            <h3>Approved Leaves</h3>
            <p>{stats.approvedLeaves}</p>
          </div>
          <div className="card">
            <h3>Rejected Leaves</h3>
            <p>{stats.rejectedLeaves}</p>
          </div>
          <div className="card">
            <h3>Completed Tasks</h3>
            <p>{stats.completedTasks}</p>
          </div>
          <div className="card">
            <h3>Pending Tasks</h3>
            <p>{stats.pendingTasks}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="chart-container">
            <h3>Overview</h3>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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
