import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ordersData = [
  { name: "Jan", orders: 5 },
  { name: "Feb", orders: 8 },
  { name: "Mar", orders: 12 },
  { name: "Apr", orders: 6 },
  { name: "May", orders: 10 },
];

const TouristOverview = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>

      {/* Orders Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Orders Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ordersData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TouristOverview;
