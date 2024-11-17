import app from "./app.js";
import _config from "./utils/config.js";
import connectToDB from "./utils/connectToDB.js";

const port = _config.port || 5000;

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server running on port ${port}...`);
    });
    await connectToDB();
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
