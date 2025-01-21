import React from "react";
import "./navbar.css";

import {  NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-menu">
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "black" : "gray", 
            })}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/createUser"
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "black" : "gray",
            })}
          >
            Create user
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
