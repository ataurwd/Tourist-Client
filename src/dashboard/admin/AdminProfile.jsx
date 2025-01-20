import React, { useContext } from "react";
import useAllUser from "../../hooks/useAllUser";
import { FormContext } from "../../context/FormData";
import usePackage from './../../hooks/usePackage';
import useAllStories from "../../hooks/useAllStories";
import useAllPayment from "../../hooks/useAllPayment";

const AdminProfile = () => {
    const [alluser] = useAllUser()
    const { user } = useContext(FormContext)
    const [packageItem] = usePackage()
  const [allStorie] = useAllStories()
  const [payment] = useAllPayment()
  const allPayment = payment.reduce((total, sum) => total + sum.payment.amount, 0)

  const adminData = {
    name: "Admin John",
    role: "Super Admin",
    picture: "https://via.placeholder.com/150", // Replace with actual image URL
  };

  const stats = {
    totalPayment: 15000,
    totalTourGuides: 8,
    totalPackages: 20,
    totalClients: 50,
    totalStories: 35,
  };

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <div className="bg-green-200 p-4 rounded-md mb-6">
        <h2 className="text-2xl font-semibold text-primary">
          Welcome back, {user?.displayName}!
        </h2>
        <p className="text-gray-600">Here’s an overview of your admin dashboard.</p>
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
          <p className="text-gray-600"><span className="font-bold">Role:</span> Admin</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Payment */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Payment</h4>
          <p className="text-2xl font-bold text-green-600">${allPayment / 100}</p>
        </div>

        {/* Total Tour Guides */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Tour Guides</h4>
          <p className="text-2xl font-bold text-blue-600">{alluser.filter(guide => guide.role === 'guide').length}</p>
        </div>

        {/* Total Packages */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Packages</h4>
          <p className="text-2xl font-bold text-purple-600">{packageItem.length}</p>
        </div>

        {/* Total Clients */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Clients</h4>
          <p className="text-2xl font-bold text-orange-600">{alluser.filter(guide => guide.role === 'tourist').length}</p>
        </div>

        {/* Total Stories */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-gray-600">Total Stories</h4>
          <p className="text-2xl font-bold text-pink-600">{allStorie.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
