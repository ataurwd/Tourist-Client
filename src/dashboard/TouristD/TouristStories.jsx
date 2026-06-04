import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { toast } from "sonner";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import useStory from "../../hooks/useStory";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";

const TouristStories = () => {
  const queryClient = useQueryClient();
  const [stories, isLoading, error, refetch] = useStory();

  // Delete button handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? You won't be able to revert this story!")) return;

    {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_URL}/story/${id}`
        );
        if (res.data.deletedCount) {
          toast.success("Story deleted successfully!");
          refetch();
        }
      } catch (error) {
        console.error("Error deleting story:", error);
        toast.error("Something went wrong while deleting the story.");
      }
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 mb-6">
          Your Stories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-slate-100 dark:bg-slate-800 h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-500 font-semibold text-center">
        Error fetching stories: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            Your Stories
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Review, edit, or remove travel stories you've published.
          </p>
        </div>
        <Link to="/dashboard/tourist-add-story">
          <Button variant="primary" size="sm" className="font-bold">
            + Write Story
          </Button>
        </Link>
      </div>

      {stories.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-755">
          <p className="text-slate-400 font-medium mb-3">You haven't written any stories yet.</p>
          <Link to="/dashboard/tourist-add-story">
            <Button variant="ghost" size="sm" className="font-bold text-primary">
              Create Your First Story
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card
              key={story._id}
              image={story.images?.[0]}
              title={story.title}
              subtitle="YOUR STORY"
              className="flex flex-col h-full bg-white dark:bg-slate-800"
            >
              {/* Slider wrapper if multiple images */}
              {story.images && story.images.length > 1 && (
                <div className="h-40 w-full overflow-hidden rounded-xl mb-4">
                  <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
                    {story.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`Story ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
              
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                {story.storyText}
              </p>
              
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700/50 mt-auto">
                <Link to={`/dashboard/update/${story._id}`}>
                  <Button variant="outline" size="sm" className="font-bold">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(story._id)}
                  className="font-bold"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TouristStories;
