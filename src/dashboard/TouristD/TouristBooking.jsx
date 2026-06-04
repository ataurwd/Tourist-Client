import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { FormContext } from "../../context/FormData";
import StatusBadge from "../../components/shared/StatusBadge";
import Pagination from "../../components/shared/Pagination";
import Button from "../../components/shared/Button";

const TouristBooking = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const { user } = useContext(FormContext);

  const [product, setProduct] = useState([]);
  const [count, totalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [item, setItem] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const numberOfpage = Math.ceil(count / item);

  const fetchBookings = () => {
    setIsLoading(true);
    fetch(
      `${import.meta.env.VITE_URL}/guide-booking/${user.email}?page=${currentPage}&size=${item}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, item]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/countGuide/${user.email}`)
      .then((res) => res.json())
      .then((data) => totalCount(data.result));
  }, []);

  const bookingCount = product.length;

  useEffect(() => {
    if (bookingCount >= 3) {
      setShowCongrats(true);
      setButtonEnabled(true);
    } else {
      setShowCongrats(false);
      setButtonEnabled(false);
    }
  }, [product]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
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
        const updatedBookings = product.filter((booking) => booking._id !== id);
        setProduct(updatedBookings);
        totalCount((prev) => Math.max(0, prev - 1));
        if (updatedBookings.length <= 3) {
          setShowCongrats(false);
          setButtonEnabled(false);
        }
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Your Bookings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage and monitor all your reserved tour packages and assigned guides.
        </p>
      </div>

      {showCongrats && (
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl shadow-sm">
          <Confetti run={showCongrats} numberOfPieces={60} className="w-full h-full absolute inset-0 pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display">
                🎉 Congratulations!
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You have unlocked a premium discount for booking more than 3 tours!
              </p>
            </div>
            <Button
              disabled={!buttonEnabled}
              variant="primary"
              size="sm"
              className="font-bold"
            >
              Apply 10% Discount
            </Button>
          </div>
        </div>
      )}

      {/* Table Card Shell */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Tour Guide
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Date
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
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-full" /></td>
                    <td className="px-6 py-5"><div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded mx-auto" /></td>
                  </tr>
                ))
              ) : product.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    No active bookings found.
                  </td>
                </tr>
              ) : (
                product.map((booking, index) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-5 text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {index + 1 + currentPage * item}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
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
                          className={`${
                            booking.statas !== "pending"
                              ? "pointer-events-none opacity-40"
                              : ""
                          }`}
                        >
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={booking.statas !== "pending"}
                            className="font-bold"
                          >
                            Pay
                          </Button>
                        </Link>
                        {/* Cancel Button */}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancel(booking._id)}
                          disabled={booking.statas !== "pending"}
                          className="font-bold"
                        >
                          Cancel
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Card Footer */}
        {numberOfpage > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50/40 dark:bg-slate-900/20">
            <Pagination
              currentPage={currentPage}
              totalPages={numberOfpage}
              onPageChange={setCurrentPage}
              itemsPerPage={item}
              onItemsPerPageChange={handleItemsPerPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristBooking;
