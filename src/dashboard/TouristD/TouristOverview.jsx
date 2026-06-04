import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiTrendingUp, FiLayers, FiCheckSquare, FiAward } from "react-icons/fi";
import Card from "../../components/shared/Card";

const ordersData = [
  { name: "Jan", bookings: 5 },
  { name: "Feb", bookings: 8 },
  { name: "Mar", bookings: 12 },
  { name: "Apr", bookings: 6 },
  { name: "May", bookings: 10 },
];

const stats = [
  { icon: FiLayers, title: "Total Bookings", value: "41", change: "+12.5%", color: "text-emerald-500 bg-emerald-500/10" },
  { icon: FiTrendingUp, title: "Total Spent", value: "$4,290", change: "+8.2%", color: "text-cyan-500 bg-cyan-500/10" },
  { icon: FiCheckSquare, title: "Approved Stories", value: "8", change: "+3", color: "text-indigo-500 bg-indigo-500/10" },
  { icon: FiAward, title: "Guide Status", value: "Pending", change: "Applied", color: "text-amber-500 bg-amber-500/10" },
];

const TouristOverview = () => {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Welcome to Your Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor your travel bookings, stories, and activities.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-premium transition-all duration-300 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <Card title="Monthly Bookings Trend" subtitle="YOUR ACTIVITY LOG" className="bg-white dark:bg-slate-800 p-6">
        <div className="w-full h-80 pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderRadius: '12px', 
                  border: 'none', 
                  color: '#fff' 
                }}
              />
              <Bar 
                dataKey="bookings" 
                fill="#10b981" 
                radius={[6, 6, 0, 0]} 
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default TouristOverview;
