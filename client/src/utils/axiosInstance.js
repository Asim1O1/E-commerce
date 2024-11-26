import axios from "axios";
import store from "../store/store";
import { refreshAccessToken } from "../features/auth/authSlice";
import { Base_Backend_Url } from "../constants";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: Base_Backend_Url,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await store.dispatch(refreshAccessToken());

      const newAccessToken = Cookies.get("accessToken");
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
