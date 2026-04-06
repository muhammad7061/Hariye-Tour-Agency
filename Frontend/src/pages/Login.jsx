import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const redirectPath = ["admin", "superadmin"].includes(user.role)
        ? "/admin-dash"
        : "/bookings";
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.data);

      if (["admin", "superadmin"].includes(res.data.data.role)) {
        navigate("/admin-dash", { replace: true });
      } else {
        navigate("/bookings", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-8">
          Sign in to manage your tours, bookings, and dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            Continue to account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to Hariye Tour?{' '}
          <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
