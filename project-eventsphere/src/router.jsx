import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import About from "./pages/About";

/* Layout Component */
const Layout = () => {
  return (
    <>
      <Navbar />

      {/* No pt-20 here */}
      <main className="min-h-screen bg-black text-white">
        <Outlet />
      </main>

      <Footer />
    </>
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
    ],
  },
]);

export default router;