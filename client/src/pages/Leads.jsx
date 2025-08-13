import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sideBar';
import NavBar from '../components/navbar';
import CustomerFormModal from '../components/customerFormModal';
import "../styles/global.css";

const Leads = () =>{
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editLead, setEditLead] = useState(null);


    useEffect(()=>{
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try{
            const res = await fetch("http://localhost:5000/api/leads");
            const data = await res.json();
            setLeads(data);
        }catch(err){
            console.error("Error fetching leads:", err);
        }finally{
            setLoading(false);
        }
    };

    const handleSave = async (formData) =>{
        try {
            if(editLead){
                await fetch(`http://localhost:5000/api/leads/${editLead.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
            }else{
                await fetch("http://localhost:5000/api/leads", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
            }
            fetchLeads();
            setIsModalOpen(false);
            setEditLead(null);
        } catch (error) {
            console.error("Error saving lead:", error);
        }
    };

    const handleDelete = async (id) =>{
        if(!window.confirm("Are you sure you want to delete this lead?")) return;
        try {
            await fetch(`http://localhost:5000/api/leads/${id}`, {
                method: "DELETE"
            });
            fetchLeads();
        } catch (error) {
            console.error("Error deleting lead:", error);
        }
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <NavBar userName="Flames" onLogout={() => console.log("Logout")} />

        <div className="page-header">
          <h2>Leads</h2>
          <div>
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input"
            />
            <button
              className="btn-add"
              onClick={() => {
                setEditLead(null);
                setIsModalOpen(true);
              }}
            >
              + Add Lead
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading leads...</p>
        ) : (
          <table className="customers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map(l => (
                  <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.email}</td>
                    <td>{l.phone}</td>
                    <td>{l.status}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setEditLead(l);
                          setIsModalOpen(true);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(l._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No leads found
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
          initialData={editLead}
        />
      </div>
    </div>
  );
}