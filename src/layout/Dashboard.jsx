import React, { useContext, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMenu, FiX } from "react-icons/fi";
import { TbHome } from "react-icons/tb";
import { NavLink, Outlet, Link } from "react-router-dom";
import { ThemeContext } from "../context/Theme";
import { FormContext } from "../context/FormData";
import TouristMenu from "../dashboard/TouristD/TouristMenu";
import AdminMenu from "../dashboard/admin/AdminMenu";
import GuideMenu from "../dashboard/guide/GuideMenu";
import useUser from "../hooks/useUser";
import { HiSun, HiMoon } from "react-icons/hi";
import { Toaster } from "sonner";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loginUser, isLoading] = useUser();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(FormContext);

  const sidebarBg = "bg-slate-900 text-slate-300 border-r border-slate-800";

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Mobile Header Toggle */}
      <div className="fixed top-0 left-0 w-full bg-slate-900 border-b border-slate-800 h-16 flex items-center justify-between px-4 z-40 md:hidden">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm">T</span>
          <span className="font-display font-bold text-white text-md">Treva</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-screen transition-all duration-300 z-30 ${
          isCollapsed ? "w-20" : "w-64"
        } ${sidebarBg}`}
      >
        {/* Brand/Toggle Area */}
        <div className="p-5 flex items-center justify-between border-b border-slate-800/60 h-20">
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm">T</span>
              <span className="font-display font-extrabold text-lg text-white">Treva</span>
            </Link>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-colors ${
              isCollapsed ? "mx-auto" : ""
            }`}
          >
            {isCollapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
          </button>
        </div>

        {/* User Info Card */}
        {user && (
          <div className={`p-4 border-b border-slate-800/40 flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}>
            <img
              src={user?.photoURL || "/default-profile.png"}
              className="rounded-xl w-10 h-10 object-cover border border-slate-800 shadow-lg"
              alt="User"
            />
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white truncate">{user?.displayName}</h4>
                <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 rounded-full capitalize">
                  {loginUser?.role || "Tourist"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Scrollable menu slots */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin">
          {loginUser?.role === "tourist" && <TouristMenu isCollapsed={isCollapsed} />}
          {loginUser?.role === "guide" && <GuideMenu isCollapsed={isCollapsed} />}
          {loginUser?.role === "admin" && <AdminMenu isCollapsed={isCollapsed} />}
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-800/60 flex flex-col gap-2">
          {/* Home Nav */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl font-semibold text-xs transition-all ${
                isActive 
                  ? "bg-primary text-white shadow-premium" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`
            }
          >
            <TbHome size={20} />
            {!isCollapsed && <span>Back to Home</span>}
          </NavLink>

          {/* Theme Toggle in Sidebar */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 p-3 rounded-xl font-semibold text-xs transition-all text-slate-400 hover:bg-slate-800 hover:text-white ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            {theme === "light" ? <HiMoon size={20} /> : <HiSun size={20} className="text-amber-400" />}
            {!isCollapsed && <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)}></div>
          
          <div className={`relative w-64 h-full flex flex-col z-10 ${sidebarBg}`}>
            <div className="p-5 flex items-center justify-between border-b border-slate-800/60 h-16">
              <Link to="/" className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm">T</span>
                <span className="font-display font-extrabold text-lg text-white">Treva</span>
              </Link>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <FiX size={20} />
              </button>
            </div>

            {user && (
              <div className="p-4 border-b border-slate-800/40 flex items-center gap-3">
                <img
                  src={user?.photoURL || "/default-profile.png"}
                  className="rounded-xl w-10 h-10 object-cover border border-slate-800 shadow-lg"
                  alt="User"
                />
                <div>
                  <h4 className="text-sm font-bold text-white truncate">{user?.displayName}</h4>
                  <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 rounded-full capitalize">
                    {loginUser?.role || "Tourist"}
                  </span>
                </div>
              </div>
            )}

            <div className="flex-grow overflow-y-auto px-3 py-4 space-y-1.5" onClick={() => setIsMobileOpen(false)}>
              {loginUser?.role === "tourist" && <TouristMenu isCollapsed={false} />}
              {loginUser?.role === "guide" && <GuideMenu isCollapsed={false} />}
              {loginUser?.role === "admin" && <AdminMenu isCollapsed={false} />}
            </div>

            <div className="p-4 border-t border-slate-800/60 space-y-2" onClick={() => setIsMobileOpen(false)}>
              <NavLink
                to="/"
                className="flex items-center gap-3 p-3 rounded-xl font-semibold text-xs text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <TbHome size={20} />
                <span>Back to Home</span>
              </NavLink>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 p-3 rounded-xl font-semibold text-xs text-slate-400 hover:bg-slate-800 hover:text-white text-left"
              >
                {theme === "light" ? <HiMoon size={20} /> : <HiSun size={20} className="text-amber-400" />}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen pt-16 md:pt-0">
        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default Dashboard;
