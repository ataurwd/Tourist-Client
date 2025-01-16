import React from "react";
import Lottie from "lottie-react";
import animationData from "../../src/lottie/loading.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={animationData} loop={true} className="h-96" />
    </div>
  );
};

export default Loading;
