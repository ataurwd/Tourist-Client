import React, { useState } from "react";
import usePackage from "../../hooks/usePackage";
import Title from "./../../components/Title";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Trips = () => {
  const { data: packageItem = [] } = useQuery({
    queryKey: ["allpackages"],
    queryFn: async () => {
      const response = await axios(`${import.meta.env.VITE_URL}/packages/all`);
      return response.data;

    },
  });
  return (
    <div className="lg:px-16 md:px-10 px-4">
      <Title
        heading={"Explore All Trip Packages"}
        text={
          "Discover the perfect trip tailored to your interests! From serene escapes to adrenaline-pumping adventures, explore a variety of packages designed to suit every traveler."
        }
      />
      {/* to show all package */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {packageItem.map((tour) => (
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
                <Link to={`/pakage/details/${tour._id}`} className="px-5 py-1 rounded-md shadow-sm text-white font-semibold bg-primary">
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
