import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res) => {
  const { cartId, buyNowProductId, buyNowQuantity, paymentDetails } = req.body;

  try {
    let products = [];
    let totalAmount = 0;

    if (cartId) {
      // Add to Cart + Checkout Workflow
      const cart = await Cart.findById(cartId).populate("products.productId");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      products = cart.products.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      }));

      totalAmount = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    } else if (buyNowProductId && buyNowQuantity) {
      // Buy Now Workflow
      const product = await Product.findById(buyNowProductId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      products = [
        {
          productId: product._id,
          quantity: buyNowQuantity,
          price: product.price,
        },
      ];

      totalAmount = product.price * buyNowQuantity;
    } else {
      return res.status(400).json({ message: "Invalid order request" });
    }

    // Save the order
    const order = new Order({
      userId: req.user._id,
      products,
      totalAmount,
      paymentDetails,
      stripeSessionId: paymentDetails?.stripeSessionId || null,
    });

    await order.save();

    // Optionally clear cart if used
    if (cartId) {
      await Cart.findByIdAndDelete(cartId);
    }

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
