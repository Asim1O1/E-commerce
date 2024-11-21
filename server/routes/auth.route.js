import express from "express";

import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
import { createResponse } from "../utils/responseHelper.js";

const router = express.Router();

// AUTH ROUTES

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", protectRoute, userLogout);
router.get("/checkAuth", protectRoute, (req, res) => {
  const user = req.user;
  return res.status(200).json(createResponse(200, true, [], user));
});

export default router;
