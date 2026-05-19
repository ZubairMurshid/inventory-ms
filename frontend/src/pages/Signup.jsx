import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signup } from "../services/authService";

function Signup() {
  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "/";
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Password length validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup({
        email: formData.email,
        password: formData.password,
      });

      navigate("/login");
    } catch (err) {
      setError("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Signup</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-lg"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-lg"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full border border-slate-300 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700"
          >
            Signup
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
