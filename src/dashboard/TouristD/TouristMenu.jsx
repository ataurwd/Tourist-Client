import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    TbCalendar,
  } from "react-icons/tb";
  import { CgProfile } from "react-icons/cg";
  import { MdHistoryToggleOff } from "react-icons/md";
  import { IoPersonAddOutline } from "react-icons/io5";
  import { IoIosAddCircleOutline } from "react-icons/io";
import { FiPieChart } from 'react-icons/fi';

const TouristMenu = ({isCollapsed}) => {
    return (
        <div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"tourist-profile"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "md:ml-5"}`
                }
              >
                <CgProfile
                  className={`${isCollapsed ? "" : "md:mr-3"}`}
                  size={24}
                />
                <span className="hidden sm:inline">{!isCollapsed && "Manage Profile"}</span>
              </NavLink>
            </div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"tourist-overview"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "md:ml-5"}`
                }
              >
                <FiPieChart
                  className={`${isCollapsed ? "" : "md:mr-3"}`}
                  size={24}
                />
                <span className="hidden sm:inline">{!isCollapsed && "Overview"}</span>
              </NavLink>
            </div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"tourist-bookings"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "md:ml-5"}`
                }
              >
                <TbCalendar
                  className={`${isCollapsed ? "" : "md:mr-3"}`}
                  size={24}
                />
                <span className="hidden sm:inline">{!isCollapsed && "My Bookings"}</span>
              </NavLink>
            </div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"tourist-add-story"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "md:ml-5"}`
                }
              >
                <IoIosAddCircleOutline
                  className={`${isCollapsed ? "" : "md:mr-3"}`}
                  size={24}
                />
                <span className="hidden sm:inline">{!isCollapsed && "Add Stories"}</span>
              </NavLink>
            </div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"tourist-stories"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "md:ml-5"}`
                }
              >
                <MdHistoryToggleOff
                  className={`${isCollapsed ? "" : "md:mr-3"}`}
                  size={24}
                />
                <span className="hidden sm:inline">{!isCollapsed && "Manage Stories"}</span>
              </NavLink>
            </div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"tourist-guild"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "md:ml-5"}`
                }
              >
                <IoPersonAddOutline
                  className={`${isCollapsed ? "" : "md:mr-3"}`}
                  size={24}
                />
                <span className="hidden sm:inline">{!isCollapsed && "Join as tour guide"}</span>
              </NavLink>
            </div>
        </div>
    );
};

export default TouristMenu;