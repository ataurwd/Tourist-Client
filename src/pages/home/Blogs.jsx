import React from 'react';

const Blogs = () => {
  const blogPosts = [
    {
      title: 'Top 10 Must-Visit Destinations in 2025',
      image: 'https://www.deraresort.com/images/blog-ratargul-swamp-forest-sylhet.jpg',
      description: 'Discover the top travel destinations that are trending this year. From ancient wonders to tropical paradises, we’ve got you covered!',
    },
    {
      title: 'A Guide to Traveling Solo',
      image: 'https://cosmosgroup.sgp1.digitaloceanspaces.com/news/details/8949351_Bichanakandi%20sylhet%20Bangladesh%20Tourist%20Place.jpg',
      description: 'Traveling solo can be an enriching experience. Here’s everything you need to know to have a successful solo trip.',
    },
    {
      title: 'Best Adventure Activities for Thrill Seekers',
      image: 'https://i.ibb.co.com/nBbgwvF/images.jpg',
      description: 'For those who love an adrenaline rush, here’s a list of the most thrilling adventure activities you must try on your next trip.',
    },
  ];

  return (
    <section className="py-16 md:px-28 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary underline">Tourism Blog</h2>
        <p className="text-gray-600 mt-2">Explore the world of travel with our latest articles</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {blogPosts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
          >
            <img
              className="w-full h-60 object-cover"
              src={post.image}
              alt={post.title}
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 mt-4">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
