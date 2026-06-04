import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FormContext } from "./../../context/FormData";
import { toast } from "sonner";
import StatusBadge from "../../components/shared/StatusBadge";
import Button from "../../components/shared/Button";

const GuideAssigned = () => {
  const { user } = useContext(FormContext);

  // Fetch guide bookings
  const { data: guideAssigner = [], refetch, isLoading } = useQuery({
    queryKey: ["guide-assigned"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/guide-bookings`
      );
      return response.data;
    },
  });

  // Update booking status function (Reject)
  const handleReject = async (id) => {
    if (!window.confirm("Are you sure? Do you want to reject this booking assignation?")) return;

    {
      await axios.patch(`${import.meta.env.VITE_URL}/update-status/${id}`);
      toast.success("Rejected Successfully!");
      refetch();
    }
  };

  // Update booking status function (Accept)
  const handelAccept = async (id) => {
    if (!window.confirm("Do you want to accept this booking assignation?")) return;

    {
      await axios.patch(
        `${import.meta.env.VITE_URL}/update-accepted/${id}`
      );
      toast.success("Accepted Successfully!");
      refetch();
    }
  };

  // Filter for tours assigned specifically to this guide
  const assignedTours = guideAssigner?.filter(
    (booking) => booking.tourGuide === user?.displayName
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Assigned Tours
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review, accept, or decline booking assignments from travelers requesting your guide services.
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
                  Tourist Name
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
              ) : !assignedTours || assignedTours.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    No assigned tours found.
                  </td>
                </tr>
              ) : (
                assignedTours.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                      {booking.packageName}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                      {booking.name}
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
                        {/* Accept Button */}
                        <Button
                          disabled={booking.statas !== "in-review"}
                          variant={booking.statas === "in-review" ? "primary" : "outline"}
                          size="sm"
                          className="font-bold"
                          onClick={() => handelAccept(booking._id)}
                        >
                          Accept
                        </Button>
                        {/* Reject Button */}
                        {booking.statas === "in-review" && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="font-bold"
                            onClick={() => handleReject(booking._id)}
                          >
                            Reject
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuideAssigned;
