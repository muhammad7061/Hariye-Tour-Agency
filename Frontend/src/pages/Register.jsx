import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registration successful. You can now log in.");
      setTimeout(() => navigate("/login", { replace: true }), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Create your account</h1>
        <p className="text-sm text-slate-500 mb-8">
          Register as a new customer to book tours and manage tickets.
        </p>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-slate-700 font-semibold">Full name</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </label>

          <label className="block">
            <span className="text-slate-700 font-semibold">Email address</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </label>

          <label className="block">
            <span className="text-slate-700 font-semibold">Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
