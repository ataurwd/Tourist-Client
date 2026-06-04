import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const Heading = () => {
  const slides = [ 
    {
      id: 1,
      title: "Discover The Unexplored World",
      tagline: "JOURNEY OF A LIFETIME",
      description: "Embark on an epic voyage to the world's most breathtaking, hidden coordinates. Whether you crave serene beaches, towering mountain peaks, or rich cultural treasures, your guide starts here.",
      bgImage: "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image028.jpg",
    },
    {
      id: 2,
      title: "Adventure Awaits, Are You Ready?",
      tagline: "THRILL & WILDLIFE EXPEDITIONS",
      description: "From alpine treks to private cruises, the adventure of a lifetime is just a booking away. Let us connect you with vetted local guides who bring the destination to life.",
      bgImage: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1e/4a/33/pangthumai-waterfall.jpg?w=1200&h=700&s=1",
    },
    {
      id: 3,
      title: "Your Dream Escape Starts Here",
      tagline: "BESPOKE TRAVEL PACKAGES",
      description: "Looking for a sanctuary to unwind? Browse our premium, custom-tailored travel packages designed to deliver the perfect harmony of relaxation, luxury, and exploration.",
      bgImage: "https://www.rjtravelagency.com/wp-content/uploads/2023/09/Bangladesh.jpg",
    },
  ];

  return (
    <div className="relative overflow-hidden w-full h-[85vh] -mt-24">
      <AwesomeSlider
        bullets={true}
        organicArrows={true}
        className="w-full h-full"
        style={{ 
          "--slider-height-percentage": "85%",
          "--loader-bar-color": "#10b981",
          "--loader-bar-height": "4px"
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-full h-full flex flex-col justify-center items-center text-white text-center px-4"
            style={{
              backgroundImage: `url(${slide.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Immersive Dark Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/40 z-10" />

            {/* Glowing blur effects */}
            <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/15 blur-3xl z-10"></div>

            {/* Content Area */}
            <div className="relative z-20 max-w-4xl mx-auto space-y-6 px-4 animate-fade-in-up">
              <span className="inline-block text-xs md:text-sm font-bold tracking-widest text-primary bg-primary/10 border border-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full uppercase">
                {slide.tagline}
              </span>
              <h1 className="text-3xl md:text-6xl font-black font-display tracking-tight leading-tight text-white drop-shadow-md">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-sm">
                {slide.description}
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#packages"
                  className="w-full sm:w-auto px-7 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow-premium transition duration-300 transform hover:-translate-y-0.5"
                >
                  Explore Packages
                </a>
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-7 py-3 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl backdrop-blur-sm transition duration-300"
                >
                  Contact Expert
                </a>
              </div>
            </div>
          </div>
        ))}
      </AwesomeSlider>
      
      {/* Bottom curved card cut overlay to transition into main layout */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-50 dark:bg-slate-950 z-20 rounded-t-3xl border-t border-slate-100 dark:border-slate-800/20"></div>
    </div>
  );
};

export default Heading;