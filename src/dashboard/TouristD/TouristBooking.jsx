import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FormContext } from "../../context/FormData";

const TouristBooking = () => {
  const { user } = useContext(FormContext);
  console.log(user);
  const { data: guideBooking = [] } = useQuery({
    queryKey: ["guideBooking"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/guide-booking/${user.email}`
      );
      return response.data;
    },
  });
  return (
    <div className="overflow-x-auto mt-5 md:px-10 px-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
              Package Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
              Tour Guide Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
              Tour Date
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
              Price
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {guideBooking.map((booking) => (
            <tr key={booking.id}>
              <td className="px-6 py-3 border-b border-gray-300">
                {booking.packageName}
              </td>
              <td className="px-6 py-3 border-b border-gray-300">
                {booking.tourGuide}
              </td>
              <td className="px-6 py-3 border-b border-gray-300">
                {booking.date}
              </td>
              <td className="px-6 py-3 border-b border-gray-300">
               ${booking.price}
              </td>
              <td className="px-6 py-3 border-b border-gray-300">
              <div className="badge badge-outline">{booking.statas} </div>
              </td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">
                {/* {booking.status === "pending" && ( */}
                <>
                  <button
                    //   onClick={() => handlePayment(booking.id)}
                    disabled={booking.status === "pending"}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                  >
                    Pay
                  </button>
                  <button
                    //   onClick={() => handleCancel(booking.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </>
                 {/* )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TouristBooking;
