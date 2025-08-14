import { useState } from "react";
import axios from "axios";
import "../styles/global.css";
import PrimaryButton from "../components/reusables/primaryButton";

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
    <div className="container">
        <div className="auth-container">
            <h2 className="auth-heading">Welcome to your dashboard</h2>
            <p className="text text-auth">Please enter your credentials to access your dashboard.</p>
            <form onSubmit={handleSubmit} className="">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="auth-input"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="auth-input"
                    onChange={handleChange}
                />
                <PrimaryButton
                type="submit"
                onClick={handleSubmit}
                >
                    Login here
                </PrimaryButton>
            </form>
        </div>
    </div>
);
}
