import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiX, FiLock, FiAlertCircle } from "react-icons/fi";
import Button from "../../components/shared/Button";
import { FormContext } from "../../context/FormData";
import useAxios from "../../hooks/useAxios";

const GuideManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const { user } = useContext(FormContext);
  const axiosInstance = useAxios();

  // Fetch guide packages
  useEffect(() => {
    fetchGuidePackages();
  }, []);

  const fetchGuidePackages = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/guide/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error("Error fetching guide packages:", error);
      toast.error("Failed to load packages.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (pkg) => {
    if (pkg.status === "approved") {
      toast.error("Approved packages are locked and cannot be edited.");
      return;
    }
    setEditingId(pkg._id);
    setEditFormData({ ...pkg });
    setShowEditModal(true);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    }));
  };

  // Handle FAQ change in edit modal
  const handleFAQChange = (index, field, value) => {
    const updatedFaqs = [...(editFormData.faqs || [])];
    if (!updatedFaqs[index]) {
      updatedFaqs[index] = { question: "", answer: "" };
    }
    updatedFaqs[index][field] = value;
    setEditFormData((prev) => ({
      ...prev,
      faqs: updatedFaqs,
    }));
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    try {
      const response = await axiosInstance.put(
        `/guide/package/${editingId}`,
        editFormData
      );

      if (response.data.acknowledged || response.data.modifiedCount > 0) {
        toast.success("Package Updated Successfully!");
        setShowEditModal(false);
        setEditingId(null);
        fetchGuidePackages();
      } else {
        toast.error("No changes detected or update failed.");
      }
    } catch (error) {
      console.error("Error updating package:", error);
      toast.error(error.response?.data?.message || "Failed to update package.");
    }
  };

  // Handle delete package
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour package? This cannot be undone."))
      return;

    try {
      const response = await axiosInstance.delete(`/guide/package/${id}`);

      if (response.data.deletedCount > 0) {
        toast.success("Package Deleted Successfully!");
        fetchGuidePackages();
      } else {
        toast.error("Failed to delete package.");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error(error.response?.data?.message || "Failed to delete package.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider animate-pulse">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          My Tour Packages
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review, modify, or delete tour packages you have created. Approved packages cannot be modified.
        </p>
      </div>

      {/* Packages Table Container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Price (USD)
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Status
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
                      <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
                    </td>
                    <td className="px-6 py-5">
                      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
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
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-400 dark:text-slate-500"
                  >
                    No packages found. Create a package first!
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
                    <td className="px-6 py-5 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                      ${pkg.price}
                    </td>
                    <td className="px-6 py-5 text-sm">
                      {getStatusBadge(pkg.status)}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-550 dark:text-slate-400">
                      {pkg.images?.length || 0} image(s)
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center items-center gap-2">
                        {/* Edit Button */}
                        {pkg.status === "approved" ? (
                          <span
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-750 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                            title="Approved packages cannot be edited"
                          >
                            <FiLock className="h-4 w-4" />
                          </span>
                        ) : (
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            title="Edit Package"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                        )}

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
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800 z-10">
              <h2 className="text-xl font-extrabold font-display text-slate-800 dark:text-slate-100">
                Edit Package Details
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
              {/* Status Notice */}
              <div className="flex gap-2.5 items-center p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-600 dark:text-amber-400">
                <FiAlertCircle className="h-4 w-4 flex-shrink-0" />
                <p>
                  Any updates to this package will keep its status as <strong>Pending</strong> (or reset it to pending) until re-reviewed by Admin.
                </p>
              </div>

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
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Price ($ USD)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editFormData.price || ""}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
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
                  rows="4"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition resize-none"
                />
              </div>

              {/* FAQs */}
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Package FAQs
                </span>
                {(editFormData.faqs || [0, 1, 2]).map((faq, index) => (
                  <div key={index} className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-700/50 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-slate-405 uppercase tracking-wider">
                      FAQ Item #{index + 1}
                    </span>
                    <input
                      type="text"
                      value={faq?.question || ""}
                      onChange={(e) =>
                        handleFAQChange(index, "question", e.target.value)
                      }
                      placeholder="e.g. What is the itinerary?"
                      className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <textarea
                      value={faq?.answer || ""}
                      onChange={(e) =>
                        handleFAQChange(index, "answer", e.target.value)
                      }
                      placeholder="Answer details..."
                      rows="2"
                      className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 flex gap-3 justify-end p-6 border-t border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800 z-10">
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

export default GuideManagePackages;
