import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import usePackage from "./../../hooks/usePackage";
import Title from "../../components/Title";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Card from "../../components/shared/Card";
import Button from "../../components/shared/Button";
import SkeletonCard from "../../components/shared/SkeletonCard";

const TravelGuide = () => {
  const [packageItem, isPackagesLoading] = usePackage();

  const { data: guideData = [], isLoading: isGuidesLoading } = useQuery({
    queryKey: ["allGuidesOnly"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/all-guides`);
      return res.data;
    },
  });

  return (
    <div id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      <Title
        heading="Tourism and Travel Guide"
        text="Discover tailored packages curated by local experts or consult directly with certified tour guides to build your custom itinerary."
      />

      <Tabs className="w-full">
        {/* Custom Tab List */}
        <div className="flex justify-center mb-10">
          <TabList className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
            <Tab
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer focus:outline-none transition-all"
              selectedClassName="bg-primary text-white shadow-premium"
            >
              Our Packages
            </Tab>
            <Tab
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer focus:outline-none transition-all"
              selectedClassName="bg-primary text-white shadow-premium"
            >
              Meet Our Guides
            </Tab>
          </TabList>
        </div>

        {/* Packages Panel */}
        <TabPanel>
          {isPackagesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packageItem.slice(0, 3).map((tour) => (
                <Card
                  key={tour._id}
                  image={tour.images[0]}
                  title={tour.packageName}
                  subtitle="EXPERIENCE TRIP"
                  badge={
                    <span className="bg-primary/90 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-premium">
                      ${tour.price}
                    </span>
                  }
                  className="flex flex-col h-full"
                >
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                    {tour.aboutTour}
                  </p>
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-auto">
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
        </TabPanel>

        {/* Guides Panel */}
        <TabPanel>
          {isGuidesLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="shimmer-bg h-48 rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {guideData.map((item) => (
                <Link
                  to={`/guide/${item._id}`}
                  key={item._id}
                  className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col items-center"
                >
                  <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img
                      className="w-20 h-20 object-cover rounded-full border-2 border-primary/20 group-hover:border-primary shadow-sm relative z-10"
                      src={item.photo}
                      alt={item.name}
                    />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display line-clamp-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h4>
                  <span className="text-xs text-slate-400 capitalize mt-1">
                    {item.role || "Guide"}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TravelGuide;
