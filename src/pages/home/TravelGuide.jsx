import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import usePackage from "./../../hooks/usePackage";
import Title from "../../components/Title";
import { Link } from "react-router-dom";
import useAllUser from "../../hooks/useAllUser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TravelGuide = () => {
  const [packageItem] = usePackage();

  const { data: guideData = [] } = useQuery({
    queryKey: ["allGuidesOnly"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/all-guides`);
      return res.data;
    },
  });

  return (
    <div className="lg:px-20 md:px-10 px-4">
      <Title
        heading={"Tourism and Travel Guide"}
        text={
          "A Tourism and Travel Guide is your essential companion to exploring the world. It serves as a comprehensive resource for travelers, offering valuable information about destinations, attractions, culture, and experiences."
        }
      />
      <Tabs>
        <TabList className={"flex justify-center rounded-md my-5 space-x-2"}>
          <Tab
            className="border text-center px-3 py-1 rounded-[10px] tabstem  cursor-pointer"
            selectedClassName="bg-primary text-white"
          >
            Our Packages
          </Tab>
          <Tab
            className="border text-center px-3 py-1 rounded-[10px] tabstem cursor-pointer"
            selectedClassName="bg-primary text-white"
          >
            Meet Our Tour Guides
          </Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {packageItem.slice(0, 3).map((tour) => (
              <div key={tour._id} className="card bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={tour.images[0]}
                    className="object-cover w-full h-72"
                    alt="Shoes"
                  />
                </figure>
                <div className="card-body">
                  <div className="badge badge-outline border-primary">{tour.packageName}</div>
                  <p>{tour.aboutTour.slice(0, 80)}...</p>
                  <div className="flex  justify-between items-center">
                    <div className="card-actions justify-start">
                      <Link
                        to={`/pakage/details/${tour._id}`}
                        className="px-5 py-1 rounded-md shadow-sm text-black border-2 border-primary font-semibold "
                      >
                        Details
                      </Link>
                    </div>
                    <div>
                      <span className="font-bold">Price: </span>
                      <span className="font-extrabold text-primary">{tour.price}$</span> 
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <Title heading={"Meet Our All Tour Guides"} />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-10">
            {guideData.map((item) => (
              <Link
                to={`/guide/${item._id}`}
                key={item._id}
                className="border grid place-items-center p-5 text-center rounded-md shadow-sm"
              >
                <img
                  className="w-20 h-20 object-cover rounded-full"
                  src={item.photo}
                  alt={item.name}
                />
                <h1>
                  <span className="font-bold">Name:</span> {item.name}
                </h1>
                <p>
                  <span className="font-bold">Role: </span>
                  {item.role}
                </p>
              </Link>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TravelGuide;
