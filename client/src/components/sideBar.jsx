import React from "react";
import "../styles/global.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>Home</li>
        <li>Customers</li>
        <li>Leads</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
