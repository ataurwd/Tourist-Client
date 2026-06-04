import React from "react";
import Lottie from "lottie-react";
import animationData from "../../src/lottie/loading.json";

const Loading = ({ fullScreen = true }) => {
  return (
    <div className={`flex flex-col justify-center items-center ${
      fullScreen 
        ? 'fixed inset-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md' 
        : 'py-12 w-full'
    }`}>
      <div className="relative flex flex-col items-center">
        {animationData ? (
          <Lottie animationData={animationData} loop={true} className="h-64 md:h-80" />
        ) : (
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        )}
        <p className="mt-2 text-xs font-semibold text-primary/80 dark:text-primary tracking-widest uppercase animate-pulse">
          Loading experiences...
        </p>
      </div>
    </div>
  );
};

export default Loading;
