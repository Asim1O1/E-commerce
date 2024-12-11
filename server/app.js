import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import _config from "./utils/config.js";
import globalErrorHandler, {
  notFoundHandler,
} from "./middlewares/globalErrorHandler.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import productRoute from "./routes/product.route.js";
import cartRoute from "./routes/cart.route.js";
import orderRoute from "./routes/order.route.js";

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: " http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute)
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("E-commerce platform running...");
});

app.use(notFoundHandler);

app.use(globalErrorHandler);

export default app;
