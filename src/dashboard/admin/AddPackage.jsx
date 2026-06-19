import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Button from "../../components/shared/Button";
import { FiUpload, FiImage, FiX } from "react-icons/fi";
import useAxios from "../../hooks/useAxios";

const AddPackage = () => {
  const axiosInstance = useAxios();
  const [packageData, setPackageData] = useState({
    packageName: "",
    aboutTour: "",
    tourPlan: "",
    tourGuide: "",
    price: "",
    tourDate: "",
    images: [],
    faqs: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  // Handle FAQ changes
  const handleFAQChange = (index, field, value) => {
    const updatedFaqs = [...packageData.faqs];
    updatedFaqs[index][field] = value;
    setPackageData({ ...packageData, faqs: updatedFaqs });
  };

  // Handle image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setPackageData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    const imageUrls = await uploadImagesToImageBB(files);
    setUploadedImageUrls((prev) => [...prev, ...imageUrls]);
  };

  // Upload images to ImageBB
  const uploadImagesToImageBB = async (files) => {
    const imageUrls = [];
    try {
      setIsUploading(true);
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB}`,
          formData
        );
        if (response.data.success) {
          imageUrls.push(response.data.data.url);
        }
      }
      setIsUploading(false);
      return imageUrls;
    } catch (error) {
      setIsUploading(false);
      console.error("Image upload failed", error);
      return [];
    }
  };

  const handleRemoveUploadedImage = (indexToRemove) => {
    setUploadedImageUrls((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setPackageData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const packageToSubmit = {
      ...packageData,
      images: uploadedImageUrls,
    };

    try {
      const response = await axiosInstance.post(
        `/add-package`,
        packageToSubmit
      );
      if (response.data.insertedId) {
        toast.success("Package Added Successfully!");
        form.reset();
        setPackageData({
          packageName: "",
          aboutTour: "",
          tourPlan: "",
          tourGuide: "",
          price: "",
          tourDate: "",
          images: [],
          faqs: [
            { question: "", answer: "" },
            { question: "", answer: "" },
            { question: "", answer: "" },
          ],
        });
        setUploadedImageUrls([]);
      } else {
        toast.error("Failed to Add Package.");
      }
    } catch (error) {
      console.error("Error submitting package", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            Create Tour Package
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Fill in the details below to add a new package with descriptions, photos, and FAQs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Trip Title */}
          <div>
            <label htmlFor="packageName" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Trip Title
            </label>
            <input
              type="text"
              id="packageName"
              name="packageName"
              value={packageData.packageName}
              onChange={handleChange}
              placeholder="e.g. Beautiful Sylhet & Tea Gardens Experience"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>

          {/* About Tour */}
          <div>
            <label htmlFor="aboutTour" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              About Tour
            </label>
            <textarea
              id="aboutTour"
              name="aboutTour"
              value={packageData.aboutTour}
              onChange={handleChange}
              placeholder="Describe the tour itinerary, spots to visit, and guide features..."
              required
              rows="5"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all resize-none"
            />
          </div>

          {/* Gallery Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Gallery Images
            </label>
            <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/20">
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FiUpload className="h-8 w-8 text-slate-400 mb-3" />
              <span className="text-sm font-semibold text-slate-650 dark:text-slate-300">
                Click to upload gallery photos
              </span>
              <span className="text-xs text-slate-450 dark:text-slate-550 mt-1">
                PNG, JPG or WEBP up to 5MB
              </span>
            </div>

            {/* Thumbnail previews */}
            {uploadedImageUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {uploadedImageUrls.map((url, idx) => (
                  <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={url} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveUploadedImage(idx)}
                      className="absolute top-1.5 right-1.5 bg-slate-900/60 hover:bg-slate-900 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-slate-400 mt-3 animate-pulse">
                <FiImage className="h-4 w-4 animate-spin text-primary" /> Uploading package photos...
              </div>
            )}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Package FAQs
            </span>
            {packageData.faqs.map((faq, index) => (
              <div key={index} className="p-4 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl space-y-3">
                <span className="text-xs font-extrabold text-slate-450 uppercase tracking-wider">
                  FAQ Item #{index + 1}
                </span>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) =>
                    handleFAQChange(index, "question", e.target.value)
                  }
                  placeholder="e.g. What is the cancellation policy?"
                  required
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) =>
                    handleFAQChange(index, "answer", e.target.value)
                  }
                  placeholder="Write the answer here..."
                  required
                  rows="3"
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all resize-none"
                />
              </div>
            ))}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Package Price (USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={packageData.price}
              onChange={handleChange}
              placeholder="e.g. 299"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-750">
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isUploading}
              className="w-full font-bold text-base"
            >
              Add Package
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
