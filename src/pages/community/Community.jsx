import React, { useState } from "react";
import useAllStories from "./../../hooks/useAllStories";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Title from "../../components/Title";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import Loading from "./../../components/Loading";
import SkeletonCard from "../../components/shared/SkeletonCard";
import SEO from "../../components/SEO";

const Community = () => {
  const [allStorie, refetch, isLoading] = useAllStories();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStories = allStorie.filter((story) =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SEO 
          title="Travel Community Stories"
          description="Read and share inspiring travel stories, journals, and adventures shared by members of the Treva travel community."
          urlPath="/community"
          keywords="travel stories, travel blogs, community journals, travelers, travel diaries"
        />
        <Title heading="Community Stories" text="Loading traveler experiences..." />
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mt-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <SkeletonCard key={n} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <SEO 
        title="Travel Community Stories"
        description="Read and share inspiring travel stories, journals, and adventures shared by members of the Treva travel community."
        urlPath="/community"
        keywords="travel stories, travel blogs, community journals, travelers, travel diaries"
      />
      <Title
        heading="Community Stories"
        text="Discover stories shared by travelers and guides from around the world. Get inspired by their experiences and share your own adventure."
      />

      {/* Search Bar */}
      <div className="flex justify-center mb-10 mt-6">
        <div className="relative w-full max-w-lg">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories by title..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-700 dark:text-slate-200 text-sm font-medium shadow-sm"
          />
        </div>
      </div>

      {/* Empty state */}
      {filteredStories.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50/50 dark:bg-slate-800/10 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
          <p className="text-slate-400 text-lg font-medium mb-3">
            No stories matched your search.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="text-sm font-bold text-primary hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Story Grid */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
        {filteredStories.map((story) => (
          <div
            key={story._id}
            className="flex flex-col h-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-1"
          >
            {/* Swiper Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                className="w-full h-full"
              >
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

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1.5 block">
                Community Journal
              </span>
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-100 font-display line-clamp-1 mb-2">
                {story.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-5">
                {story.storyText}
              </p>

              {/* Social Share Buttons */}
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mr-auto">
                  Share
                </span>
                <FacebookShareButton
                  url={window.location.href}
                  quote={story.title}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-200">
                    <FaFacebook size={14} />
                  </div>
                </FacebookShareButton>
                <TwitterShareButton
                  url={window.location.href}
                  title={story.title}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white flex items-center justify-center transition-all duration-200">
                    <FaTwitter size={14} />
                  </div>
                </TwitterShareButton>
                <WhatsappShareButton
                  url={window.location.href}
                  title={story.title}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition-all duration-200">
                    <FaWhatsapp size={14} />
                  </div>
                </WhatsappShareButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
