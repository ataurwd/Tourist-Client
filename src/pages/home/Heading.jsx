import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
const Heading = () => {
    const slides = [ 
        {
          id: 1,
          title: "Discover the World",
          description: "Embark on a journey to the world's most beautiful and breathtaking destinations. Whether you're looking for serene beaches, vibrant cities, or cultural treasures, we've got the perfect trip for you",
          bgImage:
            "https://blog.flyticket.com.bd/wp-content/uploads/2020/05/image028.jpg",
        },
        {
          id: 2,
          title: "Adventure Awaits, Are You Ready?",
          description: "From thrilling mountain hikes to exciting city tours, the adventure of a lifetime is just a click away. Choose your next exciting experience with us and make memories that last forever",
          bgImage:
            "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1e/4a/33/pangthumai-waterfall.jpg?w=1200&h=700&s=1",
        },
        {
          id: 3,
          title: "Your Dream Vacation Starts Here",
          description: "Looking for a getaway to relax and recharge? Browse our handpicked travel packages, tailored to give you the perfect balance of relaxation and exploration. Let us help you plan the vacation you've always dreamed of.",
          bgImage:
            "https://www.rjtravelagency.com/wp-content/uploads/2023/09/Bangladesh.jpg",
        },
      ];
  return (
    <div>
      <AwesomeSlider bullets={false} style={{ height: "90vh" }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              position: "relative",
              backgroundImage: `url(${slide.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
              margin: 0, 
            }}
          >
            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)", 
                zIndex: 1,
              }}
            />
            {/* Content */}
            <div className="relative z-20">
              <h1 className="md:text-5xl text-2xl mb-4 px-5 font-bold text-secondary">
                {slide.title}
              </h1>
              <p className="md:text-md mx-auto max-w-2xl px-5">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </AwesomeSlider>
    </div>
    );
};

export default Heading;