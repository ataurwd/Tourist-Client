import React from "react";
import { CgProfile } from "react-icons/cg";
import { GoTasklist } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdHistoryToggleOff } from "react-icons/md";
import { TbHome } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";



const AdminMenu = ({ isCollapsed }) => {
  return (
    <div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-profile"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "ml-5"
            }`
          }
        >
          <TbHome className={`${isCollapsed ? "" : "mr-3"}`} size={24} />
          {!isCollapsed && "Admin Profile"}
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-assigned"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "ml-5"
            }`
          }
        >
          <GoTasklist className={`${isCollapsed ? "" : "mr-3"}`} size={24} />
          {!isCollapsed && "My Assigned Tours"}
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-add-story"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "ml-5"
            }`
          }
        >
          <IoIosAddCircleOutline
            className={`${isCollapsed ? "" : "mr-3"}`}
            size={24}
          />
          {!isCollapsed && "Add Stories"}
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-story"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "ml-5"
            }`
          }
        >
          <MdHistoryToggleOff
            className={`${isCollapsed ? "" : "mr-3"}`}
            size={24}
          />
          {!isCollapsed && "Manage Stories"}
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-add-package"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "ml-5"
            }`
          }
        >
          <MdAddTask
            className={`${isCollapsed ? "" : "mr-3"}`}
            size={24}
          />
          {!isCollapsed && "Add Package"}
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-manage-user"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "ml-5"
            }`
          }
        >
          <RiProfileLine
            className={`${isCollapsed ? "" : "mr-3"}`}
            size={24}
          />
          {!isCollapsed && "Manage Users"}
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-manage-candidate"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "ml-5"
            }`
          }
        >
          <CgProfile
            className={`${isCollapsed ? "" : "mr-3"}`}
            size={24}
          />
          {!isCollapsed && "Manage Candidates"}
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
