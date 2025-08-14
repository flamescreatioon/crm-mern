import React from "react";
import "../styles/global.css";
import { FiPower } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const NavBar = ({onLogout, userName})=>{
    return (
        <nav className="navbar">
            <h1 >Welcome, {userName}</h1>
            <div className="navbar-links">
                <div className="navbar-search-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="navbar-search"
                    />
                    <span className="navbar-search-icon">
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                </div>
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=40&q=80" alt="Logo" style={{ height: "40px", width: "40px", cursor: "pointer", borderRadius: "50%" }} />
                <NavLink to="/" onClick={onLogout} title="Logout">
                    <FiPower size={16} />
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar;
