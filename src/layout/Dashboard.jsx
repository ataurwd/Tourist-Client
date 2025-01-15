import React, { useState } from "react";
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



const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Dashboard */}
      <div
        className={`${
          isCollapsed ? "w-16" : "w-72 px-3"
        } bg-primary min-h-screen transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          className={`${
            isCollapsed ? "justify-center" : "justify-end"
          } flex items-center w-full p-4 text-white`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FiChevronRight  size={24}/> : <FiChevronLeft size={24}/>}
        </button>

        {/* Menu Items */}
        <div
          className={`w-full mx-auto ${
            isCollapsed ? "text-center" : "text-left"
          }`}
        >
          <div className="rounded-md p-4 bg-white my-2">
            <NavLink
              to={"tourist-profile"}
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "ml-5"}`
              }
            >
              <CgProfile className={`${isCollapsed ? '' : 'mr-3'}`} size={24} />
              {!isCollapsed && "Manage Profile"}
            </NavLink>
          </div>
          <div className="rounded-md p-4 bg-white my-2">
            <NavLink
              to={"tourist-bookings"}
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "ml-5"}`
              }
            >
              <TbCalendar className={`${isCollapsed ? '' : 'mr-3'}`} size={24} />
              {!isCollapsed && "My Bookings"}
            </NavLink>
          </div>
          <div className="rounded-md p-4 bg-white my-2">
            <NavLink
              to={"tourist-add-story"}
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "ml-5"}`
              }
            >
              <IoIosAddCircleOutline  className={`${isCollapsed ? '' : 'mr-3'}`} size={24} />
              {!isCollapsed && "Add Stories"}
            </NavLink>
          </div>
          <div className="rounded-md p-4 bg-white my-2">
            <NavLink
              to={"tourist-stories"}
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "ml-5"}`
              }
            >
              <MdHistoryToggleOff className={`${isCollapsed ? '' : 'mr-3'}`} size={24} />
              {!isCollapsed && "Manage Stories"}
            </NavLink>
          </div>
          <div className="rounded-md p-4 bg-white my-2">
            <NavLink
              to={"tourist-guild"}
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "ml-5"}`
              }
            >
              <IoPersonAddOutline  className={`${isCollapsed ? '' : 'mr-3'}`} size={24} />
              {!isCollapsed && "Join as tour guide"}
            </NavLink>
          </div>
          <div className="border-b-2 my-4"></div>
          <div className="rounded-md p-4 bg-white my-2">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `flex items-center ${
                  isActive ? "text-primary" : "text-black"
                } ${isCollapsed ? "justify-center" : "ml-5"}`
              }
            >
              <TbHome  className={`${isCollapsed ? '' : 'mr-3'}`} size={24} />
              {!isCollapsed && "Home"}
            </NavLink>
          </div>
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
