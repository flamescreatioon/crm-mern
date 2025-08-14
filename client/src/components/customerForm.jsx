import React, { useState } from "react";
import '../styles/customerform.css';
import axios from 'axios';

const CustomerForm = () => {
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

  return(
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
  )
}

export default CustomerForm;