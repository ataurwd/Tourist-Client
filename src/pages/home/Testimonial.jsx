import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Title from "../../components/Title";

const testimonials = [
  {
    id: 1,
    name: "Sophia Wilson",
    review:
      "Our trip was beyond expectations! The guides were friendly, and the experience was unforgettable. Highly recommended!",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 2,
    name: "James Anderson",
    review:
      "I had an amazing safari experience. The wildlife and the landscapes were breathtaking! Will definitely book again.",
    location: "Serengeti, Tanzania",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: 3,
    name: "Emily Carter",
    review:
      "The beach resort was perfect for a relaxing getaway. Beautiful sunsets, delicious food, and great service!",
    location: "Bali, Indonesia",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120"
  },
];

const Testimonial = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Title 
        heading="What Our Travelers Say" 
        text="Real travel stories and feedback shared by members of the Treva tourism community." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="relative bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-8 rounded-2xl shadow-premium hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between"
          >
            {/* Quote Icon */}
            <div className="absolute -top-5 left-6 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <FaQuoteLeft className="h-4 w-4" />
            </div>

            <p className="text-slate-600 dark:text-slate-300 italic text-sm md:text-base leading-relaxed mb-6">
              "{t.review}"
            </p>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-50 dark:border-slate-700/50">
              <img 
                src={t.avatar} 
                alt={t.name} 
                className="w-11 h-11 object-cover rounded-xl border border-slate-100 dark:border-slate-750"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                  {t.name}
                </h4>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {t.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
