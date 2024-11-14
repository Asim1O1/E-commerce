import mongoose from "mongoose";
import _config from "./config.js";

const connectToDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDb..");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error while connecting with MongoDb..", err);
    });
    await mongoose.connect(_config.databaseUrl);
  } catch (error) {
    console.error("Failed to connect to MongoDb..", error);
    process.exit(1);
  }
};

export default connectToDB;
