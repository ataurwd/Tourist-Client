import React from "react";
import useCandidate from "./../../hooks/useCandidate";
import axios from "axios";
import Swal from "sweetalert2";
import Button from "../../components/shared/Button";
import StatusBadge from "../../components/shared/StatusBadge";
import { FiEye } from "react-icons/fi";

const ManageCandidate = () => {
  const [candidate, refetch, isLoading] = useCandidate();

  // to update user role
  const handleAccept = async (email) => {
    const result = await Swal.fire({
      title: "Promote to Tour Guide?",
      text: `Do you want to approve this application and update ${email} to a Tour Guide?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await axios.patch(`${import.meta.env.VITE_URL}/update-guide/${email}`);
      Swal.fire({
        title: "Success!",
        text: "User role has been updated to guide.",
        icon: "success",
      });
      refetch();
    }
  };

  // to delete or reject user
  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject Application?",
      text: "Do you want to decline this Tour Guide application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await axios.delete(`${import.meta.env.VITE_URL}/guide/${id}`);
      if (res.data.deletedCount) {
        Swal.fire({
          title: "Application Rejected Successfully",
          icon: "success",
        });
        refetch();
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          Guide Applications
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review and manage requests from tourists seeking promotion to registered tour guides.
        </p>
      </div>

      {/* Table Card Shell */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/70 dark:bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Application Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  CV / Resume Portfolio
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Applicant Email
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40 text-slate-700 dark:text-slate-350">
              {isLoading ? (
                [1, 2, 3].map((n) => (
                  <tr key={n} className="animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-4 w-36 bg-slate-200 dark:bg-slate-700 rounded" /></td>
                    <td className="px-6 py-5"><div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" /></td>
                    <td className="px-6 py-5"><div className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded mx-auto" /></td>
                  </tr>
                ))
              ) : !candidate || candidate.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                    No active guide applications found.
                  </td>
                </tr>
              ) : (
                candidate.map((application) => (
                  <tr key={application._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-5 text-sm font-bold text-slate-800 dark:text-slate-100 font-display">
                      {application.titel}
                    </td>
                    <td className="px-6 py-5 text-sm">
                      <a
                        href={application.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-dark font-semibold transition-colors"
                      >
                        <FiEye className="h-4 w-4" /> View CV / Portfolio
                      </a>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-550 dark:text-slate-400">
                      {application.email}
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status="tourist" />
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex justify-center items-center gap-2">
                        {/* Accept Button */}
                        <Button
                          onClick={() => handleAccept(application.email)}
                          variant="primary"
                          size="sm"
                          className="font-bold"
                        >
                          Accept
                        </Button>
                        {/* Reject Button */}
                        <Button
                          onClick={() => handleReject(application._id)}
                          variant="danger"
                          size="sm"
                          className="font-bold"
                        >
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageCandidate;
