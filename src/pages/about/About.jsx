import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-primary">
            Meet the Developer
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">
            Hi, I’m <span className="font-bold text-primary">Ataur Rahman</span>, a dedicated
            and passionate{" "}
            <span className="font-bold text-primary" >Frontend Web Developer</span> with
            expertise in <span className="font-bold">React.js</span> and{" "}
            <span className="font-bold">Tailwind CSS</span>. I specialize in
            creating modern, responsive, and user-friendly web applications that
            deliver exceptional experiences. With{" "}
            <span className="font-bold">
              2+ years of professional experience
            </span>
            , I have honed my skills to craft visually appealing and functional
            websites.
          </p>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Developer Skills
          </h4>
          <ul className="list-disc pl-5 text-gray-600 mb-6">
            <li>Frontend: React.js, Tailwind CSS, HTML, CSS, JavaScript</li>
            <li>Backend: Node.js, MongoDB, Express.js</li>
            <li>
              Specialties: Responsive designs, reusable components, secure
              authentication.
            </li>
          </ul>
          <h4 className="text-xl font-semibold text-gray-800 mb-2">
            Projects I’ve Worked On
          </h4>
          <ul className="list-disc pl-5 text-gray-600 mb-6">
            <li>
              <span className="font-bold">Pet Adoption Website:</span> Features
              category-based buttons, real-time data fetching, and hover
              effects.
            </li>
            <li>
              <span className="font-bold">
                Library Management System (LMS):
              </span>{" "}
              Includes book categorization, borrowing/returning systems, JWT
              authentication, and private routes.
            </li>
            <li>
              <span className="font-bold">Portfolio Website:</span> A
              professional portfolio to showcase skills and projects.
            </li>
          </ul>
          <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Explore My Work
          </h4>
          <div className="flex flex-col md:flex-row gap-4">
                      <a
                          target="blank"
              href="https://ataur-wd.netlify.app/"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              View Portfolio
            </a>
                      <a
                          target="blank"
              href="https://github.com/ataurwd"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Visit GitHub
            </a>
            <a
              href="/"
              className="bg-primary text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Live Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
