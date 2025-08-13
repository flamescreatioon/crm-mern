import React from "react";
import "../styles/global.css";

const NavBar = ({onLogout, userName})=>{
    return (
        <nav className="navbar">
            <h1>Welcome, {userName}</h1>
            <button className="logout-button" onClick={onLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;
