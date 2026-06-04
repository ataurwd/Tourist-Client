import React from "react";
import { FaHandshake, FaShieldAlt, FaClock } from "react-icons/fa";

const WhyChoseUs = () => {
  const reasons = [
    {
      icon: FaHandshake,
      title: "Trusted Service",
      description: "We work with fully verified guides and local tour operators to ensure a premium journey you can trust.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      icon: FaShieldAlt,
      title: "Secure & Safe",
      description: "Your health and travel security is our absolute priority. Secure checkout and refund policies guaranteed.",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
    },
    {
      icon: FaClock,
      title: "24/7 Concierge",
      description: "Our dedicated adventure support team is available round-the-clock to manage any unforeseen circumstances.",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    }
  ];

  return (
    <section
      className="relative bg-cover bg-center py-28 my-10 overflow-hidden"
      style={{
        backgroundImage: "url('https://mtsobek.imgix.net/2023/10/Europe-Italy-Trekkers-Following-Age-Old-Trails-Past-Secret-Mountain-Lakes-near-the-Mont-Blanc-Mountains-in-the-Alps-scaled.jpg?fm=pjpg')",
        backgroundAttachment: "fixed" // Parallax effect
      }}
    >
      {/* Immersive Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-primary bg-primary/10 border border-primary/20 backdrop-blur-md px-4 py-1.5 rounded-full uppercase">
            Platform Benefits
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white">
            Why Choose Treva?
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            We bridge the gap between travelers seeking authentic local experiences and professional guides dedicated to delivering quality service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="glass-panel border border-white/5 bg-slate-900/50 backdrop-blur-md p-8 rounded-2xl shadow-premium-hover transition-all duration-300 hover:-translate-y-1 text-center flex flex-col items-center group"
            >
              <div className={`p-4 rounded-2xl border mb-6 transition-all duration-300 group-hover:scale-110 ${reason.color}`}>
                <reason.icon size={36} />
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-3">
                {reason.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoseUs;
