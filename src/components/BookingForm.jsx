import React, { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormContext } from "./../context/FormData";
import useAllUser from "../hooks/useAllUser";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const { user } = useContext(FormContext);
  const [alluser] = useAllUser();
console.log(alluser)
  const handelBooking = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = user?.displayName;
    const email = user?.email;
    const photo = user?.photoURL;
    const price = form.price.value;
    const date = selectedDate.toLocaleDateString();
    const tourGuide = form.tourGuide.value;
    const formData = { name, email, photo, price, date, tourGuide };

    console.log(formData);
  };
  return (
    <div>
      <div className="flex justify-center items-center mt-10">
        <div className="bg-white p-8 rounded-lg w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Book Your Tour{}
          </h2>
          <form onSubmit={handelBooking}>
            <div className="grid grid-cols-2 gap-5">
              {/* Tourist Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
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
                <label className="block text-gray-700 font-medium mb-2">
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
              <label className="block text-gray-700 font-medium mb-2">
                Tourist Image
              </label>
              {/* <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                value="https://example.com/image.jpg"
                readOnly
              /> */}
              <img src={user?.photoURL} className="rounded-full" alt="" />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="grid grid-cols-2 gap-5 col-span-3">
                {/* Price */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter price"
                  />
                </div>
                {/* Tour Guide Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Tour Guide Name
                  </label>
                  <select
                    name="tourGuide"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a guide</option>

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
                <label className="block text-gray-700 font-medium mb-2">
                  Tour Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholderText="Select a date"
                />
              </div>
            </div>

            {/* Book Now Button */}
            <div className="text-center">
              <button
                to="/confirmation"
                className="bg-primary text-white px-6 py-2 rounded-md  focus:outline-none focus:ring-2 w-full"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
