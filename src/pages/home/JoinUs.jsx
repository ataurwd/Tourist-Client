import React from "react";
import Title from "../../components/Title";
import { motion } from "framer-motion";

const JoinUs = () => {
  const countries = [
    {
      id: 1,
      name: "France",
      description: "Rich history, architecture, and gourmet culinary experiences.",
      touristSpot: "Eiffel Tower",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbLIYwKpcMLfIl6Gac98JSAf5TNN0JI2K7Qw&s",
    },
    {
      id: 2,
      name: "Japan",
      description: "Contrasts of ancient temples, neon lights, and Mt. Fuji scenery.",
      touristSpot: "Mount Fuji",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9F3Ch8VMg8W8maHQUGGuegZFr9XSws84AiA&s",
    },
    {
      id: 3,
      name: "Italy",
      description: "Extraordinary cultural heritage, historic ruins, and pasta wonders.",
      touristSpot: "Colosseum",
      image: "https://images.javatpoint.com/tourist-places/images/tourist-places-in-italy2.png",
    },
    {
      id: 4,
      name: "Australia",
      description: "The Great Barrier Reef, coastal cities, and iconic outback terrains.",
      touristSpot: "Sydney Opera House",
      image: "https://assets.traveltriangle.com/blog/wp-content/uploads/2015/09/Sydney_Opera_House_-_Dec_2008.jpg",
    },
    {
      id: 5,
      name: "Brazil",
      description: "Vibrant beaches, Amazon wilderness, and Christ the Redeemer.",
      touristSpot: "Christ the Redeemer",
      image: "https://images.javatpoint.com/tourist-places/images/tourist-places-in-brazil3.png",
    },
  ];

  return (
    <div className="relative py-20 overflow-hidden bg-slate-50/50 dark:bg-slate-900/10 border-y border-slate-100 dark:border-slate-800/40">
      {/* Subtle world map background overlay */}
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none"
        style={{
          backgroundImage: "url('https://demo.egenslab.com/html/tourxpro/demo/assets/images/banner/map-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Title
          heading="Explore The World"
          text="Embark on cross-continental journeys and explore premium global locations with seasoned travel packages."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
          {countries.map((country) => (
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              initial={{ y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={country.id}
              className="group h-[320px] rounded-2xl relative overflow-hidden cursor-pointer shadow-premium hover:shadow-premium-hover border border-slate-100 dark:border-slate-800/50 bg-slate-800"
            >
              {/* Background Cover Image */}
              <img
                src={country.image}
                alt={country.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent group-hover:from-primary-dark/95 transition-all duration-300"></div>

              {/* Content Panel */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary group-hover:text-white transition-colors duration-300">
                  {country.touristSpot}
                </span>
                <h3 className="text-xl font-bold font-display leading-tight mt-1 mb-2 group-hover:translate-x-1 transition-transform">
                  {country.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3">
                  {country.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
