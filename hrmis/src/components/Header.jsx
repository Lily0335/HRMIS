import { useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";
import "./Layout.css"; // reuse header styles

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="layout-header">
      <div className="header-left">
        <img src={logoImg} alt="Logo" className="logo-img" />
        <h1 className="header-title">HRMIS</h1>
      </div>
      {/* 🔹 Show Logout only if logged in */}
      {localStorage.getItem("token") && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
}
