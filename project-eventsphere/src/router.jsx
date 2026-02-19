import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-black text-white px-6">
          <Home />
        </div>
        <Footer />
      </>
    ),
  },
  {
    path: "/events",
    element: (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-black text-white px-6">
          <Events />
        </div>
        <Footer />
      </>
    ),
  },
  {
    path: "/gallery",
    element: (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen bg-black text-white px-6">
          <Gallery />
        </div>
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <div className="pt-20 min-h-screen ">
          <About />
        </div>
        <Footer />
      </>
    ),
  },
]);

export default router;
