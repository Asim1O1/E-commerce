import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from "../imageUpload/multerConfig.js";
import protectRoute from "../middlewares/protectRoute.js";
import { authorizeRole } from "../middlewares/roleAuth.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProduct)
  .post(
    protectRoute,
    authorizeRole("admin"),
    upload.single("image"),
    createProduct
  );

router
  .route("/:id")
  .get(getProductById)
  .put(
    protectRoute,
    authorizeRole("admin"),
    upload.single("image"),
    updateProduct
  )
  .delete(protectRoute, authorizeRole("admin"), deleteProduct);

export default router;
