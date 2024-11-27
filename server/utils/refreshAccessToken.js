import jwt from "jsonwebtoken";
import { createResponse } from "./responseHelper.js";
import _config from "./config.js";
import { generateAccessToken } from "./generateAuthToken.js";

const refreshAccessToken = async (req, res) => {
  console.log("entered the refreshaccess token request in the backend");
  const refreshToken = req?.cookies?.refreshToken;
  console.log(" FOUND THE REFRESH MAAL The refresh token is", refreshToken);

  if (!refreshToken) {
    console.log("no refresh token");
    return res
      .status(401)
      .json(createResponse(401, false, "No refresh token available", []));
  }

  try {
    console.log("ENTERED THE TRY CATCH");
    const decoded = jwt.verify(refreshToken, _config.refresh_token);

    const newAccessToken = generateAccessToken(decoded.sub);
    console.log("FOUND THE NEW ACCESS_TOKEN", newAccessToken);

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
    console.error("Error during refresh:", error);
    return res
      .status(401)
      .json(createResponse(401, false, "Invalid or expired refresh token", []));
  }
};

export default refreshAccessToken;
