import axios from "axios";
import { Base_Backend_Url } from "../constants";

const addProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${Base_Backend_Url}/api/product/`,
      productData
    );
    console.log("The response while adding product is", response);
    return response.data;
  } catch (error) {
    console.log("The error while adding product", error);
    return (
      error.response?.data?.ErrorMessage[0].message ||
      error.message ||
      "Adding Product failed due to internal server error"
    );
  }
};

const productService = {
  addProduct,
};

export default productService;
