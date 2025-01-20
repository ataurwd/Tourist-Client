import React, { useState } from "react";
import { useSpring, animated as a } from "@react-spring/web";
import Title from "../../components/Title";

const Galary = () => {
  const galaryImg = [
    {
      id: 1,
      img: "https://assets-news.housing.com/news/wp-content/uploads/2022/06/28095201/15-worlds-best-places-to-visit-03.jpg",
      title: "World's Best Places",
      description:
        "Explore some of the most breathtaking destinations across the globe that offer stunning views and unforgettable experiences.",
    },
    {
      id: 2,
      img: "https://www.usnews.com/object/image/00000163-8d5b-d398-ad7f-8dffef190000/2-giza-getty.jpg?update-time=1527086541593&size=responsive640",
      title: "Giza Pyramids",
      description:
        "The Great Pyramids of Giza are one of the Seven Wonders of the Ancient World, a true architectural marvel.",
    },
    {
      id: 3,
      img: "https://www.usnews.com/object/image/00000163-8d5b-d398-ad7f-8dffbc210000/16-colosseum-getty.jpg?update-time=1527086963060&size=responsive640",
      title: "Colosseum in Rome",
      description:
        "The Colosseum in Rome is a historical landmark, famous for its ancient gladiator battles and architectural grandeur.",
    },
    {
      id: 4,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb6uP7zLYwQpBXGUHuJGwFAAgOCBI18OVXLw&s",
      title: "Beautiful Nature",
      description:
        "Discover the wonders of nature, from lush forests to tranquil lakes, that offer peace and serenity in every corner.",
    },
    {
      id: 5,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMPFcb0g7N19sp4yVvPeJ0xbLDDow1PGB1g&s",
      title: "Amazing Landscape",
      description:
        "This stunning landscape captures the beauty of rolling hills, valleys, and the splendor of untouched natural wonders.",
    },
    {
      id: 6,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBapPJ2sobnKRhPulDYwUsRjCHJrjimakOgw&s",
      title: "Mountain Peak",
      description:
        "Reach the peak of majestic mountains, offering panoramic views and a sense of triumph and adventure.",
    },
  ];

  return (
    <div className="md:mt-0 mt-10">
      <Title
        heading={" All Shared Stories"}
        text={
          "Discover stories shared by travelers and guides from around the world. Get inspired by their experiences, learn from their journeys, and share your own adventure to connect with the community."
        }
      />
      <div className="md:h-[600px] h-[1000px] grid md:grid-cols-3 grid-cols-1 gap-6 p-6">
        {galaryImg.map((image) => (
          <ImageCard
            key={image.id}
            img={image.img}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>
    </div>
  );
};

const ImageCard = ({ img, title, description }) => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity, imgOpacity, contentOpacity } = useSpring({
    opacity: flipped ? 0.5 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    imgOpacity: flipped ? 0.8 : 1, 
    contentOpacity: flipped ? 1 : 0, 
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className="relative w-full h-full cursor-pointer"
      onMouseEnter={() => setFlipped(true)}  // Trigger flip on hover
      onMouseLeave={() => setFlipped(false)} // Reset flip on hover out
    >
      <a.div
        className="absolute top-0 left-0 w-full h-full backface-hidden rounded-lg shadow-lg"
        style={{
          opacity: imgOpacity,
          transform,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <a.div
        className="absolute top-0 left-0 w-full h-full backface-hidden flex items-center justify-center rounded-lg shadow-lg bg-gray-800 bg-opacity-70"
        style={{
          opacity: contentOpacity,
          transform: transform.to((t) => `${t} rotateY(180deg)`),
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-center items-center text-white p-4">
          <span className="text-xl font-semibold">{title}</span>
          <span className="text-center text-sm">{description}</span>
        </div>
      </a.div>
    </div>
  );
};

export default Galary;
