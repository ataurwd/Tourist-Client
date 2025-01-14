import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 left-0 w-full z-50 bg-secondary shadow-md text-black">
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
        <Link to="/" className="font-semibold text-xl flex items-center">
          WebsiteName
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5 text-[17px] font-medium">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "text-black")}>
            Home
          </NavLink>
          <NavLink to="/community" className={({ isActive }) => (isActive ? "text-primary" : "text-black")}>
            Community
          </NavLink>
          <NavLink to="/about-us" className={({ isActive }) => (isActive ? "text-primary" : "text-black")}>
            About Us
          </NavLink>
          <NavLink to="/trips" className={({ isActive }) => (isActive ? "text-primary" : "text-black")}>
            Trips
          </NavLink>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <img
              src={user?.photoURL || "/default-profile.png"}
              className="rounded-full w-10 h-10 cursor-pointer"
              alt="User"
            />
            <div className="absolute top-12 right-0 flex flex-col gap-2 w-48 bg-white p-3 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <h3 className="text-sm font-semibold">{user?.displayName}</h3>
              <p className="text-xs text-gray-600">{user?.email}</p>
              <Link to="/dashboard" className="text-sm text-black hover:text-gray-700">
                Dashboard
              </Link>
              <Link to="/offer-announcements" className="text-sm text-black hover:text-gray-700">
                Offer Announcements
              </Link>
              <button onClick={signOut} className="text-sm text-white bg-primary py-1 rounded-sm hover:bg-danger">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-5 font-bold text-white py-1 rounded-md bg-primary">Login</button>
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
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden">
          <ul className="menu menu-vertical px-5 py-3 space-y-3">
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}>
              Home
            </NavLink>
            <NavLink to="/community" className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}>
              Community
            </NavLink>
            <NavLink to="/about-us" className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}>
              About Us
            </NavLink>
            <NavLink to="/trips" className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}>
              Trips
            </NavLink>
            {user && (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}>
                  Dashboard
                </NavLink>
                <NavLink
                  to="/offer-announcements"
                  className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}
                >
                  Offer Announcements
                </NavLink>
                <button onClick={signOut} className="text-red-500 text-sm hover:underline">
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
