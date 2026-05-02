import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { isTokenExpired, logout } from "../utils/auth";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [admin, setAdmin] = useState(null);

  // 🔹 Centralized Auth Check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token || isTokenExpired(token)) {
      logout();
    }
  }, []);

  // 🔹 Load Admin
  useEffect(() => {
    const stored = localStorage.getItem("adminUser");
    if (stored) setAdmin(JSON.parse(stored));
  }, []);

  // 🔹 Active Route
  const isActive = (path) => location.pathname === `/admin/${path}`;

  // 🔹 Header Text
  const getTitle = () => {
    if (location.pathname.includes("submissions")) return "Submissions";
    return "Dashboard";
  };

  const getSubtitle = () => {
    if (location.pathname.includes("submissions")) {
      return "Manage recruitment entries";
    }
    return "Manage your platform";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔹 Sidebar */}
      <aside className="w-64 bg-[#040720] text-white flex flex-col justify-between">

        <div>
          <div className="px-6 py-5 border-b border-white/10">
            <h1 className="text-xl font-bold tracking-wide">VIBRANTA</h1>
            <p className="text-xs text-white/60">Admin Panel</p>
          </div>

          <nav className="mt-6 px-3 space-y-2">

            <button
              onClick={() => navigate("/admin/dashboard")}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                isActive("dashboard")
                  ? "bg-white text-[#040720] font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/admin/submissions")}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                isActive("submissions")
                  ? "bg-white text-[#040720] font-semibold"
                  : "hover:bg-white/10"
              }`}
            >
              Submissions
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 opacity-50 cursor-not-allowed">
              Events (soon)
            </button>

            <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 opacity-50 cursor-not-allowed">
              Gallery (soon)
            </button>

          </nav>
        </div>

        {/* 🔹 Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full bg-white text-[#040720] py-2 rounded-xl font-semibold hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* 🔹 Main */}
      <div className="flex-1 flex flex-col">

        {/* 🔹 Header */}
        <header className="bg-white px-6 py-4 border-b flex justify-between items-center">

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {getTitle()}
            </h2>
            <p className="text-xs text-gray-500">
              {getSubtitle()}
            </p>
          </div>

          {/* 🔥 Admin Info */}
          <div className="flex items-center gap-3">

            {/* Avatar */}
            <div className="h-9 w-9 rounded-full bg-[#040720] text-white flex items-center justify-center font-semibold">
              {admin?.username?.charAt(0)?.toUpperCase() || "A"}
            </div>

            {/* Name */}
            <div className="text-sm">
              <p className="font-medium text-gray-800">
                {admin?.username || "Admin"}
              </p>
              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>

          </div>
        </header>

        {/* 🔹 Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;