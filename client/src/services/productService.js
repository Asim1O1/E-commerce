import axios from "axios";
import { Base_Backend_Url } from "../constants";
import formatError from "../utils/errorUtils";
import axiosInstance from "../utils/axiosInstance";

const addProduct = async (productData) => {
  try {
    const updatedProductData = new FormData();
    updatedProductData.append("name", productData.name);
    updatedProductData.append("description", productData.description);
    updatedProductData.append("price", productData.price);
    updatedProductData.append("category", productData.category);
    updatedProductData.append("stock", productData.stock);
    updatedProductData.append("image", productData.image);
    const response = await axios.post(
      `${Base_Backend_Url}/api/products/`,
      updatedProductData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    const formattedError = formatError(error);

    throw formattedError;
  }
};

export const getAllProductService = async (
  page = 1,
  limit = 10,
  category = ""
) => {
  try {
    const params = {
      page,
      limit,
      category,
    };
    const response = await axios.get(`${Base_Backend_Url}/api/products/`, {
      params,
    });

    return response.data;
  } catch (error) {
    const formattedError = formatError(error);

    throw formattedError;
  }
};

export const getSingleProductService = async (id) => {
  try {
    const response = await axios.get(`${Base_Backend_Url}/api/products/${id}`);

    return response;
  } catch (error) {
    const formattedError = formatError(error);

    throw formattedError;
  }
};

export const deleteSingleProductService = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/products/${id}`);

    return response;
  } catch (error) {
    const formattedError = formatError(error);

    throw formattedError;
  }
};

export const updateProductsService = async (id, productData) => {
  try {
    const response = await axiosInstance.put(
      `/api/products/${id}`,
      productData
    );

    return response;
  } catch (error) {
    const formattedError = formatError(error);

    throw formattedError;
  }
};

const productService = {
  addProduct,
  getAllProductService,
  deleteSingleProductService,
};

export default productService;
