import React, { useContext, useState } from "react";
import useAllUser from "../../hooks/useAllUser";
import { FormContext } from "../../context/FormData";
import usePackage from "./../../hooks/usePackage";
import useAllStories from "../../hooks/useAllStories";
import useAllPayment from "../../hooks/useAllPayment";
import { toast } from "sonner";
import Button from "../../components/shared/Button";
import Modal from "../../components/shared/Modal";
import { FiEdit2, FiMail, FiUsers, FiMap, FiMessageSquare, FiTrendingUp } from "react-icons/fi";

const AdminProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alluser] = useAllUser();
  const { user, setUser } = useContext(FormContext);
  const [packageItem] = usePackage();
  const [allStorie] = useAllStories();
  const [payment] = useAllPayment();
  
  const allPayment = payment.reduce(
    (total, sum) => total + (sum.payment?.amount || 0),
    0
  );
  
  const [formData, setFormData] = useState({ ...user });

  // Open modal
  const handleEditClick = () => {
    setFormData({ ...user });
    setModalOpen(true);
  };
  
  // Close modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save changes
  const handleSave = () => {
    setUser({ ...formData }); // Update user in context
    setModalOpen(false);
    toast.success("Profile Updated Successfully!");
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/10 p-8 rounded-3xl relative overflow-hidden shadow-premium">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Admin Console
          </span>
          <h2 className="text-3xl font-extrabold font-display text-white tracking-tight">
            Welcome back, {user?.displayName}!
          </h2>
          <p className="text-sm text-slate-305 max-w-xl">
            Here's an overview of the Treva platform operations, revenue, user bases, and community growth.
          </p>
        </div>
      </div>

      {/* Admin Profile Info Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <img
            src={user?.photoURL}
            alt="Admin"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/20 shadow-premium"
          />
          <div>
            <h3 className="text-xl font-extrabold font-display text-slate-800 dark:text-slate-100">
              {user?.displayName}
            </h3>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5 justify-center md:justify-start">
              <FiMail className="h-3.5 w-3.5" /> {user?.email}
            </p>
            <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full mt-2 uppercase tracking-wider">
              System Admin
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEditClick}
          className="font-bold gap-2"
        >
          <FiEdit2 className="h-4 w-4" /> Edit Profile
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Revenue */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <FiTrendingUp className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <h4 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              ${(allPayment / 100).toLocaleString()}
            </h4>
          </div>
        </div>

        {/* Guides */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-xl">
            <FiUsers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Guides</span>
            <h4 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              {alluser.filter((guide) => guide.role === "guide").length}
            </h4>
          </div>
        </div>

        {/* Packages */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-violet-500/10 text-violet-500 rounded-xl">
            <FiMap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Packages</span>
            <h4 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              {packageItem.length}
            </h4>
          </div>
        </div>

        {/* Clients */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <FiUsers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Clients</span>
            <h4 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              {alluser.filter((guide) => guide.role === "tourist").length}
            </h4>
          </div>
        </div>

        {/* Stories */}
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 text-pink-500 rounded-xl">
            <FiMessageSquare className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Stories</span>
            <h4 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mt-1">
              {allStorie.length}
            </h4>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="Edit Profile Details"
        size="md"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              System Role (Read-only)
            </label>
            <input
              type="text"
              value="Admin"
              readOnly
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Email Address (Read-only)
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-400 cursor-not-allowed"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-750">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleModalClose}
              className="font-bold"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleSave}
              className="font-bold"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProfile;
