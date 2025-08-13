import React from "react";
import "../styles/global.css";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
     <aside>
       <h2>Dashboard</h2>
      <ul>
        <li><NavLink to="/" className={({isActive}) => (isActive ? "active" : "")}>Home</NavLink></li>
        <li><NavLink to="/customers" className={({isActive}) => (isActive ? "active" : "")}>Customers</NavLink></li>
        <li><NavLink to="/leads" className={({isActive}) => (isActive ? "active" : "")}>Leads</NavLink></li>
        <li><NavLink to="/reports" className={({isActive}) => (isActive ? "active" : "")}>Reports</NavLink></li>
        <li><NavLink to="/settings" className={({isActive}) => (isActive ? "active" : "")}>Settings</NavLink></li>
      </ul>
     </aside>
    </div>
  );
};

export default Sidebar;
