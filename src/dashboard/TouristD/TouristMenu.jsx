import { FiPieChart, FiUser } from 'react-icons/fi';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdHistoryToggleOff } from "react-icons/md";
import { TbCalendar } from "react-icons/tb";
import { NavLink } from 'react-router-dom';

const TouristMenu = ({ isCollapsed }) => {
  const items = [
    { to: "tourist-profile", icon: FiUser, label: "Manage Profile" },
    { to: "tourist-overview", icon: FiPieChart, label: "Overview" },
    { to: "tourist-bookings", icon: TbCalendar, label: "My Bookings" },
    { to: "tourist-add-story", icon: IoIosAddCircleOutline, label: "Add Stories" },
    { to: "tourist-stories", icon: MdHistoryToggleOff, label: "Manage Stories" },
    { to: "tourist-guild", icon: IoPersonAddOutline, label: "Join as Guide" }
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

export default TouristMenu;