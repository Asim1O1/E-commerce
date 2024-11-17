import React, { useState } from "react";
import PasswordToggle from "../../utils/PasswordToggle.jsx";
import { ClipLoader } from "react-spinners";
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

  const { fullName, userName, address, email, password } = formData;
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

    if (!fullName || fullName.trim().length < 3) {
      toast.error("Full Name must be at least 3 characters long.");
      isValid = false;
    }

    if (!userName || userName.trim().length < 3) {
      toast.error("Username must be at least 3 characters long.");
      isValid = false;
    }

    if (!address || address.trim().length === 0) {
      toast.error("Address is required.");
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      isValid = false;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
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
      const response = await dispatch(registerUser(formData));
      console.log("Therespomns is", response);

      if (
        response.payload.StatusCode === 200 &&
        response.payload.IsSuccess === true
      ) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        console.log("Gone to else");
        toast.error(response.payload || "Server Error. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message);

      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              className="peer h-11 w-full border border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
              placeholder="Full Name"
            />
            <label
              htmlFor="fullName"
              className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
            >
              Full Name
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={handleChange}
              className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
              placeholder="Username"
            />
            <label
              htmlFor="userName"
              className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
            >
              Username
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleChange}
              className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
              placeholder="Address"
            />
            <label
              htmlFor="address"
              className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
            >
              Address
            </label>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="peer h-11 w-full border border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
            placeholder="Email"
          />
          <label
            htmlFor="email"
            className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
          >
            Email
          </label>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="peer h-11 w-full border border-gray-300 text-black placeholder-transparent focus:outline-none focus:border-indigo-600 p-4 rounded-sm"
            placeholder="Password"
          />
          <label
            htmlFor="password"
            className="absolute left-4 -top-3.5 bg-white px-1 text-sm text-black transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-black peer-placeholder-shown:bg-transparent peer-focus:-top-2 peer-focus:text-gray-600 peer-focus:bg-white"
          >
            Password
          </label>
          <div className="absolute inset-y-6 mx-24">
            <PasswordToggle
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2"></div>

        {loading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color={"#0000ff"} loading={loading} size={50} />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white rounded-sm"
            disabled={loading}
          >
            Create account
          </button>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
