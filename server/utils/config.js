import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const _config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI,
  jwt_key: process.env.JWT_SECRET_KEY,
  jwt_expiration: process.env.JWT_EXPIRATION,
  refresh_token: process.env.REFRESH_TOKEN_SECRET,
  c_cloud_name: process.env.CLOUDINARY_CLOUD,
  c_cloud_key: process.env.CLOUDINARY_API_KEY,
  c_cloud_secret: process.env.CLOUDINARY_API_SECRET,


  env: process.env.NODE_ENV,
});

export default _config;
