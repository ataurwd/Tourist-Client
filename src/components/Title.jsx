import React from "react";

const Title = ({ heading, text }) => {
  return (
    <div className="text-center my-8 md:my-12 px-5 animate-fade-in-up">
      <span className="text-xs font-semibold tracking-widest text-primary uppercase bg-primary/10 dark:bg-primary/20 px-3 py-1 rounded-full">
        Treva Experience
      </span>
      <h2 className="mt-3 text-2xl md:text-4xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
        {heading}
      </h2>
      <div className="flex items-center justify-center gap-2 mt-4 mb-3">
        <span className="h-0.5 w-8 bg-gradient-to-r from-transparent to-primary rounded-full"></span>
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
        <span className="h-0.5 w-8 bg-gradient-to-l from-transparent to-primary rounded-full"></span>
      </div>
      {text && (
        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
};

export default Title;
