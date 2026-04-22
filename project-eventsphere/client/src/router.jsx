import { createBrowserRouter, Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import RecruitmentForm from "./pages/RecruitmentForm"; // ✅ NEW

const Layout = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* Main Website */}
      <div
        className={`transition-all duration-700 ${
          loading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      >
        <Navbar />

        <main>
          <Outlet />
        </main>

        <Footer />
      </div>

      {/* Loader Overlay */}
      {loading && <Loader onFinish={() => setLoading(false)} />}
    </div>
  );
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

      // ✅ Recruitment Form Route
      { path: "recruitment", element: <RecruitmentForm /> },
    ],
  },
]);

export default router;