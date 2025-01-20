import React from "react";

const Title = ({heading, text}) => {
  return (
    <div className="text-center md:mt-10 mt-2 px-5">
      <h1 className="md:text-4xl text-xl font-semibold text-primary underline">
        {heading}
      </h1>
      <p className="my-3 md:w-2/3 mx-auto">
        {text}
      </p>
    </div>
  );
};

export default Title;
