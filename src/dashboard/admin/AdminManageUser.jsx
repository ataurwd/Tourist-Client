import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const AdminManageUser = () => {
  const user = useLoaderData();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(user);
  const [filter, setFilter] = useState("");


  // for searching
  const handleSearch = () => {
    const filteredUsers = user.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredUsers);
  };

  useEffect(() => {
    handleSearch();
  }, [search, user]);

  // for filtering data
  const displayedData = filter
    ? filteredData.filter((user) => user.role === filter)
    : filteredData;
  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
    <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
      User Information
    </h1>
  
    {/* Search and Filter Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {/* Search input */}
      <input
        type="text"
        className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
  
      {/* Filter dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border border-gray-300 rounded-md p-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="guide">Guide</option>
        <option value="tourist">Tourist</option>
      </select>
    </div>
  
    {/* User Table */}
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-left bg-gray-50">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border border-gray-300 px-6 py-3 font-medium">No</th>
            <th className="border border-gray-300 px-6 py-3 font-medium">Name</th>
            <th className="border border-gray-300 px-6 py-3 font-medium">Email</th>
            <th className="border border-gray-300 px-6 py-3 font-medium">Role</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.length > 0 ? (
            displayedData.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-100"
                } transition-colors`}
              >
                <td className="border border-gray-300 px-6 py-3 text-gray-700">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-6 py-3 text-gray-700">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-6 py-3 text-gray-700">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-6 py-3">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-600"
                        : user.role === "guide"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {user.role || "N/A"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="text-center py-6 text-gray-600 font-medium"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default AdminManageUser;
