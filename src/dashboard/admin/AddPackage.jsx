import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import useAllUser from "../../hooks/useAllUser";

const AddPackage = () => {
  const [alluser] = useAllUser();
  const [packageData, setPackageData] = useState({
    packageName: "",
    aboutTour: "",
    tourPlan: "",
    tourGuide: "",
    price: "",
    tourDate: "",
    images: [],
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  // Handle image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setPackageData((prev) => ({
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
    const form = e.target;
    const packageToSubmit = {
      ...packageData,
      images: uploadedImageUrls,
    };
    console.log(packageToSubmit);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/add-package`,
        packageToSubmit
      );
      if (response.data.insertedId) {
        Swal.fire({
          title: "Package Added Successfully",
          icon: "success",
          draggable: false,
        });
        form.reset();
        setPackageData({
          packageName: "",
          aboutTour: "",
          tourPlan: "",
          tourGuide: "",
          price: "",
          tourDate: "",
          images: [],
        });
        setUploadedImageUrls([]);
      } else {
      }
    } catch (error) {
      console.error("Error submitting package", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-3">Add Package</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md rounded-lg p-6"
      >
        <div className="form-control">
          <label className="label font-bold" htmlFor="packageName">
            <span className="label-text">Package Name</span>
          </label>
          <input
            type="text"
            id="packageName"
            name="packageName"
            value={packageData.packageName}
            onChange={handleChange}
            placeholder="Enter Package Name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">Gallery (Upload Images)</span>
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="file-input file-input-bordered w-full"
          />
          {packageData.images.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Selected Images: {packageData.images.length}
              </p>
            </div>
          )}
          {isUploading && (
            <div className="mt-2 text-gray-500">Uploading images...</div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="form-control">
            <label className="label font-bold" htmlFor="aboutTour">
              <span className="label-text">About The Tour</span>
            </label>
            <textarea
              id="aboutTour"
              name="aboutTour"
              value={packageData.aboutTour}
              onChange={handleChange}
              placeholder="Provide information about the tour..."
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label font-bold" htmlFor="tourPlan">
              <span className="label-text">Tour Plan</span>
            </label>
            <textarea
              id="tourPlan"
              name="tourPlan"
              value={packageData.tourPlan}
              onChange={handleChange}
              placeholder="Provide day-wise tour plan..."
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="form-control w-full">
            <label className="label font-bold" htmlFor="tourGuide">
              <span className="label-text">Tour Guide</span>
            </label>
            <select
              id="tourGuide"
              name="tourGuide"
              value={packageData.tourGuide}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select a Tour Guide
              </option>
              {alluser
                .filter((user) => user.role === "guide")
                .map((user, index) => (
                  <option key={index}>{user.name}</option>
                ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label font-bold" htmlFor="price">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={packageData.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label font-bold" htmlFor="tourDate">
              <span className="label-text">Tour Date</span>
            </label>
            <input
              type="text"
              id="tourDate"
              name="tourDate"
              value={packageData.tourDate}
              onChange={handleChange}
              placeholder="Select Date"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <button
            type="submit"
            disabled={isUploading}
            className={`btn bg-primary w-full ${
              isUploading ? "cursor-not-allowed" : ""
            }`}
          >
            {isUploading ? "Uploading..." : "Add Package"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
