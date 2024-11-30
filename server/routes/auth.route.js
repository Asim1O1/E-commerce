import express from "express";

import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoute.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import { createResponse } from "../utils/responseHelper.js";

const router = express.Router();

// AUTH ROUTES

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.post("/refresh-token", refreshAccessToken);
router.get("/checkAuth", protectRoute, async (req, res) => {
  console.log("ENETERD THE CHECK AUTH");
  try {
    const user = req.user;
    console.log("tHE USER ISn check auth is", user);

    if (!user) {
      return res
        .status(400)
        .json(createResponse(400, false, [], "User not found."));
    }

    return res
      .status(200)
      .json(createResponse(200, true, [], { user_data: user }));
  } catch (error) {
    console.error("Error occurred while checking auth:", error);
    return res
      .status(500)
      .json(
        createResponse(
          500,
          false,
          [],
          "An error occurred while processing your request."
        )
      );
  }
});

export default router;
