import axios from "axios";
import { Base_Backend_Url } from "../constants";
import formatError from "../utils/errorUtils";

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
    console.log("The response while adding product is", response);
    return response;
  } catch (error) {
    console.log("The error while adding product", error);
    const formattedError = formatError(error);
    console.log("The formatted ");
    throw formattedError;
  }
};

export const getAllProductService = async (
  page = 1,
  limit = 10,
  category = ""
) => {
  console.log("ENTERED THE GET ALL PRODUCT SERVICE");
  try {
    const params = {
      page,
      limit,
      category,
    };
    const response = await axios.get(`${Base_Backend_Url}/api/products/`, {
      params,
    });
    console.log("The response from getAllProduct is", response);
    return response.data;
  } catch (error) {
    console.log("The error from getAllProduct is", error);
    const formattedError = formatError(error);
    console.log("The formatted error is", formattedError);
    throw formattedError;
  }
};

export const deleteSingleProductService = async (id) => {
  try {
    
    console.log("The id of the selected product is", id);
    const response = await axios.delete(
      `${Base_Backend_Url}/api/products/${id}`,
      {
        withCredentials: true,
      }
    );

    console.log("The response while deleting product is", response);
    return response;
  } catch (error) {
    console.log("The error while deleting product", error);
    const formattedError = formatError(error);
    console.log("The formatted error is", formattedError);
    throw formattedError;
  }
};

export const updateProductsService = async () => {
  try {
    const response = await axios.put(`${Base_Backend_Url}/api/products/`, {
      withCredentials: true,
    });
    console.log("The response while updating product is", response);
    return response;
  } catch (error) {
    console.log("The error while updating product", error);
    const formattedError = formatError(error);
    console.log("The formatted error is", formattedError);
    throw formattedError;
  }
};

const productService = {
  addProduct,
  getAllProductService,
  deleteSingleProductService,
};

export default productService;
