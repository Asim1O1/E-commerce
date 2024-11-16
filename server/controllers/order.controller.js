import { createResponse } from "../utils/responseHelper.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createOrder = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user.id;
    console.log("The user id is", userId);
    const { products, totalPrice, paymentDetails } = req.body;

    if (!userId || !products || !totalPrice || !paymentDetails) {
      return res
        .status(400)
        .json(createResponse(400, false, "All fields are required!"));
    }

    for (let item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res
          .status(400)
          .json(createResponse(400, false, `Product does not exist.`));
      }

      if (product.stock === 0) {
        return res
          .status(400)
          .json(
            createResponse(
              400,
              false,
              `Product ${product.name} is out of stock.`
            )
          );
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json(
            createResponse(
              400,
              false,
              `Insufficient stock for product ${product.name}. Only ${product.stock} items left.`
            )
          );
      }

      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      userId,
      products,
      totalPrice,
      paymentDetails,
    });

    const savedOrder = await order.save();

    await session.commitTransaction();
    return res
      .status(201)
      .json(
        createResponse(201, true, [], "Order created successfully", savedOrder)
      );
  } catch (error) {
    await session.abortTransaction();
    console.error("Error:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }

    if (error.isJoi) {
      return res
        .status(400)
        .json(
          createResponse(400, false, [
            `Validation error: ${error.details[0].message}`,
          ])
        );
    }

    return res
      .status(500)
      .json(
        createResponse(
          500,
          false,
          ["Server error: Unable to create order"],
          error.message
        )
      );
  } finally {
    session.endSession();
  }
};
