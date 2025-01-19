import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import useAllPayment from "../../hooks/useAllPayment";
import useBooking from "../../hooks/useBooking";

const TouristBooking = () => {
  const [payment] = useAllPayment();
  const [guideBooking] = useBooking();
  return (
    <div className="overflow-x-auto mt-5 md:px-10 px-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
              Package Name {}
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
                <>
                  {/* Pay Button */}
                  <button
                    disabled={
                      booking.statas === "in-review" ||
                      booking.statas === "accepted" ||
                      booking.statas === "rejected"
                    }
                    className={`px-3 py-1 rounded-md mr-2 ${
                      booking.statas === "in-review" ||
                      booking.statas === "accepted" ||
                      booking.statas === "rejected"
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    <Link
                      to={`/dashboard/tourist-bookings/${booking._id}`}
                      className={`${
                        booking.statas === "in-review" ||
                        booking.statas === "accepted" ||
                        booking.statas === "rejected"
                          ? "cursor-not-allowed pointer-events-none"
                          : ""
                      }`}
                    >
                      Pay
                    </Link>
                  </button>
                      {console.log(booking.statas)}
                  {/* Cancel Button */}
                  <button
                    disabled={booking.statas !== "pending"}
                    // onClick={() => handleCancel(booking._id)}
                    className={`px-3 py-1 rounded-md ${booking.statas !== 'pending' ? 'bg-gray-300': 'bg-gray-400'}`}
                  >
                    Cancel
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TouristBooking;
