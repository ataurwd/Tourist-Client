import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

const TouristAddStory = () => {
  const navigate = useNavigate();
  const [storyData, setStoryData] = useState({
    title: "",
    storyText: "",
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false); 
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]); // for storing uploaded image URLs

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const storyToSubmit = {
      title: storyData.title,
      storyText: storyData.storyText,
      images: uploadedImageUrls,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/add-stories`, // URL of the backend API
        storyToSubmit
      );
        if (response.data.insertedId) {
            Swal.fire({
                title: "Story Added successfully",
                icon: "success",
                draggable: false,
              });
      }
      navigate("/dashboard/tourist-stories"); // Redirect to another page
    } catch (error) {
      console.error("Error submitting story", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">Add a New Story</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={storyData.title}
            onChange={handleChange}
            placeholder="Enter story title"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="storyText" className="block text-sm font-medium mb-2">
            Story Text
          </label>
          <textarea
            id="storyText"
            name="storyText"
            value={storyData.storyText}
            onChange={handleChange}
            placeholder="Write your story here..."
            rows="6"
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block text-sm font-medium mb-2">
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {storyData.images.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Uploaded Images: {storyData.images.length}
              </p>
            </div>
          )}
          {isUploading && (
            <div className="mt-2 text-gray-500">Uploading images...</div>
          )}
        </div>
        <div className={`flex justify-end `}>
          <button disabled={isUploading}
            type="submit"
            className={`bg-secondary text-black py-2 px-4 rounded hover:bg-blue-600 ${isUploading ? 'cursor-not-allowed' : ''}`}
          >
            Submit Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default TouristAddStory;
