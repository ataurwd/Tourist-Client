import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center  p-6">
      {/* Left Side - Contact Info & Map */}
      <div className="md:w-1/2 w-full p-6   rounded-lg">
        <h2 className="text-2xl font-bold text-gray-400">Contact Us</h2>
        <p className="text-gray-400 mt-2">
          Have any questions? We'd love to hear from you!
        </p>

        <div className="mt-4">
          <p className="text-gray-400">
            📍 <strong>Address:</strong> 123 Main Street, New York, USA
          </p>
          <p className="text-gray-400">
            📞 <strong>Phone:</strong> +1 234 567 890
          </p>
          <p className="text-gray-400">
            📧 <strong>Email:</strong> contact@example.com
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="mt-4">
          <iframe
            className="w-full h-64 rounded-lg shadow-md"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=New+York"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="md:w-1/2 w-full p-6  rounded-lg mt-6 md:mt-0 md:ml-6">
        <h2 className="text-2xl font-bold text-gray-400">Send a Message</h2>
        <p className="text-gray-600 mt-2">We will get back to you soon.</p>

        <form className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-400">Your Name</label>
            <input
              type="text"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Email Address</label>
            <input
              type="email"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Your Message</label>
            <textarea
              rows="4"
              className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-400 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
