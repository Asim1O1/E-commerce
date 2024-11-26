import jwt from "jsonwebtoken";
import { createResponse } from "./responseHelper.js";
import _config from "./config.js";
import { generateAccessToken } from "./generateAuthToken.js";

 const refreshAccessToken = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json(createResponse(401, false, "No refresh token available", []));
  }

  try {
    const decoded = jwt.verify(refreshToken, _config.jwt_key);

    const newAccessToken = generateAccessToken(decoded.sub);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    return res
      .status(200)
      .json(
        createResponse(200, true, [], "Access token refreshed successfully")
      );
  } catch (error) {
    return res
      .status(401)
      .json(createResponse(401, false, "Invalid or expired refresh token", []));
  }
};


export default refreshAccessToken;