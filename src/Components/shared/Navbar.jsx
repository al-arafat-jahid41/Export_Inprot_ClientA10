import { Link, NavLink } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { ThemeContext } from "../../Context/ThemeContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  // export const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") || "light",
  // );

  // useEffect(() => {
  //   const html = document.querySelector("html");
  //   html.setAttribute("data-theme", theme);
  //   localStorage.setItem("theme", theme);
  // }, [theme]);

  const handleTheme = (checked) => {
    console.log("Theme click", checked);
    setTheme(checked ? "dark" : "light");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 transition";

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={navLinkClass}
        onClick={() => setShowMobileNav(false)}
      >
        Home
      </NavLink>
      <NavLink
        to="/all-products"
        className={navLinkClass}
        onClick={() => setShowMobileNav(false)}
      >
        All Products
      </NavLink>
      <NavLink
        to="/my-exports"
        className={navLinkClass}
        onClick={() => setShowMobileNav(false)}
      >
        My Exports
      </NavLink>
      <NavLink
        to="/my-imports"
        className={navLinkClass}
        onClick={() => setShowMobileNav(false)}
      >
        My Imports
      </NavLink>
      <NavLink
        to="/add-product"
        className={navLinkClass}
        onClick={() => setShowMobileNav(false)}
      >
        Add Export
      </NavLink>
    </>
  );

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        setShowMenu(false);
        setShowMobileNav(false);
      })
      .catch(console.error);
  };

  return (
    <nav className="bg-white  dark:bg-gray-900 shadow-md px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ImportExportHub
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 font-medium">{navLinks}</div>
        <label className="flex cursor-pointer gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            checked={theme === "dark"}
            value="synthwave"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Auth Section */}
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/2kR5zq0/user.png"}
                alt="User profile"
                title={user.displayName || "User"}
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full border cursor-pointer object-cover"
              />

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-whit dark:bg-gray-900 border dark:bg-gray-80 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {user.displayName || "Anonymous User"}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileNav && (
        <div className="md:hidden mt-4 flex flex-col gap-4 font-medium border-t pt-4">
          {navLinks}

          {!user && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                onClick={() => setShowMobileNav(false)}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setShowMobileNav(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
