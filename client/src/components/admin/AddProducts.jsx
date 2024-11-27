// ProductFormModal.jsx
import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createProduct } from "../../features/products/productSlice";
import { toast } from "react-toastify";

const AddProducts = ({ onClose }) => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    image: null,
    fileName: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!productData.name) newErrors.name = "Product name is required";
    if (!productData.description)
      newErrors.description = "Product description is required";
    if (!productData.price || isNaN(productData.price))
      newErrors.price = "Valid price is required";
    if (!productData.category)
      newErrors.category = "Product category is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prevState) => ({
        ...prevState,
        image: file,
        fileName: file.name,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await dispatch(createProduct(productData));

        if (response.payload.StatusCode === 201) {
          toast.success("Product added successfully!");
        } else {
          const errorMessage =
            response.payload?.details?.ErrorMessage[0]?.message ||
            "Server Error. Please try again.";
          console.log(errorMessage);

          toast.error(errorMessage);
        }
      } catch (error) {
        console.log("Th error while adding product", error);
        if (error.response) {
          toast.error(
            error.response.data?.ErrorMessage?.[0]?.message ||
              "An unexpected error occurred."
          );
        } else {
          toast.error("Network error, please try again.");
        }
      }
    } else {
      toast.error("Please fix the errors in the form before submitting.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-3xl w-full mx-4 bg-white rounded-lg shadow-sm">
        <div className="border-b px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Create Product</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close form"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="mt-1 w-full px-3 py-1.5 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="text-xs font-medium text-gray-700"
                  >
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    className="mt-1 w-full px-3 py-1.5 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="text-xs font-medium text-gray-700"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock"
                    value={productData.stock}
                    onChange={handleInputChange}
                    placeholder="Enter stock quantity"
                    className="mt-1 w-full px-3 py-1.5 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="category"
                    className="text-xs font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-1.5 text-sm border rounded-md bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home">Home</option>
                    <option value="Books">Books</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="productDescription"
                    className="text-xs font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    className="mt-1 w-full px-3 py-1.5 text-sm border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-4">
              <label
                htmlFor="imageUpload"
                className="text-xs font-medium text-gray-700"
              >
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-4 py-3 border border-dashed rounded-md">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="imageUpload"
                      className="relative cursor-pointer text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  {productData.fileName && (
                    <p className="text-xs text-gray-700 mt-1">
                      Selected: {productData.fileName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="submit"
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddProducts.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddProducts;
