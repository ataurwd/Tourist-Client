import React from "react";

const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 shadow-sm ${className}`}>
      {/* Aspect Ratio Shimmer Image */}
      <div className="shimmer-bg w-full h-48"></div>
      
      <div className="p-5 space-y-4">
        {/* Subtitle / Category Tag Shimmer */}
        <div className="shimmer-bg h-4 w-1/4 rounded"></div>
        
        {/* Title Shimmer */}
        <div className="shimmer-bg h-6 w-3/4 rounded-md"></div>
        
        {/* Description line 1 Shimmer */}
        <div className="shimmer-bg h-4 w-full rounded"></div>
        
        {/* Footer Shimmer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-50 dark:border-slate-800/60">
          <div className="shimmer-bg h-5 w-1/3 rounded"></div>
          <div className="shimmer-bg h-8 w-1/4 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
