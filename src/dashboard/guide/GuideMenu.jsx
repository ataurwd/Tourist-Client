import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdHistoryToggleOff } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { GoTasklist } from "react-icons/go";
import { FiMessageSquare, FiBookOpen, FiPackage, FiChevronDown, FiChevronUp } from "react-icons/fi";

const GuideMenu = ({ isCollapsed }) => {
  const location = useLocation();

  // Active status triggers based on paths
  const isStoriesActive = location.pathname.includes("guide-add-story") || location.pathname.includes("guide-manage-story");
  const isPackagesActive = location.pathname.includes("guide-manage-packages") || location.pathname.includes("guide-add-package") || location.pathname.includes("guide-package-bookings");

  const [storiesOpen, setStoriesOpen] = useState(isStoriesActive);
  const [packagesOpen, setPackagesOpen] = useState(isPackagesActive);

  // Auto-expand submenus when navigation lands on a child route
  useEffect(() => {
    if (isStoriesActive) setStoriesOpen(true);
  }, [isStoriesActive]);

  useEffect(() => {
    if (isPackagesActive) setPackagesOpen(true);
  }, [isPackagesActive]);

  const flatItemsBefore = [
    { to: "guide-profile", icon: CgProfile, label: "Manage Profile" },
    { to: "guide-assigned", icon: GoTasklist, label: "Assigned Tours" },
  ];

  const flatItemsAfter = [
    { to: "messages", icon: FiMessageSquare, label: "Messages" },
  ];

  const storyChildren = [
    { to: "guide-manage-story", icon: MdHistoryToggleOff, label: "Manage Stories" },
    { to: "guide-add-story", icon: IoIosAddCircleOutline, label: "Add Stories" },
  ];

  const packageChildren = [
    { to: "guide-manage-packages", icon: FiPackage, label: "My Packages" },
    { to: "guide-add-package", icon: IoIosAddCircleOutline, label: "Add Package" },
    { to: "guide-package-bookings", icon: GoTasklist, label: "Package Bookings" },
  ];

  const renderFlatLink = (item) => (
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
  );

  const renderSubMenu = (label, Icon, isOpen, setIsOpen, children, isActive) => (
    <div className="space-y-1">
      {/* Parent Menu Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
          isActive
            ? "bg-slate-800/80 text-white"
            : "text-slate-400 hover:bg-slate-800/40 hover:text-white"
        } ${isCollapsed ? "justify-center" : ""}`}
        title={isCollapsed ? label : ""}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="truncate">{label}</span>}
        </div>
        {!isCollapsed && (
          <div className="text-slate-500">
            {isOpen ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
          </div>
        )}
      </button>

      {/* Submenu Children Tree */}
      {isOpen && (
        <div className={`space-y-1.5 transition-all duration-200 ${isCollapsed ? "py-1 bg-slate-900/40 rounded-xl" : "pl-4 border-l border-slate-800/80 ml-6"}`}>
          {children.map((child) => (
            <NavLink
              key={child.to}
              to={child.to}
              className={({ isActive: isChildActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  isChildActive
                    ? "bg-primary text-white shadow-premium"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                } ${isCollapsed ? "justify-center" : ""}`
              }
              title={isCollapsed ? child.label : ""}
            >
              <child.icon className={`flex-shrink-0 ${isCollapsed ? "h-4.5 w-4.5" : "h-4 w-4"}`} />
              {!isCollapsed && <span className="truncate">{child.label}</span>}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Main Profile Links */}
      <div className="space-y-1">
        {flatItemsBefore.map(renderFlatLink)}
      </div>

      {/* Stories Submenu */}
      {renderSubMenu("Stories", FiBookOpen, storiesOpen, setStoriesOpen, storyChildren, isStoriesActive)}

      {/* Packages Submenu */}
      {renderSubMenu("Tour Packages", FiPackage, packagesOpen, setPackagesOpen, packageChildren, isPackagesActive)}

      {/* Messages */}
      <div className="space-y-1">
        {flatItemsAfter.map(renderFlatLink)}
      </div>
    </div>
  );
};

export default GuideMenu;
