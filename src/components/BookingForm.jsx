import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormContext } from "./../context/FormData";
import useGuides from "../hooks/useGuides";
import axios from "axios";
import { toast } from "sonner";
import useUser from "./../hooks/useUser";
import { useNavigate } from "react-router-dom";
import Button from "./shared/Button";
import Title from "./Title";
import { FiCalendar, FiDollarSign, FiUser } from "react-icons/fi";

const BookingForm = ({ packageName, packagePrice, creatorRole, tourGuide: lockedGuide }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const { user } = useContext(FormContext);
  const [guides] = useGuides();
  const navigate = useNavigate();
  const [loginUser] = useUser();

  const handelBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const photo = user?.photoURL;
    const price = packagePrice; // Use verified price from props
    const date = selectedDate.toLocaleDateString();
    
    // Auto-assign the guide creator if the package was guide-created
    const tourGuide = creatorRole === "guide" ? lockedGuide : form.tourGuide.value;
    
    const formData = {
      name,
      email,
      photo,
      price,
      date,
      tourGuide,
      status: "pending",
      statas: "pending",
      packageName: packageName,
    };

    if (loginUser.role === "guide") {
      toast.error("Guides cannot book tours.");
      return;
    }
    await axios
      .post(`${import.meta.env.VITE_URL}/guide-booking`, formData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Booking Confirmed Successfully!");
          navigate(
            `${
              loginUser.role === "admin"
                ? "/dashboard/admin-assigned"
                : "/dashboard/tourist-bookings"
            }`
          );
        }
      });
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium p-8 md:p-10">
      <div className="text-center mb-8 space-y-2">
        <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
          Reserve Your Spot
        </span>
        <h2 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Book {packageName || "Your Tour"}
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Fill in the details below to reserve your trip. A confirmation email will be sent to you upon successful booking.
        </p>
      </div>

      <form onSubmit={handelBooking} className="space-y-6">
        {/* Traveler Info Row (Read-only) */}
        <div className="flex flex-col sm:flex-row items-center gap-5 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
          />
          <div className="flex-grow text-center sm:text-left space-y-1">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
              {user?.displayName || "Guest Traveler"}
            </p>
            <p className="text-xs text-slate-400">
              {user?.email || "Not logged in"}
            </p>
          </div>
          <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider">
            Verified
          </span>
        </div>

        {/* Booking Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Price */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              <FiDollarSign className="h-3.5 w-3.5" /> Price (USD)
            </label>
            <input
              required
              readOnly
              type="number"
              name="price"
              value={packagePrice || ""}
              className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed font-semibold"
            />
          </div>

          {/* Tour Guide */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              <FiUser className="h-3.5 w-3.5" /> Tour Guide
            </label>
            <select
              required
              name="tourGuide"
              disabled={creatorRole === "guide"}
              defaultValue={creatorRole === "guide" ? lockedGuide : ""}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all appearance-none disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {creatorRole === "guide" ? (
                <option value={lockedGuide}>{lockedGuide} (Creator)</option>
              ) : (
                <>
                  <option value="" disabled>
                    Select a guide
                  </option>
                  {guides.map((guide, index) => (
                    <option key={index} value={guide.name || guide.id}>
                      {guide.name || "Unnamed Guide"}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* Tour Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              <FiCalendar className="h-3.5 w-3.5" /> Tour Date
            </label>
            <DatePicker
              required
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
              placeholderText="Select a date"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          {!user && (
            <p className="text-xs text-amber-500 font-semibold text-center mb-4 bg-amber-500/10 py-2 rounded-xl">
              ⚠️ Please login to complete your booking
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!user}
            className="w-full font-bold text-base"
          >
            {user ? "Confirm Booking" : "Login Required"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
