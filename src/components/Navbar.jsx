import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const navigate = useNavigate();

  const signOut = () => {
    logoutUser();
    navigate("/login");
  };
  return (
<div
  className="navbar sticky top-0 left-0 w-full z-50 md:px-20 bg-secondary shadow-md text-black"
>
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="z-50 menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow bg-white"
      >
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-gray-400 " : "text-black"
          }
        >
          Home
        </NavLink>
        {/* {user ? (
          <> */}
            <NavLink
              to={"/add-visa"}
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-black"
              }
            >
              Add Visa
            </NavLink>
            <NavLink
              to={"/my-added-visa"}
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-black"
              }
            >
              My added visas
            </NavLink>
            <NavLink
              to={"/my-visa-application"}
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-black"
              }
            >
              My Visa applications
            </NavLink>
          {/* </>
        ) : (
          <></> */}
        {/* )} */}
        <NavLink
          to={"/Contact"}
          className={({ isActive }) =>
            isActive ? "text-gray-400 " : "text-black"
          }
        >
          Contact
        </NavLink>
      </ul>
    </div>
    <Link to={"/"} className="font-semibold text-xl">
      VisaGo
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 space-x-5 text-[17px] font-medium">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "text-gray-400" : "text-black"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/all-visa"}
        className={({ isActive }) =>
          isActive ? "text-gray-400" : "text-black"
        }
      >
        All Visas
      </NavLink>
      {/* {user ? (
        <> */}
          <NavLink
            to={"/add-visa"}
            className={({ isActive }) =>
              isActive ? "text-gray-400" : "text-black"
            }
          >
            Add Visa
          </NavLink>
          <NavLink
            to={"/my-added-visa"}
            className={({ isActive }) =>
              isActive ? "text-gray-400" : "text-black"
            }
          >
            My added visas
          </NavLink>
          <NavLink
            to={"/my-visa-application"}
            className={({ isActive }) =>
              isActive ? "text-gray-400" : "text-black"
            }
          >
            My Visa applications
          </NavLink>
        {/* </>
      ) : (
        <></>
      )} */}
      <NavLink
        to={"/contact"}
        className={({ isActive }) =>
          isActive ? "text-gray-400" : "text-black"
        }
      >
        Contact
      </NavLink>
    </ul>
  </div>
  <div className="navbar-end flex items-center space-x-4">
    {user ? (
      <div className="relative group">
        <img
          src={user?.photoURL}
          className="rounded-full w-10 h-10 cursor-pointer"
          alt="User"
        />
        <div className="absolute top-12 md:-left-10 -left-28 flex flex-col items-center gap-2 w-40 bg-white p-3 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <h3 className="text-sm font-semibold">{user?.displayName}</h3>
          <button
            onClick={signOut}
            className="px-3 py-1  text-white rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    ) : (
      <>
        <Link to={"/login"}>
          <button className="px-5  font-bold text-white py-1 rounded-md">
            Login
          </button>
        </Link>
        <Link to={"/register"}>
          <button className="hidden lg:block md:block px-5  font-bold text-white py-1 rounded-md">
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