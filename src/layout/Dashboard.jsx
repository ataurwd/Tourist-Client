import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  TbHome,
  TbCalendar,
  TbCreditCard,
  TbShoppingCart,
} from "react-icons/tb";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdHistoryToggleOff } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import useUser from "../hooks/useUser";
import TouristMenu from "../dashboard/TouristD/TouristMenu";
import GuideMenu from "../dashboard/guide/GuideMenu";
import AdminMenu from "../dashboard/admin/AdminMenu";
import { ThemeContext } from "../context/Theme";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loginUser, isLoading] = useUser();
    const { theme, toggleTheme } = useContext(ThemeContext);
  
  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* Dashboard */}
      <div
        className={`${
          isCollapsed ? "md:w-16 w-10" : "md:w-72 w-20 px-3"
        } ${theme === "dark" ? "bg- border-r-2" : "bg-primary border-r-2 border-primary"} min-h-screen transition-all duration-300`}
      >
        <div className={`flex ${isCollapsed ? "flex-col" : ""}`}>
          {/* Toggle Button */}
          <button
            className={`${
              isCollapsed ? "justify-center" : "justify-end"
            } grid grid-cols-2  p-4 text-white hidden md:block`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <FiChevronRight size={24} />
            ) : (
              <FiChevronLeft size={24} />
            )}
          </button>
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
                className="fill-sky-400/20 stroke-white"
              ></path>
              <path
                d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                className="stroke-white"
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
        </div>

        {/* Menu Items for tourist */}
        {loginUser?.role == "tourist" ? (
          <div className={` ${isCollapsed ? "text-center mx-1" : "text-left"}`}>
            <TouristMenu isCollapsed={isCollapsed} />
          </div>
        ) : (
          ""
        )}

        {/* menu item for guide */}
        {loginUser?.role === "guide" ? (
          <div className={` ${isCollapsed ? "text-center mx-1" : "text-left"}`}>
            <GuideMenu isCollapsed={isCollapsed} />
          </div>
        ) : (
          ""
        )}
        {/* menu item for admin */}
        {loginUser?.role === "admin" ? (
          <div className={` ${isCollapsed ? "text-center mx-1" : "text-left"}`}>
            <AdminMenu isCollapsed={isCollapsed}></AdminMenu>
          </div>
        ) : (
          ""
        )}

        {/* back to home route everyone can see this */}
        <div className="border-b-2 my-4"></div>
        <div
          className={`rounded-md p-4 bg-white my-2 ${
            isCollapsed ? "mx-1" : ""
          }`}
        >
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center ${isActive ? "text-primary" : "text-black"} ${
                isCollapsed ? "justify-center" : "md:ml-5"
              }`
            }
          >
            <TbHome className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
            <span className="hidden sm:inline">{!isCollapsed && "Home"}</span>
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
