import React from "react";
import { Link } from "react-router-dom";

const UnauthPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-6">
      <div className="max-w-lg text-center">
        <img
          src="https://via.placeholder.com/400x300" // Replace with a professional 403/unauthorized image
          alt="Unauthorized Access"
          className="w-full h-auto mb-8"
        />
        <h1 className="text-4xl font-bold mb-4 text-red-600">Access Denied</h1>
        <p className="text-lg mb-6">
          You do not have permission to access this page. If you believe this is
          a mistake, please contact your administrator.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Go to Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-100 transition"
          >
            Login Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthPage;
