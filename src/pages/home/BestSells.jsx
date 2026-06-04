import React from "react";
import Title from "../../components/Title";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";

const BestSells = () => {
  const data = [
    {
      id: 1,
      title: "Eiffel Tower Tour",
      price: 549.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmYaU-bmC48eHwIxoiybPXSRcJP-OOdqS19g&s",
      location: "Paris, France",
    },
    {
      id: 2,
      title: "Great Wall of China Expedition",
      price: 999.99,
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/The_Great_Wall_of_China_at_Jinshanling-edit.jpg/250px-The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
      location: "Beijing, China",
    },
    {
      id: 3,
      title: "Santorini Sunset Cruise",
      price: 979.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcGLU1A18vbbv0F7VyY8F6hXTCLiXtu2V5Xw&s",
      location: "Santorini, Greece",
    },
    {
      id: 4,
      title: "Grand Canyon Hiking Adventure",
      price: 929.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyZDuCOWgvTbLheX2cVVE2B1a4gfAujtEOA&s",
      location: "Arizona, USA",
    },
    {
      id: 5,
      title: "Machu Picchu Guided Tour",
      price: 749.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUyx81SjGvZiN4gB2GOG38a6LZEvxXfCpUzA&s",
      location: "Cusco, Peru",
    },
    {
      id: 6,
      title: "Safari in Serengeti National Park",
      price: 2199.99,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgO4kdgy-nTy0gS2xYm_I99cEmoLfAsCR6Cw&s",
      location: "Serengeti, Tanzania",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/50 dark:bg-slate-900/10 rounded-3xl border border-slate-100 dark:border-slate-800/40 my-8">
      <Title 
        heading="BEST OFFERS" 
        text="Handpicked top-rated tours featuring premier itineraries, high-end accommodation, and local expert hospitality." 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {data.map((spot) => (
          <Card
            key={spot.id}
            image={spot.img}
            title={spot.title}
            subtitle={spot.location}
            badge={
              <span className="bg-secondary/95 backdrop-blur-sm text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-accent-premium">
                ${spot.price}
              </span>
            }
            className="flex flex-col h-full bg-white dark:bg-slate-800"
          >
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
              <span className="text-xs font-semibold text-slate-400">Limited Slots Left</span>
              <Button variant="primary" size="sm" className="font-bold">
                Book Offer
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BestSells;
