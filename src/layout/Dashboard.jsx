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
import useUser from "../hooks/useUser";
import TouristMenu from "../dashboard/TouristD/TouristMenu";
import GuideMenu from "../dashboard/guide/GuideMenu";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loginUser] = useUser();

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
          {isCollapsed ? (
            <FiChevronRight size={24} />
          ) : (
            <FiChevronLeft size={24} />
          )}
        </button>

        {/* Menu Items for tourist */}
        {loginUser?.role == "tourist" ? (
          <div className={` ${isCollapsed ? "text-center mx-1" : "text-left"}`}>
            <TouristMenu isCollapsed={ isCollapsed} />
          </div>
        ) : (
          ""
        )}

        {/* menu item for guide */}
        {loginUser?.role === "guide" ? (
          <>
           <GuideMenu isCollapsed={isCollapsed}/>
          </>
        ) : (
          ""
        )}

        {/* back to home route everyone can see this */}
        <div className="border-b-2 my-4"></div>
        <div className="rounded-md p-4 bg-white my-2">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `flex items-center ${isActive ? "text-primary" : "text-black"} ${
                isCollapsed ? "justify-center" : "ml-5"
              }`
            }
          >
            <TbHome className={`${isCollapsed ? "" : "mr-3"}`} size={24} />
            {!isCollapsed && "Home"}
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
