import axios from "axios";
import { Base_Backend_Url } from "../constants";
import formatError from "../utils/errorUtils";
// REGISTER SERVICE
const register = async (userData) => {
  try {
    const response = await axios.post(
      `${Base_Backend_Url}/api/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.log("The error is", error.response?.data?.ErrorMessage[0].message);
    console.error(
      "Registration error:",
      error.response?.data?.ErrorMessage || error.message
    );
    throw (
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
      credentials,
      {
        withCredentials: true,
      }
    );
    const { accessToken } = response.data;
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    return response.data;
  } catch (error) {
    console.log("The error in the login service is", error);
    const formattedError = formatError(error);
    console.log("The formatted error is", formattedError);
    throw formattedError;
  }
};
// LOGOUT SERVICE
const logout = async () => {
  try {
    await axios.post(
      `${Base_Backend_Url}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error(
      "Logout failed:",
      error.response.data?.ErrorMessage[0].message || error.message
    );
    throw new Error(
      error.response?.data?.ErrorMessage[0].message ||
        error.message ||
        "Logout failed due to internal server error"
    );
  }
};

// CHECK AUTH SERVICE
export const checkAuth = async () => {
  try {
    const response = await axios.get(`${Base_Backend_Url}/api/auth/checkAuth`, {
      withCredentials: true,
    });
    console.log("THE CHECK AUTHHHHHHHHHHHHH", response);
    return response.data;
  } catch (error) {
    console.error("CheckAuth error:", error.message);
    throw new Error(error.response?.data || "Authentication check failed");
  }
};
const authService = {
  register,
  login,
  logout,
};

export default authService;
