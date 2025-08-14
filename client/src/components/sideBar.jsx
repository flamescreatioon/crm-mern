import React from "react";
import "../styles/global.css";
import { NavLink } from "react-router-dom";
import { FaHome, FaUsers, FaUserPlus, FaChartBar, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <aside>
        <h2>Dashboard</h2>
        <ul>
          <li>
            
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUsers />
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leads"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaUserPlus />
              Leads
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaChartBar />
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <FaCog />
              Settings
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
