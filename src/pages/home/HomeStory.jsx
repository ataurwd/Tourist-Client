import React, { useContext } from "react";
import Title from "../../components/Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { FacebookShareButton } from "react-share";
import { FaFacebook } from "react-icons/fa";
import "swiper/css";
import { FormContext } from "../../context/FormData";
import { Link } from "react-router-dom";
import useAllUser from "../../hooks/useAllUser";

const HomeStory = ({ storyData }) => {
  const { user } = useContext(FormContext);
  const [alluser] = useAllUser();
  return (
    <div className="md:my-10 mt-2 lg:px-20 md:px-10 px-4">
      <Title
        heading={"Stories from Travelers"}
        text={
          "Dive into captivating tales from adventurers around the world. From life-changing encounters to breathtaking experiences, these stories showcase the beauty, challenges, and magic of exploring new places. Let their journeys inspire your next adventure!"
        }
      />
      {/* Story Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {storyData.slice(0, 4).map((story) => (
          <div
            key={story._id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col"
          >
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
            <h2 className="text-xl font-bold mb-2">{story.title}</h2>
            <p className="text-gray-600 mb-4">
              {story.storyText.slice(0, 100)}...
            </p>
            {/* Facebook Share Button */}
            <div className="mt-auto">
              <FacebookShareButton
                url={window.location.href}
                quote={story.title}
                hashtag="#TravelStories"
              >
                {user ? (
                  <button className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition">
                    <FaFacebook size={20} />
                    <span>Share on Facebook</span>
                  </button>
                ) : (
                  ""
                )}
              </FacebookShareButton>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full mt-5 space-x-5">
        {alluser.role !== 'guide' &&         <Link
          to={'/dashboard/tourist-stories'}
          className="bg-primary px-4 py-1 rounded-md text-white"
        >
          All Stories
        </Link>
}
        <Link className="bg-primary px-4 py-1 rounded-md text-white">
          Add Stories
        </Link>
      </div>
    </div>
  );
};

export default HomeStory;
