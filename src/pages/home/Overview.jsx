import React from 'react';

const Overview = () => {
    return (
<section className="bg-gray-100 py-16">
  <div className="container mx-auto px-6 lg:px-20">
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">
        Explore the World with Us
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Our platform helps you discover breathtaking destinations, plan your dream vacations, and create unforgettable memories. Watch the video below to learn more about what we offer and why travelers around the world love us.
      </p>
    </div>

    <div className="mt-10">
      {/* Full-Width Video */}
      <div className="relative w-full" style={{ paddingTop: "40.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/nt-wWlaSjc8?si=Y4EGZ4YP0GlvHGqR"
          title="Discover the World - Travel Guide"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  </div>
</section>

    );
};

export default Overview;