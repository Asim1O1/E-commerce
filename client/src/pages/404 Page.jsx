import React from "react";
import { Link } from "react-router-dom";

import image from "../assets/404 image.webp";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-red-500 font-bold text-3xl text-center">
        404 Error!
      </h1>

      <img src={image} alt="404 Error" className="w-1/2 h-auto mt-4" />
      <h2 className="text-black text-center mt-4 font-semibold">
        The page you are looking for does not exist.
      </h2>
      <Link to="/" className="mt-8">
        <button className="bg-red-500">Go to Home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
