import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { createResponse } from "../utils/responseHelper.js";

export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json(
          createResponse(404, false, "The requested product does not exist.")
        );
    }

    if (product.stock < quantity) {
      return res
        .status(400)
        .json(
          createResponse(
            400,
            false,
            "Insufficient stock available for the requested product."
          )
        );
    }

    if (cart) {
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      return res
        .status(200)
        .json(
          createResponse(
            200,
            true,
            [],
            "Product successfully added to your cart."
          )
        );
    } else {
      const newCart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });

      await newCart.save();
      return res
        .status(201)
        .json(
          createResponse(
            201,
            true,
            [],
            "A new cart has been created and the product has been successfully added."
          )
        );
    }
  } catch (error) {
    console.error("Error occurred while adding to cart:", error);
    return res
      .status(500)
      .json(
        createResponse(
          500,
          false,
          "An error occurred while processing your request.",
          error.message
        )
      );
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res
        .status(404)
        .json(
          createResponse(
            404,
            false,
            "Your cart is empty. Add items to view them here."
          )
        );
    }

    return res.status(200).json(createResponse(200, true, [], cart));
  } catch (error) {
    console.error("Error occurred while retrieving the cart:", error);
    return res
      .status(500)
      .json(
        createResponse(
          500,
          false,
          "Unable to retrieve cart details. Please try again later.",
          error.message
        )
      );
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.products.length === 0) {
      return res
        .status(404)
        .json(
          createResponse(404, false, "Your cart is empty or does not exist.")
        );
    }

    const productExists = cart.products.some(
      (item) => item.productId.toString() === productId
    );

    if (!productExists) {
      return res
        .status(400)
        .json(
          createResponse(
            400,
            false,
            "The specified product does not exist in your cart."
          )
        );
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    return res
      .status(200)
      .json(
        createResponse(
          200,
          true,
          [],
          "Product successfully removed from your cart."
        )
      );
  } catch (error) {
    console.error("Error occurred while removing product from cart:", error);
    return res
      .status(500)
      .json(
        createResponse(
          500,
          false,
          "An error occurred while processing your request. Please try again.",
          error.message
        )
      );
  }
};

export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    if (!productId || quantity == null) {
      return res
        .status(400)
        .json(
          createResponse(400, false, "Product ID and quantity are required.")
        );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json(
          createResponse(404, false, "The specified product does not exist.")
        );
    }

    if (quantity > product.stock) {
      return res
        .status(400)
        .json(
          createResponse(
            400,
            false,
            `Insufficient stock for the requested product. Available stock: ${product.stock}.`
          )
        );
    }

    const cart = await Cart.findOne({ userId });
    if (!cart || cart.products.length === 0) {
      return res
        .status(404)
        .json(
          createResponse(404, false, "Your cart is empty or does not exist.")
        );
    }

    const productInCart = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (!productInCart) {
      return res
        .status(404)
        .json(
          createResponse(
            404,
            false,
            "The specified product is not in your cart."
          )
        );
    }

    if (quantity === 0) {
      cart.products = cart.products.filter(
        (item) => item.productId.toString() !== productId
      );
      await cart.save();
      return res
        .status(200)
        .json(createResponse(200, true, [], "Product removed from your cart."));
    } else {
      productInCart.quantity = quantity;
      await cart.save();
      return res
        .status(200)
        .json(
          createResponse(
            200,
            true,
            [],
            "Cart updated successfully with the new quantity."
          )
        );
    }
  } catch (error) {
    console.error("Error occurred while updating the cart:", error);
    return res
      .status(500)
      .json(
        createResponse(
          500,
          false,
          "An error occurred while updating your cart. Please try again later.",
          error.message
        )
      );
  }
};
