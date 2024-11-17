import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import { ToastContainer } from "react-toastify";

const RegisterPage = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center w-full bg-gray-100">
        <div className="flex justify-evenly bg-white h-[600px] items-center w-[1000px] rounded-3xl shadow-2xl">
          <div className="ml-10 w-5/12 h-5/6 px-3 rounded-3xl shadow-3xl"></div>
          <div className="w-7/12 mr-7 h-5/6 p-6 pb-4 bg-white flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Sign Up</h2>
            <RegisterForm />
            <p className="text-center text-sm">
              Already have an account?
              <a href="/login" className="text-red-500 cursor-pointer">
                Login
              </a>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
