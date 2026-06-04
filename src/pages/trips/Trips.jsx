import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Title from "../../components/Title";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import SkeletonCard from "../../components/shared/SkeletonCard";
import { HiSearch } from "react-icons/hi";

const Trips = () => {
  const secureAxios = useAxios();
  const [sortOrder, setSortOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: packageItem = [], isLoading } = useQuery({
    queryKey: ["allpackages"],
    queryFn: async () => {
      const response = await secureAxios.get(`/packages/all`);
      return response.data;
    },
  });

  // Filter packages based on search query
  const filteredPackages = packageItem.filter((tour) =>
    tour.packageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort filtered packages
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else if (sortOrder === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Title
        heading="Explore All Trip Packages"
        text="Discover the perfect trip tailored to your interests! Filter and sort our curated itineraries designed to suit every traveler."
      />

      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 p-5 rounded-2xl shadow-sm mb-10">
        
        {/* Search input */}
        <div className="relative w-full md:max-w-md">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by destination or package name..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200 text-sm font-medium"
          />
        </div>

        {/* Sort Actions */}
        <div className="flex w-full md:w-auto items-center gap-3">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider hidden sm:inline">
            Price Sort:
          </span>
          <Button
            variant={sortOrder === "asc" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? null : "asc")}
            className="font-bold flex-1 sm:flex-initial"
          >
            Low to High
          </Button>
          <Button
            variant={sortOrder === "desc" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSortOrder(sortOrder === "desc" ? null : "desc")}
            className="font-bold flex-1 sm:flex-initial"
          >
            High to Low
          </Button>
        </div>
      </div>

      {/* Package List Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      ) : sortedPackages.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-750">
          <p className="text-slate-400 dark:text-slate-500 text-lg font-medium mb-3">No packages matched your filter criteria.</p>
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="font-bold text-primary">
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPackages.map((tour) => (
            <Card
              key={tour._id}
              image={tour.images[0]}
              title={tour.packageName}
              subtitle="EXPERIENCE TRIP"
              badge={
                <span className="bg-primary/95 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-premium">
                  ${tour.price}
                </span>
              }
              className="flex flex-col h-full bg-white dark:bg-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                {tour.aboutTour}
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/85 pt-4 mt-auto">
                <Link to={`/pakage/details/${tour._id}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full font-bold">
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trips;
