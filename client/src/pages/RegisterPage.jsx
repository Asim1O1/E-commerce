import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { ToastContainer } from "react-toastify";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex bg-white h-[600px] w-[1000px] rounded-3xl shadow-2xl">
        <div className="w-5/12 h-full p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-l-3xl flex flex-col justify-center items-center">
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-blue-100 mb-6">
              Start your journey with us today and discover amazing
              possibilities.
            </p>
          </div>
        </div>

        <div className="w-7/12 h-full p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Create Account
          </h2>
          <RegisterForm />
          <p className="text-center text-sm mt-6 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </a>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
