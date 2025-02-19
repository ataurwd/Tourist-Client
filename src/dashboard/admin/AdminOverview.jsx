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
} from "recharts";
import useAllUser from "../../hooks/useAllUser";
import useAllPayment from "../../hooks/useAllPayment";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminOverview = () => {
  const [alluser] = useAllUser();
  const [payment] = useAllPayment();
  const allPayment = payment.reduce(
    (total, sum) => total + sum.payment.amount,
    0
  );
  const client = alluser.filter((guide) => guide.role === "tourist");

  const data = [
    { name: "Users", value: alluser.length },
    { name: "Payment", value: allPayment / 100 },
    { name: "Total Clients", value: client.length },
  ];
  const cartData = [
    { name: "Users", value: alluser.length },
    { name: "Ordres", value: payment.length },
    { name: "Total Clients", value: client.length },
  ];

  const barData = [
    { name: "a", users:10, orders: 20 },
    { name: "Feb", users: 2, orders: 10 },
    { name: "Mar", users: 5, orders: 5 },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-400 mb-4">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
            <p className="text-2xl font-bold text-blue-600">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Users & Orders Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Statistics Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
