import React, { useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { FiCheck, FiX, FiClock, FiAlertCircle, FiEye } from "react-icons/fi";
import Button from "../../components/shared/Button";
import Modal from "../../components/shared/Modal";
import useAxios from "../../hooks/useAxios";

const AdminManageGuidePackages = () => {
  const axiosInstance = useAxios();
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all packages for moderation
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/admin/packages`);
      // Filter only guide packages
      const guidePkgs = response.data.filter((pkg) => pkg.creatorRole === "guide");
      setPackages(guidePkgs);
    } catch (error) {
      console.error("Error fetching packages for admin review:", error);
      toast.error("Failed to load packages for review.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Approve
  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to APPROVE this package? It will become bookable by tourists."))
      return;

    try {
      const response = await axiosInstance.patch(`/admin/package/approve/${id}`);
      if (response.data.acknowledged || response.data.modifiedCount > 0) {
        toast.success("Package approved successfully!");
        fetchPackages();
      } else {
        toast.error("Approval action failed.");
      }
    } catch (error) {
      console.error("Error approving package:", error);
      toast.error("Error approving package.");
    }
  };

  // Handle Reject
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to REJECT this package?"))
      return;

    try {
      const response = await axiosInstance.patch(`/admin/package/reject/${id}`);
      if (response.data.acknowledged || response.data.modifiedCount > 0) {
        toast.success("Package rejected.");
        fetchPackages();
      } else {
        toast.error("Rejection action failed.");
      }
    } catch (error) {
      console.error("Error rejecting package:", error);
      toast.error("Error rejecting package.");
    }
  };

  // View details modal
  const handleViewDetails = (pkg) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
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
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
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
          Guide Package Moderation
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review, approve, or reject tour packages submitted by local tour guides.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Submitted By
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Status
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
                    <td className="px-6 py-5"><div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mx-auto" /></td>
                  </tr>
                ))
              ) : packages.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    No submitted guide packages pending review.
                  </td>
                </tr>
              ) : (
                packages.map((pkg) => {
                  const isPending = pkg.status === "pending";

                  return (
                    <tr key={pkg._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                        {pkg.packageName}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                        <div className="font-semibold">{pkg.tourGuide || "Guide"}</div>
                        <div className="text-xs text-slate-400">{pkg.creatorEmail}</div>
                      </td>
                      <td className="px-6 py-5 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                        ${pkg.price}
                      </td>
                      <td className="px-6 py-5 text-sm">
                        {getStatusBadge(pkg.status)}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(pkg)}
                            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title="View Package Details"
                          >
                            <FiEye className="h-4 w-4" />
                          </button>

                          <button
                            disabled={!isPending}
                            onClick={() => handleApprove(pkg._id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isPending
                                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                                : "bg-slate-100 dark:bg-slate-750 text-slate-400 cursor-not-allowed"
                            }`}
                            title="Approve Package"
                          >
                            <FiCheck className="h-4 w-4" />
                          </button>

                          <button
                            disabled={!isPending}
                            onClick={() => handleReject(pkg._id)}
                            className={`p-2 rounded-lg transition-colors ${
                              isPending
                                ? "bg-red-500/10 text-red-650 hover:bg-red-500/20"
                                : "bg-slate-100 dark:bg-slate-750 text-slate-400 cursor-not-allowed"
                            }`}
                            title="Reject Package"
                          >
                            <FiX className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details View Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Review Tour Package Details"
        size="lg"
      >
        {selectedPkg && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display">
                  {selectedPkg.packageName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Submitted by {selectedPkg.tourGuide} ({selectedPkg.creatorEmail})
                </p>
              </div>
              <div>{getStatusBadge(selectedPkg.status)}</div>
            </div>

            {/* Image Scroller */}
            {selectedPkg.images && selectedPkg.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {selectedPkg.images.slice(0, 3).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Scenery preview ${idx + 1}`}
                    className="w-full h-24 object-cover rounded-xl border border-slate-100 dark:border-slate-700/50"
                  />
                ))}
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                About Tour
              </span>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 max-h-40 overflow-y-auto">
                {selectedPkg.aboutTour}
              </p>
            </div>

            {/* Daily Itinerary / Plan */}
            {selectedPkg.faqs && selectedPkg.faqs.length > 0 && (
              <div className="space-y-2">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Itinerary FAQs
                </span>
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {selectedPkg.faqs.map((faq, index) => (
                    <div key={index} className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-slate-100 dark:border-slate-700/40">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {faq.question}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Info */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/40">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Proposed Pricing
              </span>
              <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                ${selectedPkg.price} USD
              </span>
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-750">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors font-semibold text-sm"
              >
                Close
              </button>
              {selectedPkg.status === "pending" && (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    className="font-bold"
                    onClick={() => {
                      setIsModalOpen(false);
                      handleReject(selectedPkg._id);
                    }}
                  >
                    Reject Package
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="font-bold"
                    onClick={() => {
                      setIsModalOpen(false);
                      handleApprove(selectedPkg._id);
                    }}
                  >
                    Approve Package
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminManageGuidePackages;
