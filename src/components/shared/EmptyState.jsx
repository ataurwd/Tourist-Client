import React from "react";
import { HiOutlineFolderOpen } from "react-icons/hi";

const EmptyState = ({
  icon: Icon = HiOutlineFolderOpen,
  title = "No data found",
  description = "There are currently no items to display in this list.",
  actionLabel,
  onActionClick,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 md:p-12 border border-dashed border-slate-200 dark:border-slate-700/60 rounded-2xl bg-slate-50/30 dark:bg-slate-800/10 ${className}`}>
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary mb-4 animate-float">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display mb-1.5">
        {title}
      </h3>
      <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onActionClick && (
        <button
          onClick={onActionClick}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl shadow-premium transition duration-200 transform active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
