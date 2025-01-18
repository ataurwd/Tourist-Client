import React from "react";
import { useLoaderData } from "react-router-dom";

const GuideDetails = () => {
  const data = useLoaderData();
  return (
    <div className="grid place-items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Welcome, {data.name}!</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <img
          src={data?.photo}
          alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold"><span className="font-bold">Name:</span> {data.name}</h2>
        <p className="text-gray-600"><span className="font-bold">Email:</span> {data?.email}</p>
        <p className="text-gray-600">
          {" "}
          <span className="font-bold">Role: </span>
          {data?.role}
        </p>
      </div>
    </div>
  );
};

export default GuideDetails;
