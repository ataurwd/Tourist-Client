import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/shared/Button";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import Swal from "sweetalert2";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      e.target.reset();
      Swal.fire({
        title: "Message Sent!",
        text: "We'll get back to you within 24 hours.",
        icon: "success",
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: FiMapPin,
      title: "Our Office",
      detail: "123 Travel Avenue, Dhaka, Bangladesh",
      color: "text-emerald-500 bg-emerald-500/10",
    },
    {
      icon: FiPhone,
      title: "Phone",
      detail: "+880 1234 567 890",
      color: "text-cyan-500 bg-cyan-500/10",
    },
    {
      icon: FiMail,
      title: "Email",
      detail: "hello@treva.travel",
      color: "text-amber-500 bg-amber-500/10",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <Title
        heading="Get in Touch"
        text="Have a question, partnership inquiry, or feedback? Reach out to us — our travel concierge team responds within 24 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-12">
        {/* Left Info Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info Cards */}
          {contactInfo.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-5 rounded-2xl shadow-sm hover:shadow-premium transition-all duration-300"
            >
              <div className={`p-3 rounded-xl ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}

          {/* Map Placeholder */}
          <div className="relative h-56 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
              <div className="text-center space-y-2">
                <FiMapPin className="h-10 w-10 text-primary mx-auto opacity-50" />
                <p className="text-xs text-slate-400 font-semibold">
                  Interactive Map — Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-8 md:p-10 rounded-3xl shadow-premium">
            <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100 mb-1">
              Send Us a Message
            </h3>
            <p className="text-sm text-slate-400 mb-8">
              Fill out the form below and we'll respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Partnership Inquiry"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
                  Your Message
                </label>
                <textarea
                  rows="5"
                  required
                  placeholder="Tell us more about your inquiry..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 resize-none transition-all"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isSubmitting}
                className="w-full font-bold text-base gap-2"
              >
                <FiSend className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
