import React from "react";
import { useLoaderData } from "react-router-dom";
import Title from "./Title";

const PackageDetails = () => {
  const data = useLoaderData();
  return (
    <div className="lg:px-32 lg:mt-10 md:px-16 px-3 md:mt-5 mt-2">
      <div className="grid grid-cols-2 gap-4">
        {/* First Image: Spans 1 column and 2 rows */}
        <div className="row-span-2">
          <img
            src={data.images[0]}
            alt="First"
            className="w-full md:h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Second Image */}
        <div>
          <img
            src={data.images[1]}
            alt="Second"
            className="w-full md:h-[240px] object-cover rounded-lg"
          />
        </div>

        {/* Third Image */}
        <div>
          <img
            src={data.images[2]}
            alt="Third"
            className="w-full md:h-[240px] object-cover rounded-lg"
          />
        </div>
      </div>

      <div className="text-center md:my-10 space-y-3">
        <h1 className="text-3xl font-semibold">
          Explore the Highlights of Your Adventure
        </h1>
        <p className="w-2/3 mx-auto">package name {data.aboutTour}</p>
      </div>

      <div>
        <Title
          heading={"Tour Plan"}
          text={
            "Discover the highlights of your journey with our detailed tour plan. From exciting activities to must-visit destinations, we ve crafted the perfect itinerary to make your trip unforgettable."
          }
        />
        <div className="join join-vertical w-full my-5 space-y-3">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl">
             <span className="font-semibold text-primary">Day 1: </span> {data.faqs[0].question}
            </div>
            <div className="collapse-content">
              <p>{data.faqs[0].answer}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
            <span className="font-semibold text-primary">Day 1: </span> {data.faqs[1].question}
            </div>
            <div className="collapse-content">
            <p>{data.faqs[1].answer}</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
            <span className="font-semibold text-primary">Day 1: </span> {data.faqs[2].question}
            </div>
            <div className="collapse-content">
            <p>{data.faqs[2].answer}</p>
            </div>
          </div>
        </div>


        TODO: need to added all guide information here 
      </div>
    </div>
  );
};

export default PackageDetails;
