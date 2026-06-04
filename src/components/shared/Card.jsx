import React from "react";

const Card = ({
  children,
  image,
  title,
  subtitle,
  badge,
  onClick,
  hoverable = true,
  className = "",
  imageClassName = "h-48",
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 ${
        hoverable ? "hover:-translate-y-1 hover:shadow-premium hover:border-primary/20 cursor-pointer" : ""
      } ${className}`}
      {...props}
    >
      {image && (
        <div className="relative overflow-hidden group">
          <img
            src={image}
            alt={title || "Card image"}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageClassName}`}
          />
          {badge && (
            <div className="absolute top-4 right-4">
              {badge}
            </div>
          )}
        </div>
      )}
      
      <div className="p-5">
        {(title || subtitle) && (
          <div className="mb-3">
            {subtitle && (
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 font-display line-clamp-1">
                {title}
              </h3>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Card;
