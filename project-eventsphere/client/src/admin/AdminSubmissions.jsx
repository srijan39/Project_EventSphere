import { useEffect, useState } from "react";
import api from "../utils/axiosInstance"; // ✅ use centralized API
import { logout } from "../utils/auth";   // ✅ safety logout
import SubmissionsTable from "./components/SubmissionsTable";

const AdminSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError("");

      // ✅ No token handling here
      const { data } = await api.get("/admin/submissions");

      setSubmissions(data.submissions || []);
    } catch (err) {
      console.error(err);

      // 🔥 Auto logout if unauthorized
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
    fetchSubmissions();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 text-gray-800">
      <div className="mx-auto max-w-7xl">

        {/* 🔹 Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Submissions</h1>
            <p className="text-sm text-gray-500">
              Manage all recruitment entries
            </p>
          </div>

          <button
            onClick={fetchSubmissions}
            className="rounded-lg bg-[#040720] px-4 py-2 text-white text-sm font-medium hover:opacity-90"
          >
            Refresh
          </button>
        </div>

        {/* 🔹 Table */}
        <div className="bg-white rounded-xl border shadow-sm p-5">

          {loading && (
            <p className="text-gray-500">Loading submissions...</p>
          )}

          {!loading && error && (
            <div className="rounded-lg bg-red-100 text-red-600 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && (
            <SubmissionsTable submissions={submissions} />
          )}

        </div>

      </div>
    </section>
  );
};

export default AdminSubmissions;