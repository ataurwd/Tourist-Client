import React, { useState } from "react";
import Title from "../../components/Title";

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(0);
  const toggle = ({ currentIdx }) =>
    setIsOpen((prevIdx) => (prevIdx === currentIdx ? null : currentIdx));
  
  const sliders = [
    {
      img: "https://www.deraresort.com/images/blog-ratargul-swamp-forest-sylhet.jpg",
      title: "Ratargul Swamp Forest",
      location: "Sylhet, Bangladesh",
    },
    {
      img: "https://www.atab.org.bd/public/uploads/backend/posts/Zqide1683452387-sub-img-2.jpg",
      title: "Bandarban Hills",
      location: "Chittagong, Bangladesh",
    },
    {
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/ce/fc/c1/caption.jpg?w=500&h=400&s=1",
      title: "Sajek Valley",
      location: "Rangamati, Bangladesh",
    },
    {
      img: "https://cosmosgroup.sgp1.digitaloceanspaces.com/news/details/8949351_Bichanakandi%20sylhet%20Bangladesh%20Tourist%20Place.jpg",
      title: "Bichanakandi Stone Quarry",
      location: "Sylhet, Bangladesh",
    },
    {
      img: "https://www.gokitetours.com/wp-content/uploads/2024/07/Top-10-Tourist-Places-to-Visit-in-Bangladesh.webp",
      title: "Cox's Bazar Beach",
      location: "Cox's Bazar, Bangladesh",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* Gallery Info Column */}
        <div className="space-y-4">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
            Visual Gallery
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            Explore local spots
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Click on any scenic destination slide to expand the view and reveal travel guides, geographic location, and local details.
          </p>
        </div>

        {/* Dynamic Accordion Column */}
        <div className="lg:col-span-2">
          <div className="flex flex-row h-[350px] md:h-[450px] gap-2 md:gap-4 overflow-hidden rounded-3xl p-1 cursor-pointer">
            {sliders.map((slide, idx) => {
              const active = isOpen === idx;
              return (
                <div
                  key={idx}
                  onClick={() => toggle({ currentIdx: idx })}
                  className={`relative h-full rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active ? "flex-grow-[4] md:flex-grow-[5]" : "flex-grow-[1] md:flex-grow-[1.2]"
                  }`}
                >
                  <img
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={slide.img}
                    alt={slide.title}
                  />
                  
                  {/* Backdrop Gradient for text legibility */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent transition-opacity duration-500 ${
                    active ? "opacity-100" : "opacity-40"
                  }`} />
                  
                  {/* Floating Avatar Trigger */}
                  <img
                    className={`absolute bottom-6 border-2 border-white dark:border-slate-800 transition-all duration-700 h-10 w-10 md:h-[50px] md:w-[50px] rounded-full object-cover ${
                      active 
                        ? "left-6 rotate-360 scale-110" 
                        : "left-1/2 -translate-x-1/2"
                    }`}
                    src={slide.img}
                    alt={slide.title}
                  />
                  
                  {/* Expanded Content Label */}
                  <div
                    className={`absolute bottom-6 left-20 md:left-24 right-4 text-white transition-all duration-500 transform ${
                      active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                      {slide.location}
                    </span>
                    <h3 className="text-md md:text-xl font-bold font-display leading-tight truncate">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
