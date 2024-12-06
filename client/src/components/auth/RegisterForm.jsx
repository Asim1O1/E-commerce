import React, { useState } from "react";

import { User, Mail, Home, Lock, UserCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../features/auth/authSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    address: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (formData) => {
    const { fullName, userName, address, email, password } = formData;
    let isValid = true;
    const errors = [];

    const isEmpty = (field) => !field || field.trim().length === 0;

    if (Object.values(formData).every(isEmpty)) {
      errors.push("Please fill out the form.");
    }
    if (!fullName || fullName.trim().length < 3) {
      errors.push("Full Name must be at least 3 characters long.");
    }
    if (!userName || userName.trim().length < 3) {
      errors.push("Username must be at least 3 characters long.");
    }
    if (isEmpty(address)) {
      errors.push("Address is required.");
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      errors.push("Please enter a valid email address.");
    }
    if (!password || password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    // Display all error messages
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm(formData);
    if (!isValid) {
      return;
    }

    setLoading(true);
    console.log("Submitting form data...");

    try {
      const response = await dispatch(registerUser(formData)).unwrap();
      console.log("The response in the register form:", response);

      // Check the response structure properly
      if (response?.StatusCode === 200 && response?.IsSuccess === true) {
        navigate("/login");
        console.log("Registration successful, navigating to login.");
        toast.success("Registration successful!");
      } else {
        console.log("Registration failed. Error response:", response);
        toast.error(
          response?.ErrorMessage?.[0]?.message ||
            "Server Error. Please try again."
        );
        return response;
      }
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response && error.response.data) {
        // Handle API-specific error responses
        toast.error(error.response.data.message || "An error occurred.");
      } else if (error.message) {
        // Handle general JavaScript errors
        toast.error(error.message);
      } else {
        // Fallback error message
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false); // Ensure loading state is cleared no matter what
    }
  };

  return (
    <div className="w-full">
      <form
        className="space-y-5"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        {/* Full Name Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <User size={20} />
          </div>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            className="w-full px-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-transparent peer"
            placeholder="Full Name"
          />
          <label
            htmlFor="fullName"
            className="absolute left-10 -top-2 bg-white px-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-mt-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all duration-200"
          >
            Full Name
          </label>
        </div>

        {/* Username Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <UserCircle size={20} />
          </div>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            className="w-full px-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-transparent peer"
            placeholder="Username"
          />
          <label
            htmlFor="userName"
            className="absolute left-10 -top-2 bg-white px-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-mt-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all duration-200"
          >
            Username
          </label>
        </div>

        {/* Address Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <Home size={20} />
          </div>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            className="w-full px-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-transparent peer"
            placeholder="Address"
          />
          <label
            htmlFor="address"
            className="absolute left-10 -top-2 bg-white px-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-mt-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all duration-200"
          >
            Address
          </label>
        </div>

        {/* Email Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <Mail size={20} />
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            className="w-full px-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-transparent peer"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="absolute left-10 -top-2 bg-white px-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-mt-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all duration-200"
          >
            Email
          </label>
        </div>

        {/* Password Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <Lock size={20} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-10 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-transparent peer"
            placeholder="Password"
            required
          />
          <label
            htmlFor="password"
            className="absolute left-10 -top-2 bg-white px-2 text-xs font-medium text-gray-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-mt-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600 transition-all duration-200"
          >
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -mt-2.5 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
