import { useState } from "react";
import axios from "axios";
import "../styles/global.css";

export default function Register(){
    const [form, setForm] = useState({name: "", email: "", password: ""});
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("User registered successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white shadow rounded p-6">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input className="w-full border rounded px-3 py-2" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                    <input className="w-full border rounded px-3 py-2" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                    <input className="w-full border rounded px-3 py-2" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" />
                    <button className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}