import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";
import useUser from "../hooks/useUser";
import { ThemeContext } from './../context/Theme';

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loginUser] = useUser();

  const signOut = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className={`navbar sticky top-0 left-0 w-full z-50 bg-gray-800 shadow-md text-gray-400 md:px-20`}>
      {/* Navbar Start */}
      <div className="navbar-start flex items-center">
        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="btn btn-ghost lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-8 6h8"
            />
          </svg>
        </button>
        {/* Logo and Website Name */}
        <Link
          to="/"
          className="font-semibold text-xl flex items-center text-white"
        >
          Treva
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5 text-[17px] font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            Community
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            About Us
          </NavLink>
          {user ? (
            <>
              {" "}
              <NavLink
                to="/trips"
                className={({ isActive }) =>
                  isActive ? "text-primary" : "text-white"
                }
              >
                Trips
              </NavLink>
            </>
          ) : (
            ""
          )}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            Contact Us
          </NavLink>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">

      <button
          onClick={toggleTheme}
          className={`px-4 py-2 text-sm font-bold transition duration-300 rounded-md ${
            theme === "light" ? "text-white" : "text-white bg-themeDatak"
          }`}
        >
          {theme === "light" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                className="fill-sky-400/20 stroke-primary"
              ></path>
              <path
                d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                className="stroke-primary"
              ></path>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                className="fill-sky-400/20"
              ></path>
              <path
                d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                className="fill-white"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                className="fill-white"
              ></path>
            </svg>
          )}
        </button>
        {user ? (
          <div className="relative group">
            <img
              src={user?.photoURL || "/default-profile.png"}
              className="rounded-full w-10 h-10 cursor-pointer object-cover"
              alt="User"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-12 right-0 md:-left-20 flex flex-col gap-2 w-48 bg-white p-3 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <h3 className="text-sm font-semibold">{user?.displayName}</h3>
              <p className="text-xs text-gray-600">{user?.email}</p>
              <Link
                to={`${
                  loginUser.role === "admin"
                    ? "/dashboard/admin-profile"
                    : loginUser.role === "guide"
                    ? "/dashboard/guide-profile"
                    : "/dashboard/tourist-profile"
                }`}
                className={"text-black"}
              >
                Dashboard
              </Link>
              <Link
                to="/offer-announcements"
                className="text-sm text-black hover:text-gray-700"
              >
                Offer Announcements
              </Link>
              <button
                onClick={signOut}
                className="text-sm text-white bg-primary py-1 rounded-sm hover:bg-danger"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-5 font-bold text-white py-1 rounded-md bg-primary">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-5 font-bold text-white py-1 rounded-md bg-primary hidden md:block">
                Register
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 -md:right-16 w-full bg-white shadow-lg lg:hidden">
          <ul className="menu menu-vertical px-5 py-3 space-y-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-black"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/community"
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-black"
              }
            >
              Community
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-black"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/trips"
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-black"
              }
            >
              Trips
            </NavLink>
            <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            Contact Us
          </NavLink>
            {user && (
              <>
                <Link
                  to={`${
                    loginUser.role === "admin"
                      ? "/dashboard/admin-profile"
                      : loginUser.role === "guide"
                      ? "/dashboard/guide-profile"
                      : "/dashboard/tourist-profile"
                  }`}
                  className={"text-gray-400"}
                >
                  Dashboard
                </Link>
                <NavLink
                  to="/offer-announcements"
                  className={({ isActive }) =>
                    isActive ? "text-gray-400" : "text-black"
                  }
                >
                  Offer Announcements
                </NavLink>
                <button
                  onClick={signOut}
                  className="text-red-500 text-sm hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBer;
