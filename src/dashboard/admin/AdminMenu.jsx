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
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <TbHome className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
          <span className="hidden sm:inline">
            {!isCollapsed && "Admin Profile"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-assigned"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <GoTasklist className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />

          <span className="hidden sm:inline">
            {!isCollapsed && "My Assigned Tours"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-add-story"}
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
            {!isCollapsed && "Add Stories"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-story"}
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
            {!isCollapsed && "Manage Stories"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-add-package"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <MdAddTask className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
          <span className="hidden sm:inline">
            {!isCollapsed && "Add Package"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-manage-user"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <RiProfileLine className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />
          <span className="hidden sm:inline">
            {!isCollapsed && "Manage Users"}
          </span>
        </NavLink>
      </div>
      <div className="rounded-md p-4 bg-white my-2">
        <NavLink
          to={"admin-manage-candidate"}
          className={({ isActive }) =>
            `flex items-center ${isActive ? "text-primary" : "text-black"} ${
              isCollapsed ? "justify-center" : "md:ml-5"
            }`
          }
        >
          <CgProfile className={`${isCollapsed ? "" : "md:mr-3"}`} size={24} />

          <span className="hidden sm:inline">
            {" "}
            {!isCollapsed && "Manage Candidates"}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
