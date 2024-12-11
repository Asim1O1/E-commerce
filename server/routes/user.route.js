import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getUserProfile", protectRoute, getUserProfile);
router.get("/updateUserProfile", protectRoute, updateUserProfile);

export default router;
