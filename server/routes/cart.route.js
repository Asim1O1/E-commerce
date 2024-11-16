import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);

router.get("/", protectRoute, getCart);

router.put("/", protectRoute, updateCart);

router.delete("/", protectRoute, removeFromCart);

export default router;
