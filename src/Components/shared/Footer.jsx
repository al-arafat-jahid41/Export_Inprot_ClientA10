import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { NavLink } from "react-router";

const Footer = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to="/all-products" className="hover:text-white">
          All Products
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-exports" className="hover:text-white">
          My Exports
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-imports" className="hover:text-white">
          My Imports
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-product" className="hover:text-white">
          Add Export
        </NavLink>
      </li>
    </>
  );

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            ImportExportHub
          </h2>
          <p className="text-sm leading-relaxed">
            A modern platform to manage exports, explore global products,
            and import items securely with real-time updates.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {navLinks}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@importexporthub.com</li>
            <li>Phone: +880 1234 567 890</li>
            <li>Location: Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white"><FaFacebook /></a>
            <a href="#" className="hover:text-white"><IoLogoLinkedin /></a>
            <a href="#" className="hover:text-white"><RiTwitterXLine /></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm">
        © {new Date().getFullYear()} ImportExportHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
