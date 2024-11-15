import express from "express";

import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

// AUTH ROUTES

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", protectRoute, userLogout);

export default router;
