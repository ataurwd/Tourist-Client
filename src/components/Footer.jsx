import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center items-center mb-6">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Website Logo"
            className="h-12 w-12 mr-3"
          />
          <h1 className="text-2xl font-bold">TravelMate</h1>
        </div>

        {/* Menu Links */}
        <div className="flex justify-center space-x-6 mb-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/community"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Community
          </Link>
          <Link
            to="/about-us"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/trips"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Trips
          </Link>
          <Link
            to="/login"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Login/Register
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://facebook.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://github.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-400 transition-colors"
          >
            <FaTwitter size={24} />
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} TravelMate. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
