import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  pageSizeOptions = [5, 10, 20, 50],
  className = ""
}) => {
  if (totalPages <= 1 && !onItemsPerPageChange) return null;

  const pages = [...Array(totalPages).keys()];

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 py-4 ${className}`}>
      {/* Items per page dropdown */}
      {onItemsPerPageChange && (
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} items
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Page controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* Previous Page */}
          <button
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Previous Page"
          >
            <HiChevronLeft className="h-5 w-5" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1.5 px-2">
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[36px] h-9 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === page
                    ? "bg-primary text-white shadow-premium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent"
                }`}
              >
                {page + 1}
              </button>
            ))}
          </div>

          {/* Next Page */}
          <button
            onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Next Page"
          >
            <HiChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
