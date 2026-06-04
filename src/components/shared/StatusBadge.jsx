import React from "react";

const StatusBadge = ({ status = "pending", className = "" }) => {
  const normalized = status.toLowerCase().trim();

  const configs = {
    // Booking statuses
    "pending": {
      bg: "bg-amber-50 dark:bg-amber-950/20",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/30",
      label: "Pending"
    },
    "in-review": {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/30",
      label: "In Review"
    },
    "accepted": {
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/30",
      label: "Accepted"
    },
    "rejected": {
      bg: "bg-red-50 dark:bg-red-950/20",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-100 dark:border-red-900/30",
      label: "Rejected"
    },
    
    // User Roles
    "admin": {
      bg: "bg-violet-50 dark:bg-violet-950/20",
      text: "text-violet-600 dark:text-violet-400",
      border: "border-violet-100 dark:border-violet-900/30",
      label: "Admin"
    },
    "guide": {
      bg: "bg-cyan-50 dark:bg-cyan-950/20",
      text: "text-cyan-600 dark:text-cyan-400",
      border: "border-cyan-100 dark:border-cyan-900/30",
      label: "Tour Guide"
    },
    "tourist": {
      bg: "bg-teal-50 dark:bg-teal-950/20",
      text: "text-teal-600 dark:text-teal-400",
      border: "border-teal-100 dark:border-teal-900/30",
      label: "Tourist"
    }
  };

  const current = configs[normalized] || {
    bg: "bg-slate-50 dark:bg-slate-900",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-100 dark:border-slate-800",
    label: status
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${current.bg} ${current.text} ${current.border} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full bg-current`} />
      {current.label}
    </span>
  );
};

export default StatusBadge;
