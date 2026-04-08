import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);
      login(res.data.data);

      const redirectPath = ["admin", "superadmin"].includes(res.data.data.role)
        ? "/admin-dash"
        : "/bookings";

      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Card */}
        <div className="relative bg-white border border-slate-200 shadow-xl rounded-3xl p-8">
          {/* Soft Glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-400/20 blur-3xl rounded-full"></div>

          <Link to="/" className="flex items-center justify-center mb-6 group font-display">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient
                id="logo-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <path
              stroke="url(#logo-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke="url(#logo-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#22c55e] to-[#059669] bg-clip-text text-transparent">
  Hariye Tour Agency
</span>
        </Link>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-slate-500 mb-6 text-sm">
            Sign in to access your dashboard and manage your tours.
          </p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-slate-700 font-medium">Email</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-700 font-medium">Password</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-slate-900 placeholder-slate-400 text-sm"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 transition py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Simple CSS Animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
