import { useState } from "react";
import axios from "axios";
import "../styles/global.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      alert("Login successful");
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    onChange={handleChange}
                />
                <button className="bg-green-500 hover:bg-green-600 text-white w-full py-3 rounded font-semibold transition">
                    Login here
                </button>
            </form>
        </div>
    </div>
);
}
