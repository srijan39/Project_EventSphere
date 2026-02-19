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
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold uppercase tracking-widest">
              VIBRANTA
            </h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              {/* Here the title of the club */}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4">
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <NavLink to="/home" className="hover:text-black transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="hover:text-black transition">
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className="hover:text-black transition">
                  Gallery
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-black transition">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <NavLink to="/" className="hover:text-black transition">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-black transition">
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-black transition">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-black transition">
                  Terms & Conditions
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <NavLink to="/" className="hover:text-black transition">
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-black transition">
                  Shipping & Returns
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="hover:text-black transition">
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} VIBRANTA . All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:glow-purple transition-all duration-300"
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