import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';
import "swiper/css";
import Swal from "sweetalert2";

const TouristStories = () => {
  const queryClient = useQueryClient();

  // Fetch stories
  const {
    data: stories,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["touristStories"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_URL}/stories`);
      return response.data;
    },
  });

  // Delete story mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${import.meta.env.VITE_URL}/stories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["touristStories"]);
    },
  });

  // Edit button handler
  const handleEdit = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const text = form.text.value;
    const updateData = {
      title,
      text,
    };
    await axios
      .patch(`${import.meta.env.VITE_URL}/update/${id}`, updateData)
      .then((res) => {
        console.log(res.data)
        refetch();
        Swal.fire({
          title: "Update Sucessfull!",
          icon: "success",
          draggable: false
        })
        document.getElementById("my_modal_1").close();
      });
  };

  // Delete button handler
  const handleDelete = async (id) => {
    // Show confirmation dialog first
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    // Proceed with deletion only if confirmed
    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_URL}/story/${id}`
        );
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      } catch (error) {
        console.error("Error deleting story:", error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong while deleting the story.",
          icon: "error",
        });
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="grid place-items-center min-h-svh">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div>Error fetching stories: {error.message}</div>;
  }

  // close the modal
  const closeModal = () => {
    document.getElementById("my_modal_1").close();
  };
  // Render the stories in card format
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tourist Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
          >
            <h2 className="text-xl font-bold mb-2">{story.title}</h2>
            <p className="text-gray-600 mb-4">{story.storyText}</p>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="w-full h-48 mb-4"
            >
              {story.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Story ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex space-x-3 mt-auto">
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(story._id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>

              {/* update modal */}
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <div
                    className="flex justify-end font-bold cursor-pointer"
                    onClick={closeModal}
                  >
                    X
                  </div>
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
                    <button className="btn bg-secondary font-semibold">
                      Update Now
                    </button>
                  </form>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TouristStories;
