import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useAllUser from "../../hooks/useAllUser";
import useAllPayment from "../../hooks/useAllPayment";
import Card from "../../components/shared/Card";

const COLORS = ["#10b981", "#06b6d4", "#f59e0b"];

const AdminOverview = () => {
  const [alluser] = useAllUser();
  const [payment] = useAllPayment();
  
  const allPayment = payment.reduce(
    (total, sum) => total + (sum.payment?.amount || 0),
    0
  );
  const client = alluser.filter((guide) => guide.role === "tourist");

  const stats = [
    { name: "Total Users", value: alluser.length, color: "text-emerald-500 bg-emerald-500/10" },
    { name: "Total Payments", value: `$${(allPayment / 100).toLocaleString()}`, color: "text-cyan-500 bg-cyan-500/10" },
    { name: "Total Clients", value: client.length, color: "text-amber-500 bg-amber-500/10" },
  ];

  const pieData = [
    { name: "Users", value: alluser.length },
    { name: "Payments", value: allPayment / 100 },
    { name: "Clients", value: client.length },
  ];

  const barData = [
    { name: "Jan", users: alluser.length || 10, bookings: payment.length || 15 },
    { name: "Feb", users: Math.max(0, (alluser.length || 10) - 2), bookings: Math.max(0, (payment.length || 15) - 3) },
    { name: "Mar", users: (alluser.length || 10) + 5, bookings: (payment.length || 15) + 8 },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Admin Overview
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Detailed metrics dashboard illustrating platform activity trends, client volumes, and invoice receipts.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm hover:shadow-premium transition-all duration-300 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${item.color}`}>
              <span className="font-extrabold text-lg">#</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.name}</span>
              <h3 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
                {item.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <Card title="Activity Comparison" subtitle="USERS & BOOKINGS" className="bg-white dark:bg-slate-800 p-6">
          <div className="w-full h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="bookings" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card title="Database Distribution" subtitle="RECORD BREAKDOWN" className="bg-white dark:bg-slate-800 p-6">
          <div className="w-full h-80 pt-6 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    borderRadius: '12px', 
                    border: 'none', 
                    color: '#fff' 
                  }}
                />
                <Legend verticalAlign="bottom" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
