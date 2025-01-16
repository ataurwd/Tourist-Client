import React from "react";
import useCandidate from "./../../hooks/useCandidate";
import axios from "axios";
import Swal from 'sweetalert2'

const ManageCandidate = () => {
  const [candidate, refetch] = useCandidate();
  const handleAccept = async (id) => {
    const response = await axios
      .patch(`${import.meta.env.VITE_URL}/update-guide/${id}`)
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: "User has been updated to guide.",
          icon: "success",
          confirmButtonText: "Okay",
        });
        refetch();
      });
  };
  return (
    <div className="max-w-6xl mx-auto p-5 mt-10">
      <h2 className="text-2xl font-bold mb-5">Applications</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">CV Link</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Role</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidate.map((application) => (
            <tr key={application._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {application.titel}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={application.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View CV
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {application.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                User / Tourist
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleAccept(application._id)}
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  // onClick={() => handleReject(application._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCandidate;
