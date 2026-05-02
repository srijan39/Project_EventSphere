import { useEffect, useState } from "react";
import api from "../utils/axiosInstance"; // ✅ centralized API
import { logout } from "../utils/auth";   // ✅ for safety

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError("");

     
      const { data } = await api.get("/admin/submissions");

      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error(err);

      // 🔥 If backend sends 401 → logout automatically
      if (err.response?.status === 401) {
        logout();
      } else {
        setError("Failed to fetch submissions");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");

    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }

    fetchSubmissions();
  }, []);

  // 🔹 Stats
  const total = submissions.length;

  const technical = submissions.filter(
    (item) => item.domain?.toLowerCase() === "technical"
  ).length;

  const experienced = submissions.filter(
    (item) => item.experience?.toLowerCase() === "yes"
  ).length;

  const recent = submissions.slice(-5).reverse();

  return (
    <section className="min-h-screen bg-gray-100 text-gray-800">
      <div className="mx-auto max-w-7xl">

        {/* 🔹 Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome {admin?.username || "Admin"}
            </p>
          </div>

          <button
            onClick={fetchSubmissions}
            className="rounded-lg bg-[#040720] px-5 py-2 text-white text-sm font-medium hover:opacity-90"
          >
            Refresh
          </button>
        </div>

        {/* 🔹 Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">

          <div className="rounded-xl bg-white p-5 border shadow-sm">
            <p className="text-sm text-gray-500">Total Submissions</p>
            <h2 className="mt-2 text-3xl font-bold">{total}</h2>
          </div>

          <div className="rounded-xl bg-white p-5 border shadow-sm">
            <p className="text-sm text-gray-500">Technical Applicants</p>
            <h2 className="mt-2 text-3xl font-bold">{technical}</h2>
          </div>

          <div className="rounded-xl bg-white p-5 border shadow-sm">
            <p className="text-sm text-gray-500">With Experience</p>
            <h2 className="mt-2 text-3xl font-bold">{experienced}</h2>
          </div>

        </div>

        {/* 🔹 Error */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-600 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* 🔹 Recent Submissions */}
        <div className="rounded-xl bg-white p-5 border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Recent Submissions
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : recent.length === 0 ? (
            <p className="text-gray-400">No recent submissions</p>
          ) : (
            <div className="space-y-3">
              {recent.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.email}
                    </p>
                  </div>

                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.domain}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;