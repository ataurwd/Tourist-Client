import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";
import useUser from "../hooks/useUser";
import { ThemeContext } from './../context/Theme';
import { HiMenuAlt3, HiX, HiSun, HiMoon } from "react-icons/hi";

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [loginUser] = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const signOut = () => {
    logoutUser();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Community", path: "/community" },
    { name: "About Us", path: "/about-us" },
    ...(user ? [{ name: "Trips", path: "/trips" }] : []),
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-slate-100 dark:border-slate-800/50 py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-lg shadow-premium">
                T
              </span>
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-800 dark:text-white transition-colors group-hover:text-primary">
                Treva
              </span>
            </Link>
          </div>

          {/* Desktop NavLinks */}
          <div className="hidden lg:flex items-center space-x-8">
{navLinks.map((link) => (
  <NavLink
    key={link.path}
    to={link.path}
    className={({ isActive }) =>
      `text-sm font-semibold tracking-wide transition-all duration-200 hover:text-primary ${
        isActive
          ? "text-primary active-nav-link"
          : isScrolled
          ? "text-black dark:text-slate-300"
          : "text-slate-400 dark:text-slate-400"
      }`
    }
  >
    {link.name}
  </NavLink>
))}
          </div>

          {/* Action Buttons & Theme Switcher */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-400 transition-colors border border-slate-200/50 dark:border-slate-700/40"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <HiMoon className="h-5 w-5 text-slate-700" />
              ) : (
                <HiSun className="h-5 w-5 text-amber-400" />
              )}
            </button>

            {/* Profile / Auth Trigger */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all">
                  <img
                    src={user?.photoURL || "/default-profile.png"}
                    className="rounded-lg w-8 h-8 object-cover border border-slate-200 dark:border-slate-700"
                    alt="User profile"
                    referrerPolicy="no-referrer"
                  />
                  <span className={`text-xs font-semibold text-black dark:text-slate-300 max-w-[100px] truncate pr-1 ${isScrolled ? "text-black" : "text-white"}`}>
                    {user?.displayName?.split(" ")[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-12 right-0 w-52 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 rounded-2xl shadow-2xl p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700/50 mb-1.5">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {user?.displayName}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to={
                      loginUser?.role === "admin"
                        ? "/dashboard/admin-profile"
                        : loginUser?.role === "guide"
                        ? "/dashboard/guide-profile"
                        : "/dashboard/tourist-profile"
                    }
                    className="flex items-center px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/offer-announcements"
                    className="flex items-center px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary rounded-xl transition-colors"
                  >
                    Announcements
                  </Link>
                  <div className="border-t border-slate-100 dark:border-slate-700/50 my-1.5"></div>
                  <button
                    onClick={signOut}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-premium transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon & Actions */}
          <div className="flex items-center lg:hidden gap-3">
            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <HiMoon className="h-5 w-5 text-slate-700" />
              ) : (
                <HiSun className="h-5 w-5 text-amber-400" />
              )}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Slide down) */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-2xl p-5 lg:hidden animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-bold transition-colors ${
                    isActive ? "text-primary" : "text-slate-700 dark:text-slate-300"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {user && (
              <>
                <Link
                  to={
                    loginUser?.role === "admin"
                      ? "/dashboard/admin-profile"
                      : loginUser?.role === "guide"
                      ? "/dashboard/guide-profile"
                      : "/dashboard/tourist-profile"
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/offer-announcements"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                >
                  Offer Announcements
                </Link>
              </>
            )}

            <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

            {user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOut();
                }}
                className="w-full text-center py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl shadow-premium transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBer;
