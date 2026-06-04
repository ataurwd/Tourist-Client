import React, { useState } from "react";
import useStory from "../hooks/useStory";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import Button from "./shared/Button";
import { FiUpload, FiImage, FiX } from "react-icons/fi";

const UpdateStorie = () => {
  const [stories, isLoading, error, refetch] = useStory();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loginUser] = useUser();

  const story = stories?.find((item) => item?._id === id);

  // Initialize images with the story's existing images
  const [images, setImages] = useState(() => story?.images || []);
  const [isUploading, setIsUploading] = useState(false);

  if (!story) {
    return (
      <div className="p-12 text-center text-red-500 font-semibold">
        Story not found
      </div>
    );
  }

  // Handle image upload to ImgBB
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      const imageUrls = [];

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

      setImages((prev) => [...prev, ...imageUrls]);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      console.error("Image upload failed", error);
      toast.error("Something went wrong while uploading your images.");
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Edit button handler
  const handleEdit = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const storyText = form.text.value;
    
    const updateData = {
      title,
      storyText,
      images, // Send all current image URLs
    };

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_URL}/update/${id}`,
        updateData
      );
      if (res.data.modifiedCount || res.data.matchedCount) {
        refetch();
        toast.success("Story Updated Successfully!");
        navigate(
          `${
            loginUser?.role === "guide"
              ? "/dashboard/guide-manage-story"
              : loginUser?.role === "admin"
              ? "/dashboard/admin-story"
              : "/dashboard/tourist-stories"
          }`
        );
      }
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Could not update the story.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-3xl shadow-premium p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            Edit Your Story
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Update your story title, narrative text, or manage published images.
          </p>
        </div>

        <form onSubmit={(e) => handleEdit(e, story._id)} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Story Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={story.title}
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all"
            />
          </div>

          {/* Story Text */}
          <div>
            <label htmlFor="text" className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Your Story
            </label>
            <textarea
              id="text"
              name="text"
              defaultValue={story.storyText}
              rows="6"
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm text-slate-700 dark:text-slate-200 transition-all resize-none"
            />
          </div>

          {/* Image Upload / Preview Section */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
              Story Images
            </label>
            
            {/* Dashed dropzone */}
            <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 dark:bg-slate-900/20">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FiUpload className="h-8 w-8 text-slate-400 mb-3" />
              <span className="text-sm font-semibold text-slate-650 dark:text-slate-300">
                Click to upload more images
              </span>
              <span className="text-xs text-slate-450 dark:text-slate-550 mt-1">
                PNG, JPG or WEBP up to 5MB
              </span>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 0 && (
              <div className="mt-4">
                <span className="block text-xs font-bold text-slate-455 dark:text-slate-545 mb-2 uppercase tracking-wide">
                  Gallery Previews ({images.length})
                </span>
                <div className="grid grid-cols-4 gap-3">
                  {images.map((url, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img src={url} alt="Story preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1.5 right-1.5 bg-slate-900/60 hover:bg-slate-900 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
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
              Update Story
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStorie;
