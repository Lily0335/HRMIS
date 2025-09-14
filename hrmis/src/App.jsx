import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import LeaveManagement from "./components/LeaveManagement.jsx";
import TaskManagement from "./components/TaskManagement.jsx";
import UserManagement from "./components/UserManagment.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Rejister.jsx";


function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/leaves" element={<LeaveManagement />} />
         <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
