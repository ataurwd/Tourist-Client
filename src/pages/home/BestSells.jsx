import React from "react";
import Heading from "./Heading";
import Title from "../../components/Title";

const BestSells = () => {
  const data = [
    {
      id: 1,
      title: "Eiffel Tower Tour",
      price: 549.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYaU-bmC48eHwIxoiybPXSRcJP-OOdqS19g&s",
    },
    {
      id: 2,
      title: "Great Wall of China Expedition",
      price: 999.99,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/250px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    },
    {
      id: 3,
      title: "Santorini Sunset Cruise",
      price: 979.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcGLU1A18vbbv0F7VyY8F6hXTCLiXtu2V5Xw&s",
    },
    {
      id: 4,
      title: "Grand Canyon Hiking Adventure",
      price: 929.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyZDuCOWgvTbLheX2cVVE2B1a4gfAujtEOA&s",
    },
    {
      id: 5,
      title: "Machu Picchu Guided Tour",
      price: 749.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUyx81SjGvZiN4gB2GOG38a6LZEvxXfCpUzA&s",
    },
    {
      id: 6,
      title: "Safari in Serengeti National Park",
      price: 2199.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgO4kdgy-nTy0gS2xYm_I99cEmoLfAsCR6Cw&s",
    },
  ];

  return (
    <div>
      <Title heading={"BEST OFFERS"} text={" CHECKOUT OUR TOP-RATED TOURS"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:px-28 px-4">
        {data.map((spot) => (
          <div
            key={spot.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105"
          >
            <img
              src={spot.img}
              alt={spot.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex  items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                {spot.title}
              </h2>
              <p className="text-gray-600 text-lg font-medium mt-2">
                ${spot.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSells;
