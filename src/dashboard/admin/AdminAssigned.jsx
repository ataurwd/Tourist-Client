import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useBooking from "../../hooks/useBooking";
import Swal from "sweetalert2";
import StatusBadge from "../../components/shared/StatusBadge";
import Button from "../../components/shared/Button";

const AdminAssigned = () => {
  const [guideBooking, refetch, isLoading] = useBooking();

  const handelCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await axios.delete(
        `${import.meta.env.VITE_URL}/guide-booking/${id}`
      );
      if (res.data.deletedCount) {
        Swal.fire({
          title: "Booking Cancelled Successfully",
          icon: "success",
        });
        refetch();
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          All System Bookings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor all tourist package and guide reservations system-wide, and process payments or cancellations.
        </p>
      </div>

      {/* Table Card Shell */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Tour Guide Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Tour Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-slate-700 dark:text-slate-350">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" /></td>
                    <td className="px-6 py-5"><div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded mx-auto" /></td>
                  </tr>
                ))
              ) : !guideBooking || guideBooking.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    No system bookings found.
                  </td>
                </tr>
              ) : (
                guideBooking.map((booking) => {
                  const isActionDisabled =
                    booking.statas === "in-review" ||
                    booking.statas === "rejected" ||
                    booking.statas === "accepted";

                  return (
                    <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                        {booking.packageName}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-650 dark:text-slate-300">
                        {booking.tourGuide}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                        {booking.date}
                      </td>
                      <td className="px-6 py-5 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                        ${booking.price}
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={booking.statas} />
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center items-center gap-2">
                          {/* Pay Button */}
                          <Link
                            to={`/dashboard/tourist-bookings/${booking._id}`}
                            className={`${isActionDisabled ? "pointer-events-none opacity-40" : ""}`}
                          >
                            <Button
                              disabled={isActionDisabled}
                              variant="primary"
                              size="sm"
                              className="font-bold"
                            >
                              Pay
                            </Button>
                          </Link>

                          {/* Cancel Button */}
                          <Button
                            onClick={() => handelCancel(booking._id)}
                            disabled={booking.statas !== "pending"}
                            variant="danger"
                            size="sm"
                            className="font-bold"
                          >
                            Cancel
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAssigned;
