import React from "react";
import { CgProfile } from "react-icons/cg";
import { GoTasklist } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdHistoryToggleOff } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdAddTask } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { FiPieChart } from "react-icons/fi";

const AdminMenu = ({ isCollapsed }) => {
  const items = [
    { to: "admin-profile", icon: CgProfile, label: "Admin Profile" },
    { to: "overview", icon: FiPieChart, label: "Overview" },
    { to: "admin-assigned", icon: GoTasklist, label: "Assigned Tours" },
    { to: "admin-add-story", icon: IoIosAddCircleOutline, label: "Add Stories" },
    { to: "admin-story", icon: MdHistoryToggleOff, label: "Manage Stories" },
    { to: "admin-add-package", icon: MdAddTask, label: "Add Package" },
    { to: "admin-manage-user", icon: RiProfileLine, label: "Manage Users" },
    { to: "admin-manage-candidate", icon: CgProfile, label: "Manage Candidates" }
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

export default AdminMenu;
