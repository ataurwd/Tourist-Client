import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import SkeletonCard from "../../components/shared/SkeletonCard";
import usePackage from "./../../hooks/usePackage";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const BestSells = () => {
   const [packageItem, , isPackagesLoading] = usePackage();

  const latestTours = packageItem.slice(2, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50/50 dark:bg-slate-900/10 rounded-3xl border border-slate-100 dark:border-slate-800/40 my-8">
      <Title 
        heading="OUR LATEST TOURS" 
        text="Discover our recently added adventure packages featuring premier itineraries, top local guide support, and immersive experiences." 
      />

      {isPackagesLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {latestTours.map((tour) => (
            <Card
              key={tour._id}
              image={tour.images[0]}
              title={tour.packageName}
              subtitle="LATEST ADVENTURE"
              badge={
                <span className="bg-secondary/95 backdrop-blur-sm text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-accent-premium">
                  ${tour.price}
                </span>
              }
              className="flex flex-col h-full bg-white dark:bg-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                {tour.aboutTour}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
                <span className="text-xs font-semibold text-slate-400">Available Slots</span>
                <Link to={`/pakage/details/${tour._id}`}>
                  <Button variant="primary" size="sm" className="font-bold">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
      {/* <div className="flex justifi-center item-center">
        <Button className="mt-6 w-40">See All</Button>
      </div> */}
    </div>
  );
};

export default BestSells;
