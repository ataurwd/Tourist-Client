import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import Title from "./Title";
import useGuides from "../hooks/useGuides";
import BookingForm from "./BookingForm";
import Button from "./shared/Button";

const PackageDetails = () => {
  const data = useLoaderData();
  const [guides] = useGuides();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in-up">
      {/* Immersive Photo Grid Gallery */}
      <div className="grid md:grid-cols-3 gap-6 rounded-3xl overflow-hidden shadow-premium">
        {/* Large Feature Column */}
        <div className="md:col-span-2 relative group overflow-hidden">
          <img
            src={data.images[0]}
            alt="Feature scenery"
            className="w-full h-80 md:h-[480px] object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
        </div>

        {/* Small Column Stack */}
        <div className="grid grid-rows-2 gap-6 md:col-span-1">
          {data.images.slice(1, 3).map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-2xl md:rounded-none">
              <img
                src={img}
                alt={`Scenery detail ${idx + 1}`}
                className="w-full h-40 md:h-[228px] object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Section */}
      <div className="my-12 p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-sm text-center max-w-4xl mx-auto space-y-4">
        <span className="text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 px-3 py-1 rounded-full">
          Tour Overview
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Explore {data.packageName} Highlights
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          {data.aboutTour}
        </p>
      </div>

      {/* Tour Plan / FAQ Section */}
      <div className="my-16 max-w-4xl mx-auto">
        <Title
          heading="Detailed Tour Plan"
          text="Explore day-by-day itineraries and schedule plans designed to deliver rich exploration time."
        />
        
        {/* Customized accordions list */}
        <div className="space-y-4 mt-8">
          {data.faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl shadow-sm overflow-hidden"
            >
              <details className="group" open={index === 0}>
                <summary className="flex justify-between items-center font-semibold text-slate-700 dark:text-slate-200 p-5 cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                      Day {index + 1}
                    </span>
                    <span className="font-display font-bold text-sm md:text-base">{faq.question}</span>
                  </div>
                  <span className="transition-transform group-open:rotate-180">
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-1 text-slate-500 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-50 dark:border-slate-700/40">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>

      {/* Guides Section */}
      <div className="my-16 max-w-4xl mx-auto">
        <Title heading="Meet Our Dedicated Guides" text="Consult directly with verified local tour guides assigned to manage this package's coordinates." />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {guides.map((item) => (
            <Link
              to={`/guide/${item._id}`}
              key={item._id}
              className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col items-center"
            >
              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  className="w-16 h-16 object-cover rounded-full border-2 border-primary/20 group-hover:border-primary shadow-sm relative z-10"
                  src={item.photo}
                  alt={item.name}
                />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display line-clamp-1 group-hover:text-primary transition-colors">
                {item.name}
              </h4>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mt-1">
                Verified Guide
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Form Slot */}
      <div className="my-16 max-w-4xl mx-auto">
        <BookingForm 
          packageName={data.packageName} 
          packagePrice={data.price} 
          creatorRole={data.creatorRole}
          tourGuide={data.tourGuide}
        />
      </div>
    </div>
  );
};

export default PackageDetails;
