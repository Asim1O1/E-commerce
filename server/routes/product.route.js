import express from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import upload from "../imageUpload/multerConfig.js";

const router = express.Router();

router
  .route("/")
  .get(getAllProduct)
  .post(upload.single("image"), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct);

export default router;
