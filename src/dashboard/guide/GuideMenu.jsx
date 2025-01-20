import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdHistoryToggleOff } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { GoTasklist } from "react-icons/go";

const GuideMenu = ({ isCollapsed }) => {
  return (
    <div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"guide-profile"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <CgProfile className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
          <span className="hidden sm:inline">
            {!isCollapsed && "Manage Profile"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"guide-assigned"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <GoTasklist className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
          <span className="hidden sm:inline">
            {" "}
            {!isCollapsed && "My Assigned Tours"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"guide-add-story"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <IoIosAddCircleOutline
            className={`${isCollapsed ? "" : "md:mr-3"}`}
            size={24}
          />
          <span className="hidden sm:inline">
            {" "}
            {!isCollapsed && "Add Stories"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"guide-manage-story"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <MdHistoryToggleOff
            className={`${isCollapsed ? "" : "md:mr-3"}`}
            size={24}
          />
          <span className="hidden sm:inline">
            {" "}
            {!isCollapsed && "Manage Stories"}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default GuideMenu;
