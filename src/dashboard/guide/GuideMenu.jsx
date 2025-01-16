import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdHistoryToggleOff } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { GoTasklist } from "react-icons/go";

const GuideMenu = ({isCollapsed}) => {
    return (
        <div>
             <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"guide-profile"}
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
                to={"guide-assigned"}
                className={({ isActive }) =>
                  `flex items-center ${
                    isActive ? "text-primary" : "text-black"
                  } ${isCollapsed ? "justify-center" : "ml-5"}`
                }
              >
                <GoTasklist
                  className={`${isCollapsed ? "" : "mr-3"}`}
                  size={24}
                />
                {!isCollapsed && "My Assigned Tours"}
              </NavLink>
            </div>
            <div className="rounded-md p-4 bg-white my-2">
              <NavLink
                to={"guide-add-story"}
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
                to={"guide-manage-story"}
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
        </div>
    );
};

export default GuideMenu;