import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CLUB_NAME, CLUB_LOGO, NAV_LINKS } from "../data/mockData";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleClick = (href) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#eadff0] bg-[#fcf8fb]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
          className="flex items-center gap-3"
        >
          {CLUB_LOGO ? (
            <img
              src={CLUB_LOGO}
              alt={CLUB_NAME}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8c3e8] bg-white text-sm font-semibold text-[#8a4fd1]">
              {CLUB_NAME?.[0]}
            </div>
          )}

          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#8a808f]">
              Event Club
            </p>
            <h2 className="text-[1.15rem] leading-none font-serif text-[#2b2230]">
              {CLUB_NAME}
            </h2>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="group relative text-[13px] uppercase tracking-[0.22em] text-[#6f6475] transition-colors duration-300 hover:text-[#8a4fd1]"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-[#8a4fd1] via-[#c061d8] to-[#ec4fa3] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-[#5a4266]"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[#eadff0] bg-[#fffdfd]"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className="text-[13px] uppercase tracking-[0.2em] text-[#6f6475] transition-colors hover:text-[#8a4fd1]"
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