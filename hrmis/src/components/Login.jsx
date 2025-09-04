import { useState } from "react";
import API from "../api/axios"
import "./Login.css";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", form);
    console.log("Login Response:", res.data);

    if (res.data?.access_token) {
      localStorage.setItem("token", res.data.access_token);
      setMessage("✅ Login successful!");
    } else {
      setMessage("⚠️ No token received.");
    }
  } catch (err) {
    console.error("Login Error:", err.response || err.message);
    setMessage(
      "❌ Login failed: " +
        (err.response?.data?.error || err.message)
    );
  }
};

  return (
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
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
