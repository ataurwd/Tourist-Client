import React, { useContext, useState } from "react";
import { FormContext } from "../../context/FormData";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { toast } from "sonner";
import Button from "../../components/shared/Button";
import Modal from "../../components/shared/Modal";
import { FiEdit2, FiMail, FiShield, FiUser } from "react-icons/fi";

const TouristProfile = () => {
  const { user, setUser } = useContext(FormContext);
  const [loginUser] = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
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
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 animate-fade-in-up">
      {/* Profile Card Shell */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        {/* Cover Accent */}
        <div className="h-40 bg-gradient-to-br from-primary via-emerald-600 to-secondary relative">
          <div className="absolute inset-0 bg-slate-950/20" />
        </div>

        {/* User Card */}
        <div className="relative flex flex-col items-center -mt-16 pb-8 px-6 text-center">
          <div className="relative">
            <img
              src={user?.photoURL}
              alt={user?.displayName || "Profile User"}
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-premium"
            />
            <span className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-premium uppercase tracking-wider">
              {loginUser?.role || "Tourist"}
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            {user?.displayName}
          </h1>
          <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5 justify-center">
            <FiMail className="h-3.5 w-3.5" /> {user?.email}
          </p>

          {/* Details Row */}
          <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm">
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Current Role
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1 capitalize">
                {loginUser?.role || "Tourist"}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </span>
              <span className="text-sm font-semibold text-emerald-500 mt-1">
                Active Traveler
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditClick}
              className="font-bold gap-2"
            >
              <FiEdit2 className="h-4 w-4" /> Edit Profile
            </Button>
            <Link to="/dashboard/tourist-guild">
              <Button variant="primary" size="sm" className="font-bold">
                Apply For Tour Guide
              </Button>
            </Link>
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
              value={loginUser?.role || "Tourist"}
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

export default TouristProfile;
