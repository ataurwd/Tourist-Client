import React from "react";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sophia Wilson",
    review:
      "Our trip was beyond expectations! The guides were friendly, and the experience was unforgettable. Highly recommended!",
    location: "Paris, France",
  },
  {
    id: 2,
    name: "James Anderson",
    review:
      "I had an amazing safari experience. The wildlife and the landscapes were breathtaking! Will definitely book again.",
    location: "Serengeti, Tanzania",
  },
  {
    id: 3,
    name: "Emily Carter",
    review:
      "The beach resort was perfect for a relaxing getaway. Beautiful sunsets, delicious food, and great service!",
    location: "Bali, Indonesia",
  },
];

const Testimonial = () => {
  return (
    <section className=" py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-8">
          What Our Travelers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white shadow-lg rounded-lg p-6 relative"
            >
              <FaQuoteLeft className="text-3xl text-blue-400 absolute -top-5 left-4 bg-white p-2 rounded-full" />
              <p className="text-gray-700 italic mb-4">{testimonial.review}</p>
              <div className="flex items-center justify-center">
                <FaUserCircle className="text-5xl text-gray-400 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
