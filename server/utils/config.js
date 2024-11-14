import dotenv from "dotenv";


dotenv.config({ path: "../.env" });

const _config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
});

export default _config;
