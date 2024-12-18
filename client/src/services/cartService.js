import formatError from "../utils/errorUtils";
import axiosInstance from "../utils/axiosInstance";

export const addToCartService = async ({ userId, productId, quantity }) => {
  try {
    const response = await axiosInstance.post(
      `/api/cart/${userId}/`,
      {
        productId: productId,
        quantity: quantity,
      },
      { withCredentials: true }
    );
    console.log("The response from addToCart is", response);
    return response;
  } catch (error) {
    console.log("The error from addToCart is", error);
    const formattedError = formatError(error);
    console.log("The formatted error is", formattedError);
    throw formattedError;
  }
};

export const getCartService = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/cart/${userId}/`);
    console.log("Cart data retrieved successfully:", response.data);
    return response.data.Result;
  } catch (error) {
    console.log("Error while retrieving cart:", error);
    const formattedError = formatError(error);
    throw formattedError;
  }
};

export const removeFromCartService = async (productId) => {
  try {
    console.log("The product id is", productId);
    const response = await axiosInstance.delete(`/api/cart/${productId}/`);
    console.log("Product removed from cart successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while removing product from cart:", error);
    const formattedError = formatError(error);
    throw formattedError;
  }
};

export const updateCartService = async (productId, quantity) => {
  try {
    console.log("The product Id and the quantity is", productId, quantity);
    const response = await axiosInstance.put(`/api/cart/`, {
      productId,
      quantity,
    });
    console.log("Cart updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error while updating cart:", error);
    const formattedError = formatError(error);
    throw formattedError;
  }
};

const cartService = {
  addToCartService,
  getCartService,
  removeFromCartService,
  updateCartService,
};

export default cartService;
