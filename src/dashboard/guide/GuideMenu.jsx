import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdHistoryToggleOff } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { GoTasklist } from "react-icons/go";

const GuideMenu = ({ isCollapsed }) => {
  const items = [
    { to: "guide-profile", icon: CgProfile, label: "Manage Profile" },
    { to: "guide-assigned", icon: GoTasklist, label: "Assigned Tours" },
    { to: "guide-add-story", icon: IoIosAddCircleOutline, label: "Add Stories" },
    { to: "guide-manage-story", icon: MdHistoryToggleOff, label: "Manage Stories" }
  ];

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-primary/10 text-primary border-l-2 border-primary"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
            } ${isCollapsed ? "justify-center" : ""}`
          }
          title={isCollapsed ? item.label : ""}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="truncate">{item.label}</span>}
        </NavLink>
      ))}
    </div>
  );
};

export default GuideMenu;
