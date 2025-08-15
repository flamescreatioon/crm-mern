import React, { useEffect, useState} from "react";
import axios from "axios";

const LeadsTable = () => {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sourceFilter, setSourceFilter] = useState("");

    useEffect(()=>{
        axios.get("http://localhost:5000/api/leads")
        .then((res)=>setLeads(res.data));
    }, []);

    const filteredLeads = leads.filter((lead) =>{
        const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? lead.status === statusFilter : true;
        const matchesSource = sourceFilter ? lead.source === sourceFilter : true;
        return matchesSearch && matchesStatus && matchesSource;
    });

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                </select>
                <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                >
                    <option value="">All Sources</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social_media">Social Media</option>
                </select>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th>Source</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.length > 0 ? (
                            filteredLeads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{lead.name}</td>
                                    <td>{lead.email}</td>
                                    <td>{lead.phone}</td>
                                    <td>{lead.company}</td>
                                    <td>{lead.status}</td>
                                    <td>{lead.source}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No leads found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadsTable;