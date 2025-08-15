import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserPlus,
  FaStar,
  FaCalendarAlt,
} from "react-icons/fa";
import '../../styles/global.css';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    // Fetch activities from API
    axios.get("http://localhost:5000/api/recent-activity/recent")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setActivities(res.data);
        }
      })
      .catch((err) => {
        console.log("Using default activities:", err);
        // Keep default activities if API fails
      });
  }, []);

  return (
    <div className="recent-activities-sidebar">
      <h3 className="activities-header">Recent Activities</h3>
      
      <div className="activities-list">
        {activities.map((activity) => (
          <div key={activity._id} className="activity-item">
            <div className="activity-icon-wrapper">
              
            </div>
            <div className="activity-content">
              <p className="activity-message">{activity.message}</p>
              <span className="activity-date">{new Date(activity.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;