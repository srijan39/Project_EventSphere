import { createBrowserRouter, Outlet, Navigate } from "react-router-dom";
import { useState } from "react";
import { isTokenExpired } from "./utils/auth";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminSubmissions from "./admin/AdminSubmissions";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import RecruitmentForm from "./pages/RecruitmentForm";

// 🌐 Main Layout
const Layout = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className={`transition-all duration-700 ${loading ? "opacity-0" : "opacity-100"}`}>
        <Navbar />
        <main><Outlet /></main>
        <Footer />
      </div>
      {loading && <Loader onFinish={() => setLoading(false)} />}
    </div>
  );
};

// 🔐 Protected Route
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token || isTokenExpired(token)) {
    localStorage.clear();
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "events", element: <Events /> },
      { path: "gallery", element: <Gallery /> },
      { path: "about", element: <About /> },
      { path: "recruitment", element: <RecruitmentForm /> },
    ],
  },

  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "submissions", element: <AdminSubmissions /> },
    ],
  },
]);

export default router;