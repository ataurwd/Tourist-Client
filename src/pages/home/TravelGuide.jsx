import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import usePackage from "./../../hooks/usePackage";
import Title from "../../components/Title";

const TravelGuide = () => {
  const [packageItem] = usePackage();
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
                  <div className="badge badge-outline">{tour.aboutTour}</div>
                  <p>{tour.packageName}</p>
                  <p>
                    <span className="font-bold">Price: </span>
                    {tour.price} $
                  </p>
                  <div className="card-actions justify-end">
                    <button className="px-5 py-1 rounded-md shadow-sm text-white font-semibold bg-primary">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TravelGuide;
