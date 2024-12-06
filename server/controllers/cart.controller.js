import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { createResponse } from "../utils/responseHelper.js";
import { ObjectId } from "mongodb";

export const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { id } = req.params;

  console.log("Received userId from params:", id); // Log to check if id is correct
  console.log("Received productId and quantity:", productId, quantity);

  if (!productId || !quantity) {
    return res
      .status(400)
      .json(
        createResponse(
          400,
          false,
          null,
          "Product ID and quantity are required."
        )
      );
  }

  try {
    // Find the user's cart using the 'id' from the URL
    const cart = await Cart.findOne({ userId: id });

    // Find the product being added to the cart
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json(
          createResponse(
            404,
            false,
            null,
            "The requested product does not exist."
          )
        );
    }

    // Check if enough stock is available
    if (product.stock < quantity) {
      return res
        .status(400)
        .json(
          createResponse(
            400,
            false,
            null,
            "Insufficient stock available for the requested product."
          )
        );
    }

    // Product details to be added to the cart
    const productDetails = {
      productId: product._id,
      quantity,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      totalPrice: product.price * quantity,
      description: product.description,
      category: product.category,
      stock: product.stock,
    };

    if (cart) {
      // Check if the product already exists in the cart
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        // If the product already exists, update the quantity and totalPrice
        existingProduct.quantity += quantity;
        existingProduct.totalPrice = existingProduct.quantity * product.price;
      } else {
        // If the product is new to the cart, add it to the cart
        cart.products.push(productDetails);
      }

      // Recalculate total quantity and price for the entire cart
      cart.totalQuantity = cart.products.reduce(
        (total, item) => total + item.quantity,
        0
      );
      cart.totalPrice = cart.products.reduce(
        (total, item) => total + item.totalPrice,
        0
      );

      await cart.save();
      return res.status(200).json(
        createResponse(200, true, [], {
          message: "Product successfully added to your cart.",
          cart_data: cart,
        })
      );
    } else {
      const newCart = new Cart({
        userId: id, // Use 'id' from the params
        products: [productDetails],
        totalQuantity: quantity,
        totalPrice: productDetails.totalPrice,
      });

      await newCart.save();
      return res.status(201).json(
        createResponse(201, true, [], {
          message:
            "A new cart has been created and the product has been successfully added.",
          cart_data: newCart,
        })
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
          null,
          "An error occurred while processing your request.",
          error.message
        )
      );
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });

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
  const productId = req.params.id;  // The product ID from the request, which is a string
  console.log("The params is", productId);

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

    console.log("THE CART PRODUCTS ARE", cart.products);

    // Convert productId from string to ObjectId for comparison
    const productObjectId = new ObjectId(productId);
    console.log("The product object id is", productObjectId);

    // Check if the product exists in the cart
    const productExists = cart.products.some((item) => 
      item.productId.equals(productObjectId)  // Compare using ObjectId
    );
    console.log("The product exists is", productExists);

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

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (item) => !item.productId.equals(productObjectId) 
    );

    // Recalculate the total price and quantity
    cart.totalQuantity = cart.products.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.totalPrice,
      0
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

    // If the quantity is 0, remove the product from the cart
    if (quantity === 0) {
      cart.products = cart.products.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      // Update the product quantity and recalculate totalPrice
      productInCart.quantity = quantity;
      productInCart.totalPrice = productInCart.quantity * productInCart.price;
    }

    // Recalculate total quantity and total price for the entire cart
    cart.totalQuantity = cart.products.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cart.totalPrice = cart.products.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

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
