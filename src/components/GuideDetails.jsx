import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FiMail, FiShield, FiMessageSquare } from "react-icons/fi";
import Button from "./shared/Button";
import Modal from "./shared/Modal";
import Chat from "./Chat";
import SEO from "./SEO";

const GuideDetails = () => {
  const data = useLoaderData();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Person schema for guide details indexing
  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://treva-travel.web.app/guide/${data?._id}#person`,
    "name": data?.name,
    "email": data?.email,
    "image": data?.photo,
    "jobTitle": "Certified Tour Guide",
    "worksFor": {
      "@type": "Organization",
      "name": "Treva Travel",
      "url": "https://treva-travel.web.app"
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <SEO 
        title={`Tour Guide: ${data?.name || "Profile"}`}
        description={`Meet certified tour guide ${data?.name || "our expert guide"}. Read bio, get in touch, and book tour package guides with Treva.`}
        image={data?.photo}
        urlPath={`/guide/${data?._id}`}
        keywords={`${data?.name || "tour guide"}, travel guide, local guide, booking`}
        schema={guideSchema}
      />
      {/* Profile Hero Card */}
      <div className="relative bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium overflow-hidden">
        {/* Cover Gradient */}
        <div className="h-40 md:h-52 bg-gradient-to-br from-primary via-emerald-600 to-secondary relative">
          <div className="absolute inset-0 bg-[url('https://mtsobek.imgix.net/2023/10/Europe-Italy-Trekkers-Following-Age-Old-Trails-Past-Secret-Mountain-Lakes-near-the-Mont-Blanc-Mountains-in-the-Alps-scaled.jpg?fm=pjpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        </div>

        {/* Avatar Section */}
        <div className="relative flex flex-col items-center -mt-16 md:-mt-20 pb-8 px-6">
          <div className="relative">
            <img
              src={data?.photo}
              alt={data?.name || "Guide"}
              className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-4 border-white dark:border-slate-800 shadow-premium"
            />
            <span className="absolute -bottom-2 -right-2 bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-premium uppercase tracking-wider">
              {data?.role || "Guide"}
            </span>
          </div>

          <h1 className="mt-6 text-2xl md:text-3xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            {data?.name}
          </h1>

          <p className="text-sm text-slate-400 mt-1">Certified Tour Guide</p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full max-w-[38rem]">
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500">
                <FiMail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                  {data?.email || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                <FiShield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Role
                </p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 capitalize">
                  {data?.role || "Guide"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8">
            <Link to="/">
              <Button variant="outline" size="sm" className="font-bold">
                ← Back to Home
              </Button>
            </Link>
            <Button variant="primary" size="sm" className="font-bold" onClick={() => setIsChatOpen(true)}>
              <FiMessageSquare className="mr-2 h-4 w-4" /> Message Guide
            </Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} title={`Message ${data?.name}`}>
        <Chat receiverId={data?.email} />
      </Modal>
    </div>
  );
};

export default GuideDetails;
