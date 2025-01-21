import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [user, setUser] = useState({ name: "", email: "", age: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8888/api/user/addUser", user);
      setMessage("User created successfully!");
      setUser({ name: "", email: "", age: "" }); 
    } catch (err) {
      console.error(err);
      setError("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Add User</h1>
      {message && <p className="text-success text-center">{message}</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={user.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={user.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            id="age"
            className="form-control"
            value={user.age}
            onChange={(e) => handleInputChange("age", e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add User
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
