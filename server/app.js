import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectToDB from "./utils/connectToDB.js";
import _config from "./utils/config.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("E-commerce platform running...");
});


export default app;