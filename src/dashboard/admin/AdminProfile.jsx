import React, { useContext, useState } from "react";
import useAllUser from "../../hooks/useAllUser";
import { FormContext } from "../../context/FormData";
import usePackage from "./../../hooks/usePackage";
import useAllStories from "../../hooks/useAllStories";
import useAllPayment from "../../hooks/useAllPayment";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [alluser] = useAllUser();
  const { user, setUser } = useContext(FormContext);
  const [packageItem] = usePackage();
  const [allStorie] = useAllStories();
  const [payment] = useAllPayment();
  const allPayment = payment.reduce(
    (total, sum) => total + sum.payment.amount,
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
    Swal.fire({
      title: "Profile Updated",
      icon: "success",
      draggable: false,
    });
  };

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <div className="bg-green-200 p-4 rounded-md mb-6">
        <h2 className="text-2xl font-semibold text-primary">
          Welcome back, {user?.displayName}!
        </h2>
        <p className="text-gray-600">
          Here’s an overview of your admin dashboard.
        </p>
      </div>

      {/* Admin Information */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex items-center">
        <img
          src={user?.photoURL}
          alt="Admin"
          className="w-20 h-20 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold">{user.displayName}</h3>
          <p className="text-gray-600">
            <span className="font-bold">Role:</span> Admin
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Payment */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Payment</h4>
          <p className="text-2xl font-bold text-green-600">
            ${allPayment / 100}
          </p>
        </div>

        {/* Total Tour Guides */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Tour Guides</h4>
          <p className="text-2xl font-bold text-blue-600">
            {alluser.filter((guide) => guide.role === "guide").length}
          </p>
        </div>

        {/* Total Packages */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Packages</h4>
          <p className="text-2xl font-bold text-purple-600">
            {packageItem.length}
          </p>
        </div>

        {/* Total Clients */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Clients</h4>
          <p className="text-2xl font-bold text-orange-600">
            {alluser.filter((guide) => guide.role === "tourist").length}
          </p>
        </div>

        {/* Total Stories */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Stories</h4>
          <p className="text-2xl font-bold text-pink-600">{allStorie.length}</p>
        </div>
      </div>
      <button
        onClick={handleEditClick}
        className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 mr-3"
      >
        Edit Profile
      </button>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={user?.role || "Tourist"}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
