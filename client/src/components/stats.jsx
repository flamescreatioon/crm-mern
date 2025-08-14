import React from "react";
import "../styles/global.css";

const StatsCard = ({title, value, icon, color}) => {
    return(
        <div className="stats-card" style={{borderLeft: `5px solid ${color}`}}>
            <div className="stats-icon" >
                {icon}
            </div>
            <div className="stats-info">
                <h4>{title}</h4>
                <p style={{color: color}}>{value}</p>
            </div>
        </div>
    );
}

export default StatsCard;