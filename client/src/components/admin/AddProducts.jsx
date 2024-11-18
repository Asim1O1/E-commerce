import React from "react";

const AddProducts = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Create Product
          </h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="productName" className="block font-semibold mb-1">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block font-semibold mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
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

            {/* Price */}
            <div>
              <label htmlFor="price" className="block font-semibold mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-semibold mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                rows="4"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="image" className="block font-semibold mb-1">
                Product Image
              </label>
              <input
                type="file"
                id="image"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
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

export default AddProducts;
