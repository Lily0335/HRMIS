// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import "./Login.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await API.post("/auth/login", form);
//       const token = res.data.access_token;
//       if (token) {
//         localStorage.setItem("token", token);
//         console.log("Saved token:", token);
//         setTimeout(() => navigate("/dashboard"), 500);
//       } else setMessage("⚠️ No token received");
//     } catch (err) {
//       setMessage(
//         "❌ Login failed: " + (err.response?.data?.error || err.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-box" onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//         {message && (
//           <p
//             className={`message ${
//               message.startsWith("✅") ? "success" : "error"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Header from "../components/Header.jsx"; // 🔹 Import shared Header
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/auth/login", form);
      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("Saved token:", token);
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        setMessage("⚠️ No token received");
      }
    } catch (err) {
      setMessage(
        "❌ Login failed: " + (err.response?.data?.error || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Shared Header */}
      <Header />

      <div className="login-container">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p
              className={`message ${
                message.startsWith("✅") ? "success" : "error"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}
