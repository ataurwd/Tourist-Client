import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { toast } from "sonner";
import { FiTrash2 } from "react-icons/fi";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";
import EmptyState from "../../components/shared/EmptyState";

const AdminAllStories = () => {
  // Query all stories from the database
  const { data: stories = [], isLoading, error, refetch } = useQuery({
    queryKey: ["allStoriesAdmin"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/stories`);
      return res.data;
    },
  });

  // Handle delete story
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? You want to delete this story globally from the platform?")) return;

    try {
      const res = await axios.delete(`${import.meta.env.VITE_URL}/story/${id}`);
      if (res.data.deletedCount) {
        toast.success("Story deleted successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting story:", error);
      toast.error("Something went wrong while deleting the story.");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
            All Stories (Global)
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse and moderate all traveler stories posted on the platform.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-slate-150 dark:bg-slate-800/60 h-80 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-rose-500 font-semibold text-center bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl">
        Error loading stories: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 tracking-tight">
          All Stories (Global)
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Browse and moderate all traveler stories posted on the platform.
        </p>
      </div>

      {stories.length === 0 ? (
        <EmptyState
          title="No stories found"
          description="There are currently no stories published by any user on the platform."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card
              key={story._id}
              image={story.images?.[0]}
              title={story.title}
              subtitle="GLOBAL STORY"
              className="flex flex-col h-full bg-white dark:bg-slate-800"
            >
              {/* Image Slider for multiple photos */}
              {story.images && story.images.length > 1 && (
                <div className="h-40 w-full overflow-hidden rounded-xl mb-4 shadow-sm border border-slate-100 dark:border-slate-700/30">
                  <Swiper spaceBetween={10} slidesPerView={1} className="w-full h-full">
                    {story.images.map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <img
                          src={img}
                          alt={`${story.title} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              {/* Story Content */}
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                {story.storyText}
              </p>

              {/* Footer Meta & Admin moderation controls */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/50 mt-auto">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Author:</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-350 truncate max-w-[180px]">
                    {story.email || "Anonymous"}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(story._id)}
                    className="font-bold flex items-center gap-1.5 w-full justify-center"
                  >
                    <FiTrash2 size={14} /> Delete Story
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAllStories;
