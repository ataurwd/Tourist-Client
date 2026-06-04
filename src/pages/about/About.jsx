import React from "react";
import Title from "../../components/Title";
import Button from "../../components/shared/Button";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress, SiJavascript, SiFirebase, SiGit } from "react-icons/si";

const skills = [
  { icon: SiReact, label: "React.js", color: "text-cyan-400" },
  { icon: SiTailwindcss, label: "Tailwind CSS", color: "text-sky-400" },
  { icon: SiNodedotjs, label: "Node.js", color: "text-emerald-500" },
  { icon: SiMongodb, label: "MongoDB", color: "text-green-500" },
  { icon: SiExpress, label: "Express.js", color: "text-slate-400" },
  { icon: SiJavascript, label: "JavaScript", color: "text-yellow-400" },
  { icon: SiFirebase, label: "Firebase", color: "text-amber-500" },
  { icon: SiGit, label: "Git", color: "text-orange-500" },
];

const projects = [
  {
    name: "Pet Adoption Platform",
    description: "Features category-based buttons, real-time data fetching, and hover effects for a responsive adoption marketplace.",
    tech: ["React", "MongoDB", "Express"],
  },
  {
    name: "Library Management System",
    description: "Includes book categorization, borrowing/returning systems, JWT authentication, and private routes.",
    tech: ["React", "Node.js", "JWT"],
  },
  {
    name: "Treva — Tourism Guide",
    description: "A comprehensive tourism management platform with tour guide booking, admin dashboards, and Stripe payments.",
    tech: ["React", "Tailwind", "Stripe"],
  },
];

const About = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in-up">

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 p-8 md:p-14">
        {/* Decorative Blobs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-premium">
                <div className="w-full h-full rounded-3xl bg-slate-800 flex items-center justify-center text-5xl font-black text-white font-display">
                  AR
                </div>
              </div>
              <span className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-premium">
                Available
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left space-y-4 text-white">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                Meet the Developer
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight">
              Ataur Rahman
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              A dedicated and passionate <span className="text-primary font-bold">Full-Stack Web Developer</span> with
              expertise in React.js, Node.js, and the MERN ecosystem. Specializing in creating modern, responsive, and user-friendly
              web applications that deliver exceptional experiences. 2+ years of professional development experience.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <a href="https://dev-portfolio-eosin-three.vercel.app/" target="_blank" rel="noreferrer">
                <Button variant="primary" size="sm" className="font-bold gap-2">
                  <FaGlobe /> Portfolio
                </Button>
              </a>
              <a href="https://github.com/ataurwd" target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" className="font-bold gap-2 border-white/20 text-white hover:bg-white/10">
                  <FaGithub /> GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <Title heading="Technical Skills" text="Core technologies and tools I work with on a day-to-day basis." />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-5 rounded-2xl text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-premium flex flex-col items-center gap-3"
            >
              <skill.icon className={`h-8 w-8 ${skill.color} group-hover:scale-110 transition-transform`} />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-display">
                {skill.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <Title heading="Featured Projects" text="A selection of the projects I've designed, built, and deployed." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-7 rounded-2xl shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm font-display">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold font-display text-slate-800 dark:text-slate-100">
                  {project.name}
                </h3>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
