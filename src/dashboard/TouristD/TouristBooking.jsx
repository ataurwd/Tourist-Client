import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { FormContext } from "../../context/FormData";

const TouristBooking = () => {
  const [showCongrats, setShowCongrats] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const {user} = useContext(FormContext)

  const [product, setProduct] = useState([]);
  // for set total data count
  const [count, totalCount] = useState(0);
  // for update current page data
  const [currentPage, setCurrentPage] = useState(0);
  // for set how many item we want to show
  const [item, setItem] = useState(10);

  // for calculate total number of page
  const numberOfpage = Math.ceil(count / item);

  // for looping all pagination items
  const pages = [...Array(numberOfpage).keys()];

  // for get data fetching
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/guide-booking/${user.email}?page=${currentPage}&size=${item}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [currentPage, item]);

  // for get total count of data
  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/countGuide/${user.email}`)
      .then((res) => res.json())
      .then((data) => totalCount(data.result));
  }, []);

  // handel drop down item
  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItem(val);
    setCurrentPage(0);
  };

  // This will store the number of bookings the user has made
  const bookingCount = product.length;

  useEffect(() => {
    // Check if the user has more than 3 bookings
    if (bookingCount >= 3) {
      setShowCongrats(true);
      setButtonEnabled(true);
    } else {
      setShowCongrats(false);
      setButtonEnabled(false);
    }
  }, [product]);

  const handleCancel = async (id) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_URL}/guide-booking/${id}`
    );
    if (res.data.deletedCount) {
      Swal.fire({
        title: "Package Deleted Successfully",
        icon: "success",
        draggable: false,
      });
      const updatedBookings = product.filter(
        (booking) => booking._id !== id
      );
      refetch();
      if (updatedBookings.length <= 3) {
        setShowCongrats(false);
        setButtonEnabled(false);
      }
    }
  };

  return (
    <div className="overflow-x-auto my-10 md:px-10">
      {showCongrats && (
        <div className="relative my-5">
          <Confetti className="w-full" />
          <div className="bg-green-100 text-primary py-3 px-5 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Congratulations!</h2>
            <p>
              You have unlocked a special discount for booking more than 3
              times!
            </p>
            <button
              disabled={!buttonEnabled}
              className={`mt-3 px-4 py-2 rounded-md ${
                buttonEnabled
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              Apply Discount
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-medium text-gray-700">
              #
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
          {product.map((booking, index) => (
            <tr key={booking._id}>
              <td className="px-6 py-3 border-b border-gray-300">
                {index + 1}
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
                  onClick={() => handleCancel(booking._id)}
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

            {/* Pagination */}
            <div className="my-10 flex justify-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 mx-3 rounded-sm ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <select className="border-2 rounded-sm" value={item} onChange={handleItemsPerPage}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default TouristBooking;
