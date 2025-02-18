import React from "react";
import { FaHandshake, FaShieldAlt, FaClock } from "react-icons/fa";

const WhyChoseUs = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white py-24 my-5"
      style={{
        backgroundImage: "url('https://mtsobek.imgix.net/2023/10/Europe-Italy-Trekkers-Following-Age-Old-Trails-Past-Secret-Mountain-Lakes-near-the-Mont-Blanc-Mountains-in-the-Alps-scaled.jpg?fm=pjpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reason 1 */}
          <div className="flex flex-col items-center">
            <FaHandshake className="text-6xl text-blue-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Trusted Service</h3>
            <p className="text-lg">
              We provide reliable and professional service you can trust.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="flex flex-col items-center">
            <FaShieldAlt className="text-6xl text-green-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Secure & Safe</h3>
            <p className="text-lg">
              Your safety is our priority with industry-standard security.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="flex flex-col items-center">
            <FaClock className="text-6xl text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-lg">
              Our dedicated team is available 24/7 to assist you anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoseUs;
