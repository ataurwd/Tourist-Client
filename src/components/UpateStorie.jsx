import React from "react";
import useStory from "../hooks/useStory";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../hooks/useUser";

const UpateStorie = () => {
    const [stories, isLoading, error, refetch] = useStory()
    const navigate = useNavigate()
    const { id } = useParams()
    const [loginUser] = useUser()
    console.log(loginUser)
    
    const story = stories.find(item => item._id === id)

  // Edit button handler
  const handleEdit = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const storyText = form.text.value;
    const updateData = {
      title,
      storyText,
    };
    await axios
      .patch(`${import.meta.env.VITE_URL}/update/${id}`, updateData)
      .then((res) => {
        refetch();
        Swal.fire({
          title: "Update Sucessfull!",
          icon: "success",
          draggable: false,
        });
          navigate(`${loginUser.role === 'guide' ? '/dashboard/guide-manage-story' : '/dashboard/tourist-stories'}`)
      });
  };
  return (
      <div className="max-w-2xl mx-auto p-5 mt-10 shadow-xl">
      <form onSubmit={(e) => handleEdit(e, story._id)}>
        <div className="mb-4">
                  <label className="block text-gray-700">Title</label>
          <input
            name="title"
            defaultValue={story.title}
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Story Text</label>
          <textarea
            name="text"
            defaultValue={story.storyText}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows="4"
          ></textarea>
        </div>
        <button className="btn bg-secondary font-semibold">Update Now</button>
      </form>
    </div>
  );
};

export default UpateStorie;
