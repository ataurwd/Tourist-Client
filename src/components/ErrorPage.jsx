import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-6 py-12">
      <div className="max-w-md w-full text-center glass-panel rounded-2xl shadow-premium p-8 md:p-12 animate-fade-in-up">
        {/* Animated illustration container */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl h-24 w-24 mx-auto animate-pulse"></div>
          <span className="relative text-7xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            404
          </span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-display mb-3">
          Lost in Paradise?
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mb-8 leading-relaxed">
          The destination you are trying to reach seems to have vanished or moved to another coordinates. Let's get you back on track!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl shadow-premium transition duration-300 transform hover:-translate-y-0.5"
          >
            Go Back Home
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="px-6 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium rounded-xl transition duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
