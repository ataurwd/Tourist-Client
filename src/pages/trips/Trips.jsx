import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Title from "../../components/Title";

const Trips = () => {
  const secureAxios = useAxios();
  const [sortOrder, setSortOrder] = useState(null);

  const { data: packageItem = [] } = useQuery({
    queryKey: ["allpackages"],
    queryFn: async () => {
      const response = await secureAxios.get(`/packages/all`);
      return response.data;
    },
  });

  // Function to sort packages
  const sortedPackages = [...packageItem].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="lg:px-16 md:px-10 px-4">
      <div className="">
        <Title
          heading={"Explore All Trip Packages"}
          text={
            "Discover the perfect trip tailored to your interests! From serene escapes to adrenaline-pumping adventures, explore a variety of packages designed to suit every traveler."
          }
        />
        <div className="flex justify-center">
          <button
            onClick={() => setSortOrder("asc")}
            className="btn ml-2 bg-primary text-white"
          >
            Sort by ascending price
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className="btn ml-2 bg-primary text-white"
          >
            Sort by descending price
          </button>
        </div>
      </div>
      {/* to show all packages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {sortedPackages.map((tour) => (
          <div key={tour._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={tour.images[0]}
                className="object-cover w-full h-72"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <div className="badge badge-outline">{tour.packageName}</div>
              <p>{tour.aboutTour.slice(0, 50)}...</p>
              <p>
                <span className="font-bold">Price: </span>
                {tour.price} $
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/pakage/details/${tour._id}`}
                  className="px-5 py-1 rounded-md shadow-sm text-white font-semibold bg-primary"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
