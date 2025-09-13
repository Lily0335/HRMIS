import React, { useState } from "react";
import "./UserManagement.css";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "IT",
    designation: "Developer",
    phone: "1234567890",
    address: "123 Main St",
    role: "Employee",
    is_active: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "HR",
    designation: "Manager",
    phone: "9876543210",
    address: "456 Park Ave",
    role: "Manager",
    is_active: true,
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
    address: "",
    role: "Employee",
    is_active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(users.map((u) => (u.id === formData.id ? formData : u)));
      setIsEditing(false);
    } else {
      setUsers([
        ...users,
        { ...formData, id: Date.now(), is_active: true },
      ]);
    }
    setFormData({
      id: null,
      name: "",
      email: "",
      department: "",
      designation: "",
      phone: "",
      address: "",
      role: "Employee",
      is_active: true,
    });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      id: null,
      name: "",
      email: "",
      department: "",
      designation: "",
      phone: "",
      address: "",
      role: "Employee",
      is_active: true,
    });
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Employee">Employee</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
        <label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          />{" "}
          Active
        </label>
        <div className="form-buttons">
          <button type="submit" className={isEditing ? "update" : "add"}>
            {isEditing ? "Update User" : "Add User"}
          </button>
          {isEditing && (
            <button type="button" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <div className="user-header">
              <span>
                <strong>{user.name}</strong> ({user.role})
              </span>
              <span>{user.email}</span>
            </div>
            <div className="user-details">
              <p>{user.designation} - {user.department}</p>
              <p>{user.phone} | {user.address}</p>
              <p>Status: {user.is_active ? "Active" : "Inactive"}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
