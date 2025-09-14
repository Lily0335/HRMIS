

import { useEffect, useState } from "react";
import {
  fetchUsers,
  createUser,
  fetchUserById,
  updateUser,
  deleteUser,
  fetchUserByEmail,
} from "../api/users";
import "./UserManagement.css";
export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    designation: "",
    phone: "",
    address: "",
    role: "Employee",
  });
  const [editingId, setEditingId] = useState(null);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateUser(editingId, formData);
      } else {
        await createUser(formData);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
        designation: "",
        phone: "",
        address: "",
        role: "Employee",
      });
      setEditingId(null);
      loadUsers();
    } catch (err) {
      setError(err.message || "Failed to save user");
    }
  };

  const handleEdit = async (id) => {
    try {
      const user = await fetchUserById(id);
      setFormData({
        ...user,
        password: "",
      });
      setEditingId(id);
    } catch (err) {
      setError(err.message || "Failed to fetch user details");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      setError(err.message || "Failed to delete user");
    }
  };

  const handleSearchByEmail = async () => {
    try {
      const res = await fetchUserByEmail(searchEmail);
      setSearchResult(res);
    } catch (err) {
      setError(err.message || "User not found");
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      {error && <p className="error">{error}</p>}

      <div>
        <input
          type="email"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={handleSearchByEmail}>Search</button>
        {searchResult && (
          <div className="search-result">
            Found: {searchResult.name} ({searchResult.email})
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {!editingId && (
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        )}
        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleInputChange}
          required
        />
        <input
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleInputChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          required
        >
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">{editingId ? "Update" : "Create"} User</button>
      </form>

      {/* 📋 Users Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.designation}</td>
                <td>{user.role}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
