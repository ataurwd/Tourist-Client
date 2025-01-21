import React, { useState } from "react";
import useStory from "../hooks/useStory";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";

const UpdateStorie = () => {
  const [stories, isLoading, error, refetch] = useStory();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loginUser] = useUser();
  const [images, setImages] = useState([]); // Store the uploaded images URLs

  const story = stories?.find((item) => item?._id === id);

  if (!story) {
    return <div>Story not found</div>;
  }

  const handleImageChange = (e) => {
    const files = e.target.files;
    const formData = new FormData();

    // Append each selected file to FormData
    Array.from(files).forEach((file) => {
      formData.append("image", file);
    });

    // Upload the images to ImgBB and get the URLs
    Promise.all(
      Array.from(files).map((file) =>
        axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB}`,
          formData
        )
      )
    )
      .then((responses) => {
        const imageUrls = responses.map((response) => response.data.data.url);
        setImages(imageUrls); // Set all image URLs
      })
      .catch((error) => {
        console.error("Image upload failed", error);
      });
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
      images, // Send all uploaded image URLs
    };

    await axios
      .patch(`${import.meta.env.VITE_URL}/update/${id}`, updateData)
      .then((res) => {
        refetch();
        Swal.fire({
          title: "Update Successful!",
          icon: "success",
          draggable: false,
        });
        navigate(
          `${
            loginUser.role === "guide"
              ? "/dashboard/guide-manage-story" : loginUser.role === 'admin'? '/dashboard/admin-story'
              : "/dashboard/tourist-stories"
          }`
        );
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-5 mt-10 shadow-xl">
      <form onSubmit={(e) => handleEdit(e, story._id)}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            name="title"
            defaultValue={story.title} // Accessing the title correctly
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Story Text</label>
          <textarea
            name="text"
            defaultValue={story.storyText} // Accessing story text correctly
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows="4"
          ></textarea>
        </div>

        {/* Image Upload Section */}
        <div className="mb-4">
          <label className="block text-gray-700">Upload Images</label>
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {images.length > 0 && (
            <div>
              {" "}
              <h4>Uploaded Images:</h4>
              <div className="mt-4 grid grid-cols-4 gap-5 rounded-md">
                {images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    className="mt-2 max-w-full h-auto"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="btn bg-secondary font-semibold">Update Now</button>
      </form>
    </div>
  );
};

export default UpdateStorie;
