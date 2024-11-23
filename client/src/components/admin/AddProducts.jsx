// ProductFormModal.jsx
import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import PropTypes from "prop-types";

const AddProducts = ({ onClose }) => {
  console.log("onClose prop:", onClose);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    image: null,
    fileName: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
        fileName: file.name,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
            {/* ... Rest of the form content remains the same ... */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="productName"
                    className="text-xs font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    value={formData.productName}
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
                    value={formData.price}
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
                    value={formData.stock}
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
                    value={formData.category}
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
                    id="productDescription"
                    value={formData.productDescription}
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
                  {formData.fileName && (
                    <p className="text-xs text-gray-700 mt-1">
                      Selected: {formData.fileName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
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
  onClose: PropTypes.func.isRequired, // Ensure onClose is a function and required
};

export default AddProducts;
