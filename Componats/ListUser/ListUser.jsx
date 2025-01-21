import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const ListUser = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [editing, setEditing] = useState(null); 
  const [updatedUser, setUpdatedUser] = useState({}); 

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8888/api/user/fetchUser");
      setUsers(response.data.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const updateUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:8888/api/user/updateUser/${userId}`, updatedUser);
      console.log("User updated:", response.data);

    
      fetchUsers();

  
      setEditing(null);
      setUpdatedUser({});
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleInputChange = (field, value) => {
    setUpdatedUser((prev) => ({ ...prev, [field]: value }));
  };


  const deleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8888/api/user/deleteUser/${userId}`);
          console.log("User deleted:", response.data);

          fetchUsers();

          Swal.fire("Deleted!", "The user has been deleted.", "success");
        } catch (err) {
          console.error("Failed to delete user:", err);
          setError("Failed to delete user. Please try again.");
          Swal.fire("Error", "Failed to delete the user.", "error");
        }
      }
    });
  };

 
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">List of All Users</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li key={user._id} className="list-group-item">
            {editing === user._id ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={updatedUser.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={updatedUser.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Age"
                  value={updatedUser.age || ""}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
                <button
                  className="btn btn-success mt-2"
                  onClick={() => updateUser(user._id)}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary mt-2 ms-2"
                  onClick={() => {
                    setEditing(null);
                    setUpdatedUser({});
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Name:</strong> {user.name} <br />
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Age:</strong> {user.age}
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEditing(user._id);
                      setUpdatedUser(user); 
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => deleteUser(user._id)} 
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListUser;

