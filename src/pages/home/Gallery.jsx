import React, { useState } from "react";

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(0);
  const toggle = ({ currentIdx }) =>
    setIsOpen((prevIdx) => (prevIdx == currentIdx ? null : currentIdx));
  const sliders = [
    {
      img: "https://www.deraresort.com/images/blog-ratargul-swamp-forest-sylhet.jpg",
      title: "Exploring the Charm",
    },
    {
      img: "https://www.atab.org.bd/public/uploads/backend/posts/Zqide1683452387-sub-img-2.jpg",
      title: "bandarban",
    },
    {
      img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/ce/fc/c1/caption.jpg?w=500&h=400&s=1",
      title: "Summer",
    },
    {
      img: "https://cosmosgroup.sgp1.digitaloceanspaces.com/news/details/8949351_Bichanakandi%20sylhet%20Bangladesh%20Tourist%20Place.jpg",
      title: "bichanakandi",
    },
    {
      img: "https://www.gokitetours.com/wp-content/uploads/2024/07/Top-10-Tourist-Places-to-Visit-in-Bangladesh.webp",
      title: "cox's bazar",
    },
  ];
  return (
    <section className="py-16 md:px-28 px-4 grid grid-cols-3 gap-10">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-primary underline">
          Travel Gallery
        </h2>
        <p className="text-gray-600 mt-2">Discover breathtaking destinations</p>
      </div>
      <div className="col-span-2">
        <div className="flex justify-center gap-1 md:gap-4 cursor-pointer">
          {sliders.map((slide, idx) => (
            <div
              onClick={() => toggle({ currentIdx: idx })}
              className={`relative h-[400px] rounded-3xl bg-gray-300 duration-500 ease-in-out ${
                isOpen == idx ? " w-[300px] md:w-[400px] " : "w-[120px]"
              }`}
              key={idx}
            >
              <img
                width={640}
                height={540}
                className="h-full rounded-3xl object-cover"
                src={slide.img}
                alt="accordion navigate ui"
              />
              <img
                width={64}
                height={64}
                className={`absolute bottom-5 border border-white transition-all duration-500 md:border-2 ${
                  isOpen === idx
                    ? "left-4"
                    : "left-1/2 -translate-x-1/2 duration-700"
                } h-10 w-10 rounded-full object-cover md:h-[50px] md:w-[50px]`}
                src={slide.img}
                alt="accordion navigate ui"
              />
              <div
                className={`absolute bottom-5 left-[45%] text-white transition-all duration-300 md:left-[100px] ${
                  isOpen === idx ? "opacity-100" : "opacity-0 "
                }`}
              >
                <h3 className="text-lg font-semibold md:text-3xl">Status</h3>
                <p className="text-sm md:text-xl">{slide.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
