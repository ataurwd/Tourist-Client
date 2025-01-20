import React from "react";
import Title from "../../components/Title";
import { FaTelegramPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const JoinUs = () => {
  const countries = [
    {
      id: 1,
      name: "France",
      description:
        "France is known for its rich history, stunning architecture, and culinary delights.",
      touristSpot: "Eiffel Tower",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbLIYwKpcMLfIl6Gac98JSAf5TNN0JI2K7Qw&s",
    },
    {
      id: 2,
      name: "Japan",
      description:
        "Japan is a land of contrasts, blending traditional culture with modern technology.",
      touristSpot: "Mount Fuji",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9F3Ch8VMg8W8maHQUGGuegZFr9XSws84AiA&s",
    },
    {
      id: 3,
      name: "Italy",
      description:
        "Italy boasts an extraordinary cultural heritage, from art to architecture, and is famous for its cuisine.",
      touristSpot: "Colosseum",
      image:
        "https://images.javatpoint.com/tourist-places/images/tourist-places-in-italy2.png",
    },
    {
      id: 4,
      name: "Australia",
      description:
        "Australia offers a diverse landscape, from the Great Barrier Reef to its bustling cities and outback.",
      touristSpot: "Sydney Opera House",
      image:
        "https://assets.traveltriangle.com/blog/wp-content/uploads/2015/09/Sydney_Opera_House_-_Dec_2008.jpg",
    },
    {
      id: 5,
      name: "Brazil",
      description:
        "Brazil is known for its vibrant culture, beautiful beaches, and iconic landmarks like the Christ the Redeemer statue.",
      touristSpot: "Christ the Redeemer",
      image:
        "https://images.javatpoint.com/tourist-places/images/tourist-places-in-brazil3.png",
    },
  ];

  return (
    <div className="md:mt-20">
      <div
        className="md:h-[450px] relative py-10"
        style={{
          backgroundImage:
            "url('https://demo.egenslab.com/html/tourxpro/demo/assets/images/banner/map-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Title
          heading={"Explore The World"}
          text={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores totam beatae nam nobis accusantium cum alias voluptas aliquid tempore ducimus."
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 place-items-center px-5 sm:px-10 md:px-20 lg:px-32 relative">
          {countries.map((country) => (
            <motion.div
              whileHover={{ y: -5 }}
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              key={country.id}
              className="w-full sm:w-48 h-40 rounded-md relative group overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${country.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Image overlay on hover */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

              {/* Text container */}
              <div className="absolute p-3 bottom-0 w-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h1 className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                  {country.name}
                </h1>
                <p className="text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {country.description.slice(0, 40)}...
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
