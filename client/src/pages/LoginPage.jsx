import React from "react";
import LoginForm from "../components/auth/LoginForm";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex bg-white h-[600px] w-[1000px] rounded-3xl shadow-2xl">
        {/* Left Side - Form Area */}
        <div className="w-7/12 h-full p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-8">Please sign in to your account</p>

            <LoginForm />

            <p className="text-center text-sm mt-6 text-gray-600">
              Don't have an account yet?{" "}
              <a
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
          <ToastContainer />
        </div>

        {/* Right Side - Decorative Area */}
        <div className="w-5/12 h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-r-3xl flex flex-col justify-center items-center p-12">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Hello, Friend!</h1>
            <p className="text-blue-100 mb-8">
              Enter your personal details and start your journey with us
            </p>
            {/* Add your illustration or decorative elements here */}
            <div className="w-full max-w-sm mx-auto">
              {/* You can add an SVG illustration or image here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
