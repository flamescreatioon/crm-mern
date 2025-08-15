import "../styles/global.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sideBar";
import NavBar from "../components/navbar";
import StatsCard from "../components/stats";
import { FaUsers, FaUserPlus, FaChartLine, FaFileAlt } from "react-icons/fa";
import CustomerForm from "../components/customerForm";
import RecentActivity from "../components/widgets/RecentActivity";
import SalesChart from "../components/widgets/SalesChart";

export default function Dashboard() {
  const [customer, setCustomers] = useState([]);
  const userToken = localStorage.getItem("token");
  const [stats, setStats] = useState({
    totalCustomers: 0,
    newLeads: 0,
    monthlySales: 0,
    reportsGenerated: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers", {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  }, [userToken]);

 

  return (
    <div className="dashboard-container">
      {userToken ? (
        <>
          <Sidebar />

          <div className="main-content">
            <NavBar
              onLogout={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              userName="User"
            />
            <div className="content">
              <p className="heading">CRM System</p>
            <div className="cards">
              <StatsCard
                title="Total Customers"
                value={stats.totalCustomers}
                icon={<FaUsers />}
                color="#000038ff"
              />
              <StatsCard
                title="New Leads"
                value={stats.newLeads}
                icon={<FaUserPlus />}
                color="#013d13ff"
              />
              <StatsCard
                title="Monthly Sales"
                value={stats.monthlySales}
                icon={<FaChartLine />}
                color="#b44800ff"
              />
              <StatsCard
                title="Reports Generated"
                value={stats.reportsGenerated}
                icon={<FaFileAlt />}
                color="#580000ff"
              />
              
            </div>

              <SalesChart/>
            <h2 className="heading">Customers</h2>
           
            <CustomerForm />
           
            <ul>
              {customer.map((c) => (
                <li key={c._id}>
                  {c.name} - {c.email}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
            </div>
            
          </div>

           <RecentActivity />

          
        </>
      ) : (
        <p>Please log in to access the dashboard</p>
      )}
    </div>
  );
}
