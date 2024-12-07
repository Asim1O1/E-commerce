import mongoose from "mongoose";
import cloudinary from "../imageUpload/cloudinaryConfig.js";
import { uploadImageToCloudinary } from "../imageUpload/fileUpload.js";
import { validateProduct } from "../middlewares/validationSchema.js";
import Product from "../models/product.model.js";
import { paginate } from "../utils/pagination.js";
import { createResponse } from "../utils/responseHelper.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    await validateProduct.validateAsync(req.body);

    const { name, description, price, category, stock } = req.body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res
        .status(400)
        .json(
          createResponse(400, false, [
            { message: "Product with this name already exists." },
          ])
        );
    }

    if (!req.file) {
      return res
        .status(400)
        .json(
          createResponse(400, false, [
            { message: "Product image is required!" },
          ])
        );
    }

    const result = await uploadImageToCloudinary(req.file, {
      folder: "products",
    });

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    await newProduct.save();
    console.log("Reached the code after succesfull product save");

    return res.status(201).json(
      createResponse(201, true, [], {
        message: "Product added successfully",
        product_data: newProduct,
      })
    );
  } catch (error) {
    console.error("Error:", error.message);

    if (error.isJoi) {
      return res
        .status(400)
        .json(
          createResponse(400, false, [
            `Validation error: ${error.details[0].message}`,
          ])
        );
    }

    return res
      .status(500)
      .json(
        createResponse(
          500,
          false,
          ["Server error: Unable to create product"],
          error.message
        )
      );
  }
};

// GET ALL PRODUCTS

export const getAllProduct = async (req, res) => {
  try {
    // Destructure query params
    const { page = 1, limit = 10, category } = req.query;

    // Validate category if it's provided
    const validCategories = [
      "Men's Clothes",
      "Women's Clothes",
      "Shoes",
      "All",
    ];

    // Check if the provided category is valid
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        statusCode: 400,
        IsSuccess: false,
        Result: null,
        ErrorMessage: [{ message: "Invalid category provided" }],
      });
    }

    // Build filter object based on category if provided
    let filter = {};
    if (category && category !== "All") {
      filter = { category };
    }

    // Get paginated products with category filter
    const paginatedProducts = await paginate(
      Product,
      filter,
      parseInt(page),
      parseInt(limit)
    );

    // Send successful response
    return res.status(200).json({
      statusCode: 200,
      IsSuccess: true,
      Result: {
        data: paginatedProducts.data,
        pagination: paginatedProducts.pagination,
      },
      ErrorMessage: [],
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      statusCode: 500,
      IsSuccess: false,
      Result: null,
      ErrorMessage: [{ message: "Server error: Unable to fetch products" }],
    });
  }
};

// GET A SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json(createResponse(404, false, [{ message: "Product not found" }]));
    }

    return res.status(200).json(createResponse(200, true, [], product));
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json(
        createResponse(500, false, [
          { message: "Server error: Unable to fetch product" },
        ])
      );
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    console.log("Th req params is", req.params);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json(createResponse(400, false, "Invalid product ID", []));
    }

    const updates = req.body;
    console.log("The updates are ", updates);

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json(createResponse(404, false, "Product not found"));
    }

    if (req.file) {
      await cloudinary.v2.uploader.destroy(product.cloudinaryId);
      const result = await uploadImageToCloudinary(req.file, {
        folder: "products",
      });
      updates.imageUrl = result.secure_url;
      updates.cloudinaryId = result.public_id;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return res.status(200).json(
      createResponse(200, true, [], {
        message: "Product updated successfully",
        product_data: updatedProduct,
      })
    );
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json(
        createResponse(500, false, "Server error: Unable to update product", [])
      );
  }
};

// DELETE A PRODUCT

export const deleteProduct = async (req, res) => {
  try {
    console.log("HIT THE DELETE API");
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json(createResponse(400, false, "Invalid product ID", []));
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json(createResponse(404, false, "Product not found", []));
    }

    await cloudinary.v2.uploader.destroy(product.cloudinaryId);

    await Product.findByIdAndDelete(id);

    return res
      .status(200)
      .json(createResponse(200, true, [], "Product deleted successfully"));
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json(
        createResponse(500, false, "Server error: Unable to delete product")
      );
  }
};
