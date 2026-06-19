import React, { useContext, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FiTrendingUp, FiLayers, FiAward, FiBookOpen, FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import Card from "../../components/shared/Card";
import useBooking from "../../hooks/useBooking";
import useStory from "../../hooks/useStory";
import useUser from "../../hooks/useUser";
import { myAxios } from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { FormContext } from "../../context/FormData";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/shared/StatusBadge";
import Button from "../../components/shared/Button";

const TouristOverview = () => {
  const { user } = useContext(FormContext);
  const [loginUser] = useUser();
  const [bookings = [], isBookingsLoading] = useBooking();
  const [stories = [], isStoriesLoading] = useStory();

  // Fetch guide application status for this user
  const { data: guideApp, isLoading: isAppLoading } = useQuery({
    queryKey: ["guideAppStatus", loginUser?.email],
    queryFn: async () => {
      if (!loginUser?.email) return null;
      const res = await myAxios.get(`/guide-application-status/${loginUser.email}`);
      return res.data;
    },
    enabled: !!loginUser?.email,
  });

  // Calculate Total Spent (only on PAID or ACCEPTED bookings)
  const totalSpent = useMemo(() => {
    return bookings
      .filter((b) => {
        const s = (b.status || b.statas || "").toLowerCase();
        return s === "in-review" || s === "accepted";
      })
      .reduce((sum, b) => sum + Number(b.price || 0), 0);
  }, [bookings]);

  // Determine Guide application status config
  const guideStatus = useMemo(() => {
    if (loginUser?.role === "guide") {
      return {
        value: "Approved",
        label: "Active Guide",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        desc: "You are a verified Tour Guide."
      };
    }
    if (guideApp?.status === "pending") {
      return {
        value: "Pending",
        label: "Applied (In Review)",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        desc: "Application is in review."
      };
    }
    if (guideApp?.status === "rejected") {
      return {
        value: "Rejected",
        label: "Rejected",
        color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        desc: "Application declined by admin."
      };
    }
    return {
      value: "None",
      label: "Not Applied",
      color: "text-slate-400 bg-slate-100 dark:bg-slate-800 border-slate-200/50 dark:border-slate-700/50",
      desc: "Join our travel guide network!"
    };
  }, [loginUser, guideApp]);

  // Aggregate monthly bookings for chart dynamically
  const chartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts = months.map((m) => ({ name: m, bookings: 0 }));

    bookings.forEach((b) => {
      if (!b.date) return;
      const parsed = new Date(b.date);
      if (!isNaN(parsed.getTime())) {
        const idx = parsed.getMonth();
        counts[idx].bookings += 1;
      }
    });

    // To keep chart clean, slice to show last 6 months that might contain data or current half-year
    const currentMonth = new Date().getMonth();
    const startIdx = Math.max(0, currentMonth - 5);
    return counts.slice(startIdx, currentMonth + 1);
  }, [bookings]);

  // Sort and select recent bookings
  const recentBookings = useMemo(() => {
    return [...bookings].slice(0, 3);
  }, [bookings]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* Premium Welcome Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-premium">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <img
              src={user?.photoURL || "/default-profile.png"}
              alt={user?.displayName}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h1 className="text-2xl font-extrabold font-display tracking-tight text-white">
                  Welcome back, {user?.displayName || "Traveler"}!
                </h1>
                <span className="px-3 py-0.5 text-[10px] font-extrabold bg-primary/20 text-primary border border-primary/30 rounded-full uppercase tracking-wider">
                  {loginUser?.role || "Tourist"}
                </span>
              </div>
              <p className="text-sm text-slate-400">
                {user?.email} • Logged in & secure
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/trips">
              <Button variant="primary" size="sm" className="font-bold gap-2">
                Explore Trips <FiArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-premium transition-all duration-300 flex items-center gap-4">
          <div className="p-3 rounded-xl text-indigo-500 bg-indigo-500/10">
            <FiLayers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Total Bookings
            </p>
            <h3 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              {isBookingsLoading ? "..." : bookings.length}
            </h3>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-premium transition-all duration-300 flex items-center gap-4">
          <div className="p-3 rounded-xl text-emerald-500 bg-emerald-500/10">
            <FiTrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Total Spent
            </p>
            <h3 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              {isBookingsLoading ? "..." : `$${totalSpent.toLocaleString()}`}
            </h3>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-premium transition-all duration-300 flex items-center gap-4">
          <div className="p-3 rounded-xl text-cyan-500 bg-cyan-500/10">
            <FiBookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              My Stories
            </p>
            <h3 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              {isStoriesLoading ? "..." : stories.length}
            </h3>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-premium transition-all duration-300 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${guideStatus.color}`}>
              <FiAward className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Guide Status
              </p>
              <h3 className="text-sm font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1 truncate max-w-[120px]">
                {isAppLoading ? "..." : guideStatus.label}
              </h3>
            </div>
          </div>
          {loginUser?.role !== "guide" && (
            <Link to="/dashboard/tourist-guild" className="text-xs font-bold text-primary hover:underline shrink-0">
              Apply
            </Link>
          )}
        </div>

      </div>

      {/* Main Charts & Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Booking Graph (2 cols on large screen) */}
        <div className="lg:col-span-2">
          <Card title="Activity Log" subtitle="MONTHLY BOOKINGS TREND" className="bg-white dark:bg-slate-800 p-6 h-full flex flex-col justify-between">
            <div className="w-full h-80 pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-700/50" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderRadius: '12px', 
                      border: 'none', 
                      color: '#fff',
                      fontSize: '12px',
                      fontFamily: 'Outfit, sans-serif'
                    }}
                  />
                  <Bar 
                    dataKey="bookings" 
                    fill="#10b981" 
                    radius={[6, 6, 0, 0]} 
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Bookings Panel (1 col) */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Recent Activity</span>
                  <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100 mt-1">Upcoming Trips</h3>
                </div>
                <Link to="/dashboard/tourist-bookings" className="text-xs font-bold text-primary hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {isBookingsLoading ? (
                  [1, 2, 3].map((n) => (
                    <div key={n} className="flex gap-4 items-center p-3 animate-pulse border-b border-slate-50 dark:border-slate-700/30">
                      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl" />
                      <div className="space-y-1 flex-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                      </div>
                    </div>
                  ))
                ) : recentBookings.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-sm">
                    No recent bookings found.
                  </div>
                ) : (
                  recentBookings.map((b) => (
                    <div key={b._id} className="flex items-center justify-between p-3.5 bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-700/50 rounded-2xl hover:scale-101 transition-transform">
                      <div className="space-y-1 flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate pr-2">
                          {b.packageName}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="shrink-0" /> {b.date}
                          </span>
                          <span className="font-extrabold text-slate-600 dark:text-slate-300">
                            ${b.price}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={b.status || b.statas} className="shrink-0 shadow-sm" />
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Guide application helper widget */}
            {loginUser?.role !== "guide" && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl text-center space-y-2">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {guideStatus.desc}
                </p>
                {guideApp?.status !== "pending" && (
                  <Link to="/dashboard/tourist-guild" className="inline-block">
                    <Button variant="outline" size="sm" className="font-bold text-xs py-1.5 px-4">
                      Apply Now
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default TouristOverview;
