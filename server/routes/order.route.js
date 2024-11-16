import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.route("/").post(protectRoute, createOrder);

export default router;
