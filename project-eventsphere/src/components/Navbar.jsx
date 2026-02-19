import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CLUB_NAME, CLUB_LOGO, NAV_LINKS } from "../data/mockData";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/70 backdrop-blur-md py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
          className="flex items-center gap-2"
        >
          {/* <img src={CLUB_LOGO} alt={CLUB_NAME} className="h-10 w-10" /> */}
          <span className="text-2xl font-bold text-white">{CLUB_NAME}</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="relative font-medium text-sm text-white hover:text-gray-300 transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/80 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col items-start gap-4 py-6 pl-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className="text-lg font-medium text-white hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
