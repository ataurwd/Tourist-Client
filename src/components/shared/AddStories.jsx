import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import Button from "./Button";
import { FiUpload, FiImage, FiX } from "react-icons/fi";

const AddStories = ({ url }) => {
  const [loginUser] = useUser();
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({
    title: "",
    storyText: "",
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoryData({ ...storyData, [name]: value });
  };

  // Handle image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setStoryData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    // Upload images to ImageBB
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
    setStoryData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storyToSubmit = {
      title: storyData.title,
      storyText: storyData.storyText,
      images: uploadedImageUrls,
      email: loginUser?.email,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/add-stories`, // URL of the backend API
        storyToSubmit
      );
      if (response.data.insertedId) {
        Swal.fire({
          title: "Story Added Successfully!",
          icon: "success",
        });
        navigate(url); // Redirect to another page
      }
    } catch (error) {
      console.error("Error submitting story", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            Share Your Journey
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Write a captivating travel story, upload photos, and inspire fellow explorers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Story Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={storyData.title}
              onChange={handleChange}
              placeholder="e.g. Lost in the hills of Bandarban"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>

          {/* Story Text */}
          <div>
            <label htmlFor="storyText" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Your Story
            </label>
            <textarea
              id="storyText"
              name="storyText"
              value={storyData.storyText}
              onChange={handleChange}
              placeholder="Tell your adventure here..."
              rows="6"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all resize-none"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Upload Photos
            </label>
            <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/20">
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageUpload}
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FiUpload className="h-8 w-8 text-slate-400 mb-3" />
              <span className="text-sm font-semibold text-slate-650 dark:text-slate-300">
                Click to upload images
              </span>
              <span className="text-xs text-slate-450 dark:text-slate-550 mt-1">
                PNG, JPG or WEBP up to 5MB
              </span>
            </div>

            {/* Upload Previews */}
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
                <FiImage className="h-4 w-4 animate-spin text-primary" /> Uploading images to gallery...
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-750">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isUploading}
              className="font-bold text-base w-full sm:w-auto"
            >
              Submit Story
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStories;
