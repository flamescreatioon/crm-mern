import "../styles/global.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sideBar";
import NavBar from "../components/navbar";
import StatsCard from "../components/stats";
import { FaUsers, FaUserPlus, FaChartLine, FaFileAlt } from "react-icons/fa";

export default function Dashboard() {
  const [customer, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
    address: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/customers",
        form,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setCustomers([...customer, res.data]);
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        notes: "",
        address: "",
      });
    } catch (error) {
      console.error("Error adding customer", error);
    }
  };

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
            <p>Welcome to your CRM system</p>
            <div className="cards">
              <StatsCard
                title="Total Customers"
                value={stats.totalCustomers}
                icon={<FaUsers />}
                color="#1a1a2e"
              />
              <StatsCard
                title="New Leads"
                value={stats.newLeads}
                icon={<FaUserPlus />}
                color="#1a1a2e"
              />
              <StatsCard
                title="Monthly Sales"
                value={stats.monthlySales}
                icon={<FaChartLine />}
                color="#1a1a2e"
              />
              <StatsCard
                title="Reports Generated"
                value={stats.reportsGenerated}
                icon={<FaFileAlt />}
                color="#1a1a2e"
              />
              <div className="card">
                <h4>Active Leads</h4>
                <p>45</p>
              </div>
              <div className="card">
                <h4>Total Revenue</h4>
                <p>$12,000</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="customer-form">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <input
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
              <button type="submit">Add customer</button>
            </form>

            <h2>Customers</h2>
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
        </>
      ) : (
        <p>Please log in to access the dashboard</p>
      )}
    </div>
  );
}
