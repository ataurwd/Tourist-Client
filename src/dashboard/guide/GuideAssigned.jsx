import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormContext } from "./../../context/FormData";
import Swal from "sweetalert2";

const GuideAssigned = () => {
  const { user } = useContext(FormContext);

  // Fetch guide bookings
  const { data: guideAssigner = [], refetch } = useQuery({
    queryKey: ["guide-assigned"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/guide-bookings`
      );
      return response.data;
    },
  });

  // Update booking statas function
  const updateBookingstatas = async (id, newstatas) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_URL}/update-booking-statas/${id}`,
        { statas: newstatas }
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: `statas updated to ${newstatas}`,
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Failed to update statas", error);
    }
  };

  // Handle Reject button click
  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will reject the booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateBookingstatas(id, "Rejected");
      }
    });
  };

  return (
    <div>
      <p>
        My guide assignments:{" "}
        {guideAssigner?.filter((guide) => guide.tourGuide === user?.displayName)
          .length || 0}
      </p>
      <div className="overflow-x-auto mt-5 md:px-10 px-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
                Package Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
                Tourist Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
                Tour Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
                statas
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {guideAssigner
              ?.filter((guide) => guide.tourGuide === user?.displayName)
              .map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {booking.packageName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {booking.touristName}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    {booking.date}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    ${booking.price}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300">
                    <div
                      className={`badge badge-outline ${
                        booking.statas === "rejected"
                          ? "text-red-500"
                          : booking.statas === "accepted"
                          ? "text-green-500"
                          : "text-primary"
                      }`}
                    >
                      {booking.statas}
                    </div>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-300 text-center">
                    <button
                      disabled={booking.statas !== "in-review"}
                      className={`px-3 py-1 rounded-md ${
                        booking.statas === "in-review"
                          ? "bg-black text-white hover:bg-blue-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      onClick={() => updateBookingstatas(booking._id, "accepted")}
                    >
                      Accept
                    </button>
                    {booking.statas === "in-review" && (
                      <button
                        className="px-3 py-1 ml-2 rounded-md bg-black text-white hover:bg-red-600"
                        onClick={() => handleReject(booking._id)}
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuideAssigned;
