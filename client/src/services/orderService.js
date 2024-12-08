import axios from "axios";
import { Base_Backend_Url } from "../constants";
import formatError from "../utils/errorUtils";
import axiosInstance from "../utils/axiosInstance";

const createOrderService = async (orderDetails) => {
  try {
    const response = await axiosInstance.post(
      `/api/orders/`,
      {
        orderDetails,
      },
      {
        withCredentials: true,
      }
    );

    console.log("The response in the cretae Order service", response);
    return response.data;
  } catch (error) {
    const formattedError = formatError(error);
    throw formattedError;
  }
};

const orderService = {
  createOrderService,
};

export default orderService;
