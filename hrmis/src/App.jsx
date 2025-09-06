// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard.jsx";
// import Employees from "./components/Employees.jsx";

// function App() {
//   const token = localStorage.getItem("token"); // ✅ token check

//   return (
//     <Router>
//       <Routes>
//         {/* Agar login hua hai to direct dashboard pe le jao */}
//         <Route
//           path="/"
//           element={token ? <Navigate to="/dashboard" /> : <Login />}
//         />

//         <Route path="/login" element={<Login />} />
//         <Route path="/employees" element={<Employees />} />
//         <Route
//           path="/dashboard"
//           element={token ? <Dashboard /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register"; // ✅ new register page
import Dashboard from "./components/Dashboard.jsx";
import Employees from "./components/Employees.jsx";

function App() {
  const token = localStorage.getItem("token"); // ✅ token check

  return (
    <Router>
      <Routes>
        {/* Root route: agar login hai to dashboard, warna login */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Employees page */}

        <Route path="/employees" element={<Employees />} />

        {/* Dashboard page */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
