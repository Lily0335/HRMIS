import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser } from "../services/authService";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate form before sending
  const validateForm = () => {
    const { name, email, password, department, designation, phone, address } = form;

    if (!name.trim()) return "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!department.trim()) return "Department is required.";
    if (!designation.trim()) return "Designation is required.";
    if (!/^\+92\d{10}$/.test(phone)) return "Phone must start with +92 followed by 10 digits.";
    if (!address.trim()) return "Address is required.";

    return null; // Valid
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Allow only + at start and digits
      let val = value;
      if (!val.startsWith("+")) val = "+" + val.replace(/\D/g, "");
      else val = "+" + val.slice(1).replace(/\D/g, "");
      setForm({ ...form, phone: val });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const errorMsg = validateForm();
    if (errorMsg) {
      setMessage(`❌ ${errorMsg}`);
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(form);
      setMessage("✅ User registered successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        phone: "",
        address: "",
      });

      if (data.access_token) localStorage.setItem("token", data.access_token);

      // Redirect after short delay
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(`❌ Registration failed: ${err.message || err.error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone (+92XXXXXXXXXX)"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
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
  );
}
