// import { useState } from "react";
// import { useNavigate } from "react-router-dom";  // ✅ add this
// import API from "../api/axios";
// import "./Login.css";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate(); // ✅ for redirect

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", form);
//       console.log("Login Response:", res.data);

//       if (res.data?.access_token) {
//         localStorage.setItem("token", res.data.access_token);
//         setMessage("✅ Login successful!");

//         // ✅ redirect to dashboard after successful login
//         navigate("/dashboard");
//       } else {
//         setMessage("⚠️ No token received.");
//       }
//     } catch (err) {
//       console.error("Login Error:", err.response || err.message);
//       setMessage("❌ Login failed: " + (err.response?.data?.error || err.message));
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
//         <button type="submit">Login</button>
//         {message && <p className="message">{message}</p>}
//       </form>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await API.post("/auth/login", form);
      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("token", token);

        setTimeout(() => navigate("/dashboard"), 500);
      } else setMessage("⚠️ No token received");
    } catch (err) {
      setMessage("❌ Login failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        {message && <p className={`message ${message.startsWith("✅") ? "success" : "error"}`}>{message}</p>}
      </form>
    </div>
  );
}

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";
// import { AuthContext } from "../context/AuthContext";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const { setProfile } = useContext(AuthContext);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await API.post("/auth/login", form);
//       // expecting { token, user? } or token only
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         // fetch profile after storing token
//         const prof = await API.get("/users/profile");
//         setProfile(prof.data);
//         navigate("/dashboard");
//       } else {
//         setError("Login response is missing token.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Invalid credentials or server error.");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit} className="form">
//         <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
//         <button className="btn" type="submit">Login</button>
//       </form>
//     </div>
//   );
// }
// // // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../api/axios";

// // export default function Login() {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [message, setMessage] = useState("");
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await API.post("/auth/login", form);

// //       // ✅ handle different token formats
// //       const token = res.data.token || res.data.access_token || res.data.jwt;

// //       if (!token) {
// //         setMessage("Login failed: no token returned from server");
// //         return;
// //       }

// //       // ✅ Save token in localStorage
// //       localStorage.setItem("token", token);

// //       // redirect to dashboard
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setMessage("Login failed: " + (err.response?.data?.message || err.message));
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={form.password}
// //           onChange={handleChange}
// //         />
// //         <button type="submit">Login</button>
// //       </form>
// //       {message && <p>{message}</p>}
// //     </div>
// //   );
// // }
// // import { useState, useContext } from "react";
// // import API from "../api/axios";
// // import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../context/AuthContext";

// // export default function Login() {
// //   const [form, setForm] = useState({ email: "", password: "" });
// //   const [message, setMessage] = useState("");
// //   const { login } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await API.post("/auth/login", form);

// //       // Token field variations
// //       const token = res.data.token || res.data.access_token || res.data.jwt;
// //       const userData = res.data.user; // 👈 API ka response check karo
// //       if (!token || !userData) {
// //         setMessage("Login failed: no token or user data returned");
// //         return;
// //       }

// //       login(userData, token);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setMessage("Login failed: " + (err.response?.data?.message || err.message));
// //     }
// //   };

// //   return (
// //     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleSubmit} className="p-6 border rounded space-y-3">
//         <h2 className="text-xl font-bold">Login</h2>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded w-64"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded w-64"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Login
//         </button>
//         {message && <p className="text-red-500">{message}</p>}
//       </form>
//     </div>
//   );
// }
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", form);
//       console.log("🔑 Login Response:", res.data);

//       const token = res.data?.access_token;
//       if (token) {
//         localStorage.setItem("token", token);
//         setMessage("✅ Login successful!");

//         // Redirect to dashboard
//         navigate("/dashboard");
//       } else {
//         setMessage("⚠️ No token received.");
//       }
//     } catch (err) {
//       console.error("Login Error:", err.response || err.message);
//       setMessage("❌ Login failed: " + (err.response?.data?.error || err.message));
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
//         <button type="submit">Login</button>
//         {message && <p className="message">{message}</p>}
//       </form>
//     </div>
//   );
// }
