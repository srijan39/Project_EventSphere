import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/admin/login",
        form
      );

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.admin));


      setSuccess(true);

     
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 900);

    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
      
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border">

        {/* 🔹 Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#040720]">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Access the VIBRANTA admin panel
          </p>
        </div>

        {/* 🔹 Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* 🔹 Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              autoFocus
              placeholder="Enter username"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#040720]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm text-gray-600">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#040720]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || success}
            className={`w-full rounded-lg px-5 py-3 text-white font-medium flex items-center justify-center gap-2 transition
              ${
                success
                  ? "bg-green-500"
                  : "bg-[#040720] hover:opacity-90"
              }`}
          >
            {loading && !success && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {success
              ? "Authentication Successful"
              : loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          VIBRANTA Admin Panel
        </p>

      </div>
    </section>
  );
};

export default AdminLogin;