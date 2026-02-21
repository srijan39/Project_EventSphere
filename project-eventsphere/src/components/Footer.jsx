import { NavLink } from "react-router-dom";
import { Github, Twitter, Instagram, Linkedin } from "lucide-react";

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-zinc-800 ">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold uppercase tracking-widest">
              VIBRANTA
            </h2>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
              A student-driven tech community focused on innovation,
              collaboration, and impactful campus experiences.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-zinc-300">
              Explore
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <NavLink to="/" className="hover:text-white transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="hover:text-white transition">
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className="hover:text-white transition">
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-white transition">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-zinc-300">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <NavLink to="/" className="hover:text-white transition">
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-white transition">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-white transition">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4 text-zinc-300">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <NavLink to="/" className="hover:text-white transition">
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-white transition">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-6 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} VIBRANTA. All rights reserved.
          </p>

          <div className="flex gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-zinc-400 hover:text-white transition duration-300"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;