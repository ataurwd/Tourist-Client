import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    TbCalendar,
  } from "react-icons/tb";
  import { CgProfile } from "react-icons/cg";
  import { MdHistoryToggleOff } from "react-icons/md";
  import { IoPersonAddOutline } from "react-icons/io5";
  import { IoIosAddCircleOutline } from "react-icons/io";

const TouristMenu = ({isCollapsed}) => {
    return (
        <div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"tourist-profile"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "ml-5"}`
                }
              >
                <CgProfile
                  className={`${isCollapsed ? "" : "mr-3"}`}
                  size={24}
                />
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
                <TbCalendar
                  className={`${isCollapsed ? "" : "mr-3"}`}
                  size={24}
                />
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
                <IoIosAddCircleOutline
                  className={`${isCollapsed ? "" : "mr-3"}`}
                  size={24}
                />
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
                <MdHistoryToggleOff
                  className={`${isCollapsed ? "" : "mr-3"}`}
                  size={24}
                />
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
                <IoPersonAddOutline
                  className={`${isCollapsed ? "" : "mr-3"}`}
                  size={24}
                />
                {!isCollapsed && "Join as tour guide"}
              </NavLink>
            </div>
        </div>
    );
};

export default TouristMenu;