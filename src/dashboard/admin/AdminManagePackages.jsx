import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import Button from "../../components/shared/Button";

const AdminManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch all packages
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_URL}/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button
  const handleEdit = (pkg) => {
    setEditingId(pkg._id);
    setEditFormData(pkg);
    setShowEditModal(true);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL}/package/${editingId}`,
        editFormData,
        { withCredentials: true },
      );

      console.log("Update response:", response.data);
      
      // MongoDB updateOne returns acknowledged:true if successful
      if (response.data.acknowledged) {
        toast.success("Package Updated Successfully!");
        setShowEditModal(false);
        setEditingId(null);
        fetchPackages();
      } else {
        toast.error("Failed to update package");
      }
    } catch (error) {
      console.error(
        "Error updating package:",
        error.response?.data || error.message,
      );
      toast.error(error.response?.data?.message || "Failed to update package");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?"))
      return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_URL}/package/${id}`,
        { withCredentials: true },
      );

      if (response.data.deletedCount > 0) {
        toast.success("Package Deleted Successfully!");
        fetchPackages();
      } else {
        toast.error("Failed to delete package");
      }
    } catch (error) {
      console.error(
        "Error deleting package:",
        error.response?.data || error.message,
      );
      toast.error(error.response?.data?.message || "Failed to delete package");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Manage Tour Packages
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Edit, delete, or view all tour packages in the system.
        </p>
      </div>

      {/* Packages Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Tour Guide
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Tour Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-slate-700 dark:text-slate-350">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td className="px-6 py-5">
                      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded mx-auto" />
                    </td>
                  </tr>
                ))
              ) : packages.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-slate-400 dark:text-slate-500"
                  >
                    No packages found.
                  </td>
                </tr>
              ) : (
                packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors"
                  >
                    <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                      {pkg.packageName}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-650 dark:text-slate-300">
                      {pkg.tourGuide}
                    </td>
                    <td className="px-6 py-5 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                      ${pkg.price}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                      {pkg.tourDate}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                      {pkg.images?.length || 0} image(s)
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center items-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          title="Edit Package"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(pkg._id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                          title="Delete Package"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800">
              <h2 className="text-xl font-extrabold font-display text-slate-800 dark:text-slate-100">
                Edit Package
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Package Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Package Name
                </label>
                <input
                  type="text"
                  name="packageName"
                  value={editFormData.packageName || ""}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              {/* Tour Guide */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Tour Guide
                </label>
                <input
                  type="text"
                  name="tourGuide"
                  value={editFormData.tourGuide || ""}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editFormData.price || ""}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              {/* Tour Date */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Tour Date
                </label>
                <input
                  type="date"
                  name="tourDate"
                  value={editFormData.tourDate || ""}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              {/* About Tour */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  About Tour
                </label>
                <textarea
                  name="aboutTour"
                  value={editFormData.aboutTour || ""}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* Tour Plan */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Tour Plan
                </label>
                <textarea
                  name="tourPlan"
                  value={editFormData.tourPlan || ""}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex gap-3 justify-end p-6 border-t border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-semibold"
              >
                Cancel
              </button>
              <Button variant="primary" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagePackages;
