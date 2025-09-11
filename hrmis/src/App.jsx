
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import LeaveManagement from "./components/LeaveManagement.jsx";

import Dashboard from "./pages/Dashboard.jsx";

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
 <Route
              path="/task-management"
              element={
                userRole === "admin" || userRole === "manager" ? (
                  <TaskManagement userRole={userRole} />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

