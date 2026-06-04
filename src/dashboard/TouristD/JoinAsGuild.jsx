import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FormContext } from "../../context/FormData";
import Button from "../../components/shared/Button";

const JoinAsGuild = () => {
  const { user } = useContext(FormContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target;
    const titel = form.applicationTitle.value;
    const reason = form.reasonForTourGuide.value;
    const cvLink = form.cvLink.value;
    const status = "pending";
    const formData = { titel, reason, cvLink, status, email: user.email };

    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/guide`, formData);
      if (res.data.insertedId) {
        toast.success("Application Submitted! We will review it soon.");
        form.reset();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "You might have already applied.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium p-8">
        
        {/* Header */}
        <div className="mb-8">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Partnership
          </span>
          <h2 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight mt-3">
            Join Our Tour Guides Team
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Provide details about your experience and qualifications to start guiding travelers on Treva.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Application Title */}
          <div>
            <label htmlFor="applicationTitle" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Application Title
            </label>
            <input
              type="text"
              id="applicationTitle"
              name="applicationTitle"
              placeholder="e.g. Certified Local Trekking Guide in Sylhet"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="reasonForTourGuide" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Why do you want to be a Tour Guide?
            </label>
            <textarea
              id="reasonForTourGuide"
              name="reasonForTourGuide"
              placeholder="Tell us about your passion for showing travelers around, your local knowledge, and guide experience..."
              required
              rows="5"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all resize-none"
            />
          </div>

          {/* CV Link */}
          <div>
            <label htmlFor="cvLink" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              CV / Resume Portfolio Link
            </label>
            <input
              type="url"
              id="cvLink"
              name="cvLink"
              placeholder="https://example.com/your-cv.pdf"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-750">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              className="font-bold text-base w-full"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinAsGuild;
