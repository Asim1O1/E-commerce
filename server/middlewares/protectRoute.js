import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import { createResponse } from "../utils/responseHelper.js";

const protectRoute = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header or req.jwt
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json(
          createResponse(401, false, ["No token provided, unauthorized access"])
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find the user in the database
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json(createResponse(404, false, ["User not found"]));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json(
          createResponse(401, false, ["Token expired, please log in again"])
        );
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json(createResponse(401, false, ["Invalid token, access denied"]));
    } else {
      console.error("Error occurred while protecting route:", error);
      return res
        .status(500)
        .json(createResponse(500, false, ["Internal Server Error"]));
    }
  }
};

export default protectRoute;
