import React, { useEffect, useState } from "react";
import Sidebar from "../components/sideBar"; // existing filename
import NavBar from "../components/navbar"; // existing filename
import CustomerFormModal from "../components/customerFormModal"; // modal component
import "../styles/global.css";

// Customers page refactored to use a modal for add/edit, search bar, and cleaner table UI.
export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCustomer, setEditCustomer] = useState(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/customers");
            if (!res.ok) throw new Error("Failed to fetch customers");
            const data = await res.json();
            setCustomers(data);
        } catch (err) {
            console.error("Error fetching customers:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        try {
            if (editCustomer) {
                await fetch(`http://localhost:5000/api/customers/${editCustomer._id}`, {
                    method: "PUT",
                        headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch("http://localhost:5000/api/customers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });
            }
            fetchCustomers();
            setIsModalOpen(false);
            setEditCustomer(null);
        } catch (err) {
            console.error("Error saving customer:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this customer?")) return;
        try {
            await fetch(`http://localhost:5000/api/customers/${id}`, { method: "DELETE" });
            fetchCustomers();
        } catch (err) {
            console.error("Error deleting customer:", err);
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
                <NavBar userName="Flames" onLogout={() => console.log("Logout")} />

                <div className="page-header">
                    <h2>Customers</h2>
                    <div>
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-input"
                        />
                        <button
                            className="btn-add"
                            onClick={() => {
                                setEditCustomer(null);
                                setIsModalOpen(true);
                            }}
                        >
                            + Add Customer
                        </button>
                    </div>
                </div>

                {loading ? (
                    <p>Loading customers...</p>
                ) : (
                    <table className="customers-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Company</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map(c => (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{c.email}</td>
                                        <td>{c.phone}</td>
                                        <td>{c.company}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => {
                                                    setEditCustomer(c);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => handleDelete(c._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        No customers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                <CustomerFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    initialData={editCustomer}
                />
            </div>
        </div>
    );
}