import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import _config from "./utils/config.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import authRoute from "./routes/auth.route.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("E-commerce platform running...");
});

app.use(globalErrorHandler);

export default app;
