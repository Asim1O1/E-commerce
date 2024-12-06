import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/:id/", protectRoute, addToCart);

router.get("/:id/", protectRoute, getCart);

router.put("/", protectRoute, updateCart);

router.delete("/:id/", protectRoute, removeFromCart);

export default router;
