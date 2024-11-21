import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    description: "",
    image: null,
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
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className="bg-gray-50 px-6 py-4 flex items-center border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">Create Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Enter product name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="productDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Description
          </label>
          <input
            type="text"
            id="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            placeholder="Enter product Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price ($)
          </label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Enter price"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
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
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Enter stock quantity"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="imageUpload"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Image
          </label>
          <div className="mt-1 flex justify-center px-4 py-4 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="text-center">
              <div className="flex items-center text-sm text-gray-600">
                <label
                  htmlFor="imageUpload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
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
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Uploaded"
              className="mt-4 w-full h-auto rounded-md"
            />
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProducts;
