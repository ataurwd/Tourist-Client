import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand details */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group w-20">
                          <img src="https://i.ibb.co.com/kVLwMVPv/Screenshot-at-Jun-05-10-22-18-removebg-preview.png" alt="" />
                        </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Crafting premium travel experiences around the world. Let us take you to coordinates where memories are born.
            </p>
          </div>

          {/* Nav Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">
                Home Page
              </Link>
              <Link to="/community" className="hover:text-primary transition-colors">
                Travel Community
              </Link>
              <Link to="/about-us" className="hover:text-primary transition-colors">
                About Our Team
              </Link>
              <Link to="/trips" className="hover:text-primary transition-colors">
                Explore Packages
              </Link>
            </div>
          </div>

          {/* Support / Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Get in Touch
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm">
              <p>📍 123 Main Street, New York, USA</p>
              <p>📞 +1 234 567 890</p>
              <p>📧 support@treva-tours.com</p>
            </div>
          </div>

          {/* Socials / Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Follow Adventure
            </h4>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: "https://facebook.com", color: "hover:bg-blue-600 hover:text-white" },
                { icon: FaTwitter, href: "https://twitter.com", color: "hover:bg-sky-500 hover:text-white" },
                { icon: FaLinkedinIn, href: "https://linkedin.com", color: "hover:bg-blue-700 hover:text-white" },
                { icon: FaGithub, href: "https://github.com", color: "hover:bg-slate-700 hover:text-white" }
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700/50 transition-all ${soc.color}`}
                >
                  <soc.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs text-slate-500">
                Join our newsletter list for early booking discounts.
              </p>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Treva Travel Experience. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
