import axios from "axios";
import { Base_Backend_Url } from "../constants";

// REGISTER SERVICE
const register = async (userData) => {
  try {
    const response = await axios.post(
      `${Base_Backend_Url}/api/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.log("Th error is.............", error);
    console.log("The error is", error.response?.data?.ErrorMessage[0].message);
    console.error(
      "Registration error:",
      error.response?.data?.ErrorMessage || error.message
    );
    return (
      error.response?.data?.ErrorMessage[0].message ||
      error.message ||
      "Registration failed due to internal server error"
    );
  }
};

// LOGIN SERVICE
const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${Base_Backend_Url}/api/auth/login`,
      credentials
    );
    const { accessToken } = response.data;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response?.data?.ErrorMessage[0].message || error.message
    );
    return (
      error.response?.data?.ErrorMessage[0].message ||
      error.message ||
      "Login failed due to internal server error"
    );
  }
};

// LOGOUT SERVICE
const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      await axios.post(
        `${Base_Backend_Url}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error(
      "Logout error:",
      error.response?.data?.message || error.message
    );
    return error || "Logout failed";
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
