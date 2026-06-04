import React, { useContext } from "react";
import Title from "../../components/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { FacebookShareButton } from "react-share";
import { FaFacebook } from "react-icons/fa";
import "swiper/css";
import { FormContext } from "../../context/FormData";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Button from "../../components/shared/Button";
import Card from "../../components/shared/Card";

const HomeStory = ({ storyData = [] }) => {
  const { user } = useContext(FormContext);
  const [loginUser] = useUser();

  const handleShareSuccess = () => {
    // optional tracking
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Title
        heading="Stories from Travelers"
        text="Dive into captivating tales from adventurers around the world. Let their journeys inspire your next coordinates!"
      />

      {/* Story Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {storyData.slice(0, 4).map((story) => (
          <div key={story._id} className="flex flex-col h-full bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-1">
            {/* Swiper slider wrapper */}
            <div className="relative h-48 w-full group overflow-hidden">
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
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

            {/* Content area */}
            <div className="p-5 flex flex-col flex-grow">
              <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1.5 block">
                Traveler Journal
              </span>
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-100 font-display line-clamp-1 mb-2">
                {story.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6">
                {story.storyText}
              </p>

              {/* Share Trigger */}
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <FacebookShareButton
                  url={window.location.href}
                  quote={story.title}
                  hashtag="#TrevaTravels"
                  onShareWindowClose={handleShareSuccess}
                  className="w-full"
                >
                  {user ? (
                    <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold rounded-xl transition duration-200 shadow-sm active:scale-95">
                      <FaFacebook size={16} />
                      <span>Share Story</span>
                    </button>
                  ) : (
                    <div className="text-[10px] text-center text-slate-400 py-2">
                      Login to share story
                    </div>
                  )}
                </FacebookShareButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin / Guide / Tourist control triggers */}
      <div className="flex justify-center items-center gap-4 mt-12">
        <Link
          to={`${
            loginUser?.role === "admin"
              ? "/dashboard/admin-story"
              : loginUser?.role === "guide"
              ? "/dashboard/guide-manage-story"
              : "/dashboard/tourist-stories"
          }`}
        >
          <Button variant="outline" size="sm" className="font-bold">
            All Stories
          </Button>
        </Link>
        <Link
          to={`${
            loginUser?.role === "admin"
              ? "/dashboard/admin-add-story"
              : loginUser?.role === "guide"
              ? "/dashboard/guide-add-story"
              : "/dashboard/tourist-add-story"
          }`}
        >
          <Button variant="primary" size="sm" className="font-bold">
            Share Your Story
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeStory;
