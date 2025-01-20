import React, { useState } from "react";
import useAllStories from "./../../hooks/useAllStories";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Title from "../../components/Title";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import Loading from './../../components/Loading';

const Community = () => {
  const [allStorie , isLoading] = useAllStories();
  if (isLoading) {
    <Loading/>
  }
  return (
    <>
      <Title
        heading={" All Shared Stories"}
        text={
          "Discover stories shared by travelers and guides from around the world. Get inspired by their experiences, learn from their journeys, and share your own adventure to connect with the community."
        }
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:px-20 md:px-10 px-5 gap-5 md:my-10">
        {allStorie.map((story) => (
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
              {story.storyText.slice(0, 50)}...
            </p>
            <div className="flex space-x-3">
                <FacebookShareButton url={'http://localhost:5174/'} quote={story.title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href} title={story.title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href} title={story.title}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Community;
