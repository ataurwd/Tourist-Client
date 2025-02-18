import React, { useContext, useState } from "react";
import { FormContext } from "../../context/FormData";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
const GuideProfile = () => {
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
    Swal.fire({
      title: "Profile Updated",
      icon: "success",
      draggable: false,
    });
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.displayName}!</h1>
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user?.displayName}</h2>
        <p className="text-gray-400">{user?.email}</p>
        <p className="text-gray-400">
          {" "}
          <span className="font-bold">Role: </span>
          {loginUser?.role}
        </p>
        <button
          onClick={handleEditClick}
          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-blue-600 mr-3"
        >
          Edit Profile
        </button>
        <Link to={"/dashboard/tourist-guild"}>
          <button className="mt-4 bg-secondary text-black py-2 px-4 rounded hover:bg-green-600">
            Apply For Tour Guide
          </button>
        </Link>
      </div>

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

export default GuideProfile;
