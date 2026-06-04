import React from 'react';
import Title from "../../components/Title";
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';

const Blogs = () => {
  const blogPosts = [
    {
      title: 'Top 10 Must-Visit Destinations in 2025',
      image: 'https://www.deraresort.com/images/blog-ratargul-swamp-forest-sylhet.jpg',
      category: 'Destinations',
      description: 'Discover the top travel destinations that are trending this year. From ancient wonders to tropical paradises, we’ve got you covered!',
    },
    {
      title: 'A Complete Guide to Traveling Solo',
      image: 'https://cosmosgroup.sgp1.digitaloceanspaces.com/news/details/8949351_Bichanakandi%20sylhet%20Bangladesh%20Tourist%20Place.jpg',
      category: 'Travel Tips',
      description: 'Traveling solo can be an enriching experience. Here’s everything you need to know to have a successful, safe, and enriching solo trip.',
    },
    {
      title: 'Adventure Activities for Thrill Seekers',
      image: 'https://i.ibb.co.com/nBbgwvF/images.jpg',
      category: 'Adventure',
      description: 'For those who love an adrenaline rush, here’s a list of the most thrilling adventure activities you must try on your next wilderness journey.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Title 
        heading="Tourism Blog" 
        text="Explore the world of travel, culture, and itinerary tips with our latest articles." 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {blogPosts.map((post, idx) => (
          <Card
            key={idx}
            image={post.image}
            title={post.title}
            subtitle={post.category}
            className="flex flex-col h-full bg-white dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
              {post.description}
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-auto">
              <span className="text-xs font-semibold text-slate-400">5 min read</span>
              <Button variant="ghost" size="sm" className="font-bold text-primary hover:text-primary-dark">
                Read Article
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
