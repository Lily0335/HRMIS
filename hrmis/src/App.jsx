import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const token = localStorage.getItem("token"); // ✅ token check

  return (
    <Router>
      <Routes>
        {/* Agar login hua hai to direct dashboard pe le jao */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />

        <Route path="/login" element={<Login />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
