import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FormContext } from "../../context/FormData";
import StatusBadge from "../../components/shared/StatusBadge";
import Button from "../../components/shared/Button";
import useAxios from "../../hooks/useAxios";

const GuidePackageBookings = () => {
  const { user } = useContext(FormContext);
  const axiosInstance = useAxios();

  // Fetch guide package bookings
  const { data: bookings = [], refetch, isLoading } = useQuery({
    queryKey: ["guide-package-bookings", user?.email],
    queryFn: async () => {
      const response = await axiosInstance.get(`/guide-package-bookings`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Handle Reject Assignment
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this booking?")) return;

    try {
      await axiosInstance.patch(`/update-status/${id}`);
      toast.success("Booking Rejected Successfully!");
      refetch();
    } catch (err) {
      console.error("Error rejecting booking:", err);
      toast.error("Failed to reject booking.");
    }
  };

  // Handle Accept Assignment
  const handleAccept = async (id) => {
    if (!window.confirm("Are you sure you want to accept this booking?")) return;

    try {
      await axiosInstance.patch(`/update-accepted/${id}`);
      toast.success("Booking Accepted Successfully!");
      refetch();
    } catch (err) {
      console.error("Error accepting booking:", err);
      toast.error("Failed to accept booking.");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Package Bookings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitor and manage tour bookings made by tourists on your custom guide-created tour packages.
        </p>
      </div>

      {/* Bookings Table Card Shell */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Package Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Tourist Details
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
                    <td className="px-6 py-5"><div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-40 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-12 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" /></td>
                    <td className="px-6 py-5"><div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded mx-auto" /></td>
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    No bookings found for your tour packages.
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => {
                  const currentStatus = booking.status || booking.statas;
                  const isActionable = currentStatus === "in-review";

                  return (
                    <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-slate-450 dark:text-slate-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                        {booking.packageName}
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-650 dark:text-slate-300">
                        <div className="font-semibold">{booking.name || "Guest"}</div>
                        <div className="text-xs text-slate-400">{booking.email}</div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                        {booking.date}
                      </td>
                      <td className="px-6 py-5 text-sm font-extrabold text-slate-800 dark:text-slate-100">
                        ${booking.price}
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={currentStatus} />
                      </td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex justify-center items-center gap-2">
                          {isActionable && (
                            <>
                              <Button
                                variant="primary"
                                size="sm"
                                className="font-bold"
                                onClick={() => handleAccept(booking._id)}
                              >
                                Confirm Tour
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="font-bold"
                                onClick={() => handleReject(booking._id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
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

export default GuidePackageBookings;
