import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const navigate = useNavigate();

  const signOut = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 left-0 w-full z-50 px-4 md:px-20 bg-secondary shadow-md text-black">
      {/* Logo and Website Name */}
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold flex items-center">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="w-8 h-8 mr-2"
          />
          VisaGo
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5 text-[17px] font-medium">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}
          >
            Home
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}
          >
            Community
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}
          >
            About Us
          </NavLink>
          <NavLink
            to="/trips"
            className={({ isActive }) => (isActive ? "text-gray-400" : "text-black")}
          >
            Trips
          </NavLink>
        </ul>
      </div>

      {/* User Section */}
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <div className="relative group">
            <img
              src={user.photoURL || "/default-profile.png"} // Replace with your default profile image path
              alt="User"
              className="rounded-full w-10 h-10 cursor-pointer"
            />
            <div className="absolute top-12 right-0 md:-right-10 bg-white shadow-lg rounded-md p-3 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <p className="text-sm font-semibold mb-1">{user.displayName}</p>
              <p className="text-xs text-gray-500 mb-3">{user.email}</p>
              <NavLink
                to="/dashboard"
                className="block text-black hover:bg-gray-100 px-3 py-1 rounded-md"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/offer-announcements"
                className="block text-black hover:bg-gray-100 px-3 py-1 rounded-md"
              >
                Offer Announcements
              </NavLink>
              <button
                onClick={signOut}
                className="mt-2 w-full text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="px-5 font-bold text-white py-1 bg-primary rounded-md">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="hidden lg:block px-5 font-bold text-white py-1 bg-primary rounded-md">
                Register
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBer;
