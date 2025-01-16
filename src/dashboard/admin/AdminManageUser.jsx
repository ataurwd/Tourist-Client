import React from "react";
import { useLoaderData } from "react-router-dom";

const AdminManageUser = () => {
  const user = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-5 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        User Information {user.length}
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={user._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className={`badge badge-outline ${user.role === 'tourist' ? 'bg-primary text-black' : ''}`}>{user.role || 'N/A'}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageUser;
