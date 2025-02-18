import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";

const AdminManageUser = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [count, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [item, setItem] = useState(10);

  const numberOfPages = Math.ceil(count / item);
  const pages = [...Array(numberOfPages).keys()];

  // Fetch all users for filtering and search
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setFilteredData(data);
      })
  }, []);

  // Fetch paginated data
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_URL}/pagination?page=${currentPage}&size=${item}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilteredData(data); // Update filteredData with paginated data
      })
  }, [currentPage, item]);

  // Fetch total count
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/totalCount`)
      .then((res) => res.json())
      .then((data) => setTotalCount(data.result));
  }, []);

  // Handle items per page
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItem(val);
    setCurrentPage(0); // Reset to the first page
  };

  // Search functionality
  const handleSearch = () => {
    const filteredUsers = product.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredUsers);
  };

  useEffect(() => {
    handleSearch();
  }, [search, product]);

  // Filter data by role
  const displayedData = filter
    ? filteredData.filter((user) => user.role === filter)
    : filteredData;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg- shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-400">
        User Information
      </h1>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          className="border border-gray-300 bg-white rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-primary text-white">
                <th className="border border-gray-300 px-6 py-3 font-medium">
                  No
                </th>
                <th className="border border-gray-300 px-6 py-3 font-medium">
                  Name
                </th>
                <th className="border border-gray-300 px-6 py-3 font-medium">
                  Email
                </th>
                <th className="border border-gray-300 px-6 py-3 font-medium">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedData.length > 0 ? (
                displayedData.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-" : "bg-"
                    } transition-colors`}
                  >
                    <td className="border border-gray-300 px-6 py-3 text-gray-400">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-gray-400">
                      {user.name}
                    </td>
                    <td className="border border-gray-300 px-6 py-3 text-gray-400">
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

      {/* Pagination */}
      <div className="my-10 flex justify-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 mx-3 rounded-sm ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <select className="border-2 rounded-sm" value={item} onChange={handleItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default AdminManageUser;
