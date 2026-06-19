import React, { useEffect, useState } from "react";
import StatusBadge from "../../components/shared/StatusBadge";
import Pagination from "../../components/shared/Pagination";
import { HiSearch } from "react-icons/hi";
import useAxios from "../../hooks/useAxios";

const AdminManageUser = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const [count, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [item, setItem] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const axiosInstance = useAxios();

  const numberOfPages = Math.ceil(count / item);

  // Fetch all users for filtering and search
  useEffect(() => {
    axiosInstance.get(`/users`)
      .then((res) => {
        setProduct(res.data);
        setFilteredData(res.data);
      });
  }, [axiosInstance]);

  // Fetch paginated data
  useEffect(() => {
    setIsLoading(true);
    axiosInstance.get(`/pagination?page=${currentPage}&size=${item}`)
      .then((res) => {
        setFilteredData(res.data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [currentPage, item, axiosInstance]);

  // Fetch total count
  useEffect(() => {
    axiosInstance.get(`/totalCount`)
      .then((res) => setTotalCount(res.data.result));
  }, [axiosInstance]);

  // Handle items per page
  const handleItemsPerPage = (val) => {
    setItem(val);
    setCurrentPage(0);
  };

  // Search functionality
  const handleSearch = () => {
    const filteredUsers = product.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filteredUsers);
  };

  useEffect(() => {
    handleSearch();
  }, [search, product]);

  // Filter data by role
  const displayedData = filter
    ? filteredData.filter((u) => u.role === filter)
    : filteredData;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          User Directory
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage all registered users, filter by role, search details, or edit permissions.
        </p>
      </div>

      {/* Filters Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-5 rounded-2xl shadow-sm">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <HiSearch className="h-5 w-5" />
          </span>
          <input
            type="text"
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            placeholder="Search users by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-750 dark:text-slate-250 transition-all"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="guide">Guide</option>
          <option value="tourist">Tourist</option>
        </select>
      </div>

      {/* Table Card Shell */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-slate-700 dark:text-slate-350">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 w-6 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" /></td>
                  </tr>
                ))
              ) : displayedData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-450 dark:text-slate-550 font-medium">
                    No users found matching search criteria.
                  </td>
                </tr>
              ) : (
                displayedData.map((u, index) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {index + 1 + currentPage * item}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                      {u.name}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-450">
                      {u.email}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={u.role || "tourist"} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Card Footer */}
        {numberOfPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/40 dark:bg-slate-900/20">
            <Pagination
              currentPage={currentPage}
              totalPages={numberOfPages}
              onPageChange={setCurrentPage}
              itemsPerPage={item}
              onItemsPerPageChange={handleItemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageUser;
