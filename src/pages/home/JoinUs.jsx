import React from "react";
import Title from "../../components/Title";
import { motion } from "framer-motion";

const JoinUs = () => {
  const countries = [
  {
    id: 1,
    name: "France",
    description:
      "Discover world-renowned architecture, exquisite cuisine, charming villages, and timeless cultural heritage.",
    touristSpot: "Eiffel Tower",
    image:
      "https://i.ibb.co.com/vxV6dhSM/download-1.jpg",
  },
  {
    id: 2,
    name: "Japan",
    description:
      "Experience the perfect blend of ancient traditions, futuristic cities, breathtaking landscapes, and exceptional hospitality.",
    touristSpot: "Mount Fuji",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Italy",
    description:
      "Explore historic landmarks, artistic masterpieces, scenic coastlines, and authentic Mediterranean cuisine.",
    touristSpot: "Colosseum",
    image:
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Australia",
    description:
      "From vibrant cities to natural wonders, enjoy diverse wildlife, stunning beaches, and unforgettable adventures.",
    touristSpot: "Sydney Opera House",
    image:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Brazil",
    description:
      "Immerse yourself in vibrant culture, tropical landscapes, world-famous festivals, and breathtaking coastlines.",
    touristSpot: "Christ the Redeemer",
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    name: "Switzerland",
    description:
      "Experience majestic alpine scenery, pristine lakes, luxury travel, and picturesque mountain villages.",
    touristSpot: "Matterhorn",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
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

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
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
