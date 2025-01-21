import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import useAllPayment from "../../hooks/useAllPayment";
import useBooking from "../../hooks/useBooking";
import Swal from "sweetalert2";

const AdminAssigned = () => {
  const [payment] = useAllPayment();
  const [guideBooking, refetch] = useBooking();

  const handelCancel = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_URL}/guide-booking/${id}`
    );
    console.log(res.data)
    if (res.data.deletedCount) {
      Swal.fire({
        title: "Package Delted Successfully",
        icon: "success",
        draggable: false,
      });
      refetch();
    }
  };
  return (
    <div className="overflow-x-auto my-10 md:px-10">
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
            <tr key={booking._id}>
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
                <div
                  className={`badge badge-outline ${
                    booking.statas === "rejected"
                      ? "text-red-500"
                      : booking.statas === "in-review"
                      ? "text-yellow-500"
                      : booking.statas === "accepted"
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {booking.statas}{" "}
                </div>
              </td>
              <td className="px-6 py-3 border-b border-gray-300 text-center">
                <button
                  disabled={
                    booking.statas === "in-review" ||
                    booking.statas === "rejected" ||
                    booking.statas === "accepted"
                  }
                  className={`px-3 py-1 rounded-md mr-2 ${
                    booking.statas === "in-review" ||
                    booking.statas === "rejected" ||
                    booking.statas === "accepted"
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  <Link
                    to={`/dashboard/tourist-bookings/${booking._id}`}
                    className={`${
                      booking.statas === "in-review" ||
                      booking.statas === "rejected" ||
                      booking.statas === "accepted"
                        ? "cursor-not-allowed pointer-events-none"
                        : ""
                    }`}
                  >
                    Pay
                  </Link>
                </button>

                <button
                  onClick={() => handelCancel(booking._id)}
                  disabled={booking.statas !== "pending"}
                  className={`px-3 py-1 rounded-md ${
                    booking.statas !== "pending"
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-400 cursor-pointer"
                  }`}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminAssigned;
