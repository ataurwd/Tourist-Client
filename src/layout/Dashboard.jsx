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
import AdminMenu from "../dashboard/admin/AdminMenu";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loginUser, isLoading] = useUser();
  // if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      {/* Dashboard */}
      <div
        className={`${
          isCollapsed ? "md:w-16 w-10" : "md:w-72 w-20 px-3"
        } bg-primary min-h-screen transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          className={`${
            isCollapsed ? "justify-center" : "justify-end"
          } grid grid-cols-2 w-full p-4 text-white hidden md:block`}
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
          <div className={` ${isCollapsed ? "text-center mx-1" : "text-left"}`}>
           <GuideMenu isCollapsed={isCollapsed}/>
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
        {/* <div className={`rounded-md p-4 bg-white my-2 ${isCollapsed ? 'mx-1' : ''}`}>
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
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
