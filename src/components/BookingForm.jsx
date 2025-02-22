import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormContext } from "./../context/FormData";
import useAllUser from "../hooks/useAllUser";
import axios from "axios";
import Swal from "sweetalert2";
import useUser from "./../hooks/useUser";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ packageName }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const { user } = useContext(FormContext);
  const [alluser] = useAllUser();
  const navigate = useNavigate();
  const [loginUser] = useUser();

  const handelBooking = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const photo = user?.photoURL;
    const price = form.price.value;
    const date = selectedDate.toLocaleDateString();
    const tourGuide = form.tourGuide.value;
    const formData = {
      name,
      email,
      photo,
      price,
      date,
      tourGuide,
      statas: "pending",
      packageName: packageName,
    };

    if (loginUser.role === "guide") {
      return Swal.fire({
        title: "A Guide Can not booked",
        icon: "error",
        draggable: false,
      });
    }
    await axios
      .post(`${import.meta.env.VITE_URL}/guide-booking`, formData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Confirm your Booking",
            icon: "success",
            draggable: false,
          });
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
    <div>
      <div className="flex justify-center items-center mt-10">
        <div className=" p-8 rounded-lg w-full">
          <h2 className="text-2xl font-semibold text-gray-400 mb-6 text-center">
            Book Your Tour{}
          </h2>
          <form onSubmit={handelBooking}>
            <div className="grid grid-cols-2 gap-5">
              {/* Tourist Name */}
              <div className="mb-4">
                <label className="block text-gray-400 font-medium mb-2">
                  Tourist Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                  value={user?.displayName}
                  readOnly
                />
              </div>

              {/* Tourist Email */}
              <div className="mb-4">
                <label className="block text-gray-400 font-medium mb-2">
                  Tourist Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                  value={user?.email}
                  readOnly
                />
              </div>
            </div>

            {/* Tourist Image URL */}
            <div className="mb-4">
              <label className="block text-gray-400 font-medium mb-2">
                Tourist Image
              </label>
              {/* <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                value="https://example.com/image.jpg"
                readOnly
              /> */}
              <img
                src={user?.photoURL}
                className="rounded-full w-32 h-32 object-cover"
                alt=""
              />
            </div>
            <div className="grid md:grid-cols-4 gap-5">
              <div className="grid md:grid-cols-2 gap-5 col-span-3">
                {/* Price */}
                <div className="mb-4">
                  <label className="block  font-medium mb-2">
                    Price
                  </label>
                  <input
                    required
                    type="number"
                    name="price"
                    className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter price"
                  />
                </div>
                {/* Tour Guide Name */}
                <div className="mb-4">
                  <label className="block text-gray-400 font-medium mb-2">
                    Tour Guide Name
                  </label>
                  <select
                    required
                    name="tourGuide"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="" disabled>Select a guide</option>

                    {alluser
                      .filter((user) => user.role === "guide")
                      .map((guide, index) => (
                        <option key={index} value={guide.name || guide.id}>
                          {guide.name || "Unnamed Guide"}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Tour Date */}
              <div className="mb-4">
                <label className="block text-gray-400 font-medium mb-2">
                  Tour Date
                </label>
                <DatePicker
                  required
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            {/* Book Now Button */}
            <div className="text-center">
              <button
                disabled={!user}
                to="/confirmation"
                className={` text-white px-6 py-2 rounded-md  focus:outline-none focus:ring-2 w-full ${
                  !user ? "cursor-not-allowed bg-gray-300" : "bg-primary"
                }`}
              >
                Book Now
              </button>
              <p className="mt-5 text-red-500">
                {!user ? "Please Login To Booking Guide" : ""}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
