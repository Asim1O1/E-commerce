import jwt from "jsonwebtoken";
import _config from "./config.js";

export const generateAccessToken = (userId) => {
  try {
    const jwtSecret = _config.jwt_key;
    if (!jwtSecret) throw new Error("JWT Secret is not defined!");
    return jwt.sign({ sub: userId }, jwtSecret, { expiresIn: "30m" });
  } catch (error) {
    throw new Error(`Error generating access token: ${error.message}`);
  }
};

export const generateRefreshToken = (userId) => {
  try {
    const refreshTokenSecret = _config.refresh_token;
    if (!refreshTokenSecret)
      throw new Error("Refresh Token Secret is not defined!");
    return jwt.sign({ sub: userId }, refreshTokenSecret, { expiresIn: "24h" });
  } catch (error) {
    throw new Error(`Error generating refresh token: ${error.message}`);
  }
};
